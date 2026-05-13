import { createBrowserRouter } from "react-router-dom";
import { requireAuth } from "./loaders/requireAuth";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import ProductForm from "./components/ProductForm";
import Profile from "./components/Profile";
import ProductDetail from "./components/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        loader: requireAuth,
        element: <Profile />,
      },
      {
        path: "/products/new",
        loader: requireAuth,
        element: <ProductForm />,
      },
      {
        path: "/products/:id/edit",
        loader: requireAuth,
        element: <ProductForm />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
