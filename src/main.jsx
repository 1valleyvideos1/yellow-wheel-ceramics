import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import PieceDetail from './pages/PieceDetail.jsx';
import About from './pages/About.jsx';
import Process from './pages/Process.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'gallery/:slug', element: <PieceDetail /> },
      { path: 'about', element: <About /> },
      { path: 'process', element: <Process /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
