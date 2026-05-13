import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import ProductForm from "./components/ProductForm";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import { useProducts } from "./hooks/useProducts";

function App() {
  const {
    products,
    setError,
    success,
    loading,
    error,
    loadProducts,
    handleDelete,
  } = useProducts();

  if (loading) {
    return <p className="message">Cargando productos...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="error">{error}</p>
        <button type="button" onClick={() => setError(null)}>
          Recargar
        </button>
      </div>
    );
  }

  return (
    <main className="container">
      <h1>Clase 26</h1>

      <Navbar />

      {success && <p className="success">{success}</p>}

      <Routes>
        <Route
          path="/"
          element={<Home products={products} handleDelete={handleDelete} />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetail products={products} />}
        />

        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ProductForm products={products} loadProducts={loadProducts} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <ProductForm products={products} loadProducts={loadProducts} />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
