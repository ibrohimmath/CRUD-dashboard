import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/context/AuthProvider";
import ProtectedRoute from "./protectedRoute";
import Login from "@/components/Login";
import Dashboard from "@/pages/dashboard";
import ProductsPage from "../pages/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <ProductsPage />
      </ProtectedRoute>
    ),
  },
]);

function Router() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default Router;
