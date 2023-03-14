import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

// layouts
import MainLayout from './layouts/MainLayout';

// pages
import Home from './pages/Home';

import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" index element={<Home />} />
      </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
