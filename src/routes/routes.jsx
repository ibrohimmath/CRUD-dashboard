import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import { ProductsProvider } from "../context/ProductsContext";
import ProtectedRoute from "./protectedRoute";
import Login from "@/components/Login";
import Dashboard from "@/pages/dashboard";
import ProductsPage from "../pages/products";
import ProductAddPage from "../pages/productsAdd";
import ProductUpdatePage from "../pages/productsUpdate";

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/add"
              element={
                <ProtectedRoute>
                  <ProductAddPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/update/:id"
              element={
                <ProtectedRoute>
                  <ProductUpdatePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
