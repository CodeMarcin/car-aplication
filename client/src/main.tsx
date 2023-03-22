import React from "react";
import ReactDOM from "react-dom/client";

import clientApollo from "./utils/apolloClient";
import { ApolloProvider } from "@apollo/client";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import "./i18n";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import GraphiQLUI from "./pages/GraphiQLUI";

import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" index element={<Home />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/graphiql" element={<GraphiQLUI />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={clientApollo}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
