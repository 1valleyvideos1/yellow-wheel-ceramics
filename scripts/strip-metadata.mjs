// Removes EXIF and XMP metadata (camera details and GPS location) from every
// JPEG and WebP under public/images. Runs automatically before each build, so
// a phone photo uploaded through the dashboard never reaches the live site with
// its location attached. Colour profiles are kept. Run by hand with
// `node scripts/strip-metadata.mjs`.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = join(root, 'public/images');

// Reads the EXIF Orientation tag (1 = upright) from an APP1 segment's payload.
function readOrientation(app1) {
  if (app1.toString('binary', 0, 6) !== 'Exif\0\0') return 1;
  const tiff = app1.subarray(6);
  const le = tiff.toString('ascii', 0, 2) === 'II';
  const u16 = (o) => (le ? tiff.readUInt16LE(o) : tiff.readUInt16BE(o));
  const u32 = (o) => (le ? tiff.readUInt32LE(o) : tiff.readUInt32BE(o));
  try {
    const ifd = u32(4);
    for (let n = 0, count = u16(ifd); n < count; n++) {
      const entry = ifd + 2 + n * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8);
    }
  } catch {
    // Malformed EXIF: treat as upright.
  }
  return 1;
}

// A minimal APP1 segment holding only the Orientation tag, so phone photos
// that rely on it are not shown sideways once the rest of the EXIF is gone.
function orientationSegment(value) {
  const tiff = Buffer.alloc(26);
  tiff.write('II*\0', 0, 'binary');
  tiff.writeUInt32LE(8, 4); // IFD0 offset
  tiff.writeUInt16LE(1, 8); // one entry
  tiff.writeUInt16LE(0x0112, 10); // Orientation
  tiff.writeUInt16LE(3, 12); // SHORT
  tiff.writeUInt32LE(1, 14); // count
  tiff.writeUInt16LE(value, 18);
  tiff.writeUInt32LE(0, 22); // no next IFD
  const payload = Buffer.concat([Buffer.from('Exif\0\0', 'binary'), tiff]);
  const header = Buffer.from([0xff, 0xe1, 0, 0]);
  header.writeUInt16BE(payload.length + 2, 2);
  return Buffer.concat([header, payload]);
}

// JPEG: drop APP1 (EXIF, XMP) and APP13 (Photoshop/IPTC) segments, keeping
// only the orientation.
function stripJpeg(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  const keep = [buf.subarray(0, 2)];
  let i = 2;
  let changed = false;
  let orientation = 1;
  while (i + 4 <= buf.length && buf[i] === 0xff) {
    const marker = buf[i + 1];
    if (marker === 0xda) break; // start of scan: the rest is image data
    const len = buf.readUInt16BE(i + 2);
    const segment = buf.subarray(i, i + 2 + len);
    if (marker === 0xe1 || marker === 0xed) {
      // Already reduced to orientation only by a previous run: leave it.
      if (marker === 0xe1 && len === 2 + 32 && readOrientation(segment.subarray(4)) !== 1) {
        keep.push(segment);
        i += 2 + len;
        continue;
      }
      changed = true;
      if (marker === 0xe1) orientation = Math.max(orientation, readOrientation(segment.subarray(4)));
    } else keep.push(segment);
    i += 2 + len;
  }
  if (!changed) return null;
  if (orientation !== 1) keep.splice(1, 0, orientationSegment(orientation));
  keep.push(buf.subarray(i));
  return Buffer.concat(keep);
}

// WebP: drop EXIF and XMP chunks and clear their flags in the VP8X header.
function stripWebp(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const chunks = [];
  let i = 12;
  let changed = false;
  while (i + 8 <= buf.length) {
    const id = buf.toString('ascii', i, i + 4);
    const size = buf.readUInt32LE(i + 4);
    const end = i + 8 + size + (size % 2);
    const chunk = Buffer.from(buf.subarray(i, end));
    if (id === 'EXIF' || id === 'XMP ') changed = true;
    else {
      if (id === 'VP8X') chunk[8] &= ~(0x08 | 0x04); // EXIF and XMP flags
      chunks.push(chunk);
    }
    i = end;
  }
  if (!changed) return null;
  const body = Buffer.concat(chunks);
  const header = Buffer.alloc(12);
  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(body.length + 4, 4);
  header.write('WEBP', 8, 'ascii');
  return Buffer.concat([header, body]);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

let stripped = 0;
for (const file of walk(imagesDir)) {
  const ext = extname(file).toLowerCase();
  const strip = ext === '.jpg' || ext === '.jpeg' ? stripJpeg : ext === '.webp' ? stripWebp : null;
  if (!strip) continue;
  const out = strip(readFileSync(file));
  if (out) {
    writeFileSync(file, out);
    stripped++;
    console.log(`Removed metadata from ${relative(root, file)}`);
  }
}
console.log(`Checked images for location data: ${stripped} cleaned.`);
