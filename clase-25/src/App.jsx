import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
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
import { getProducts, deleteProduct } from "./services/ProductService";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);

      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "¿Esta seguro que quiere borrar el producto?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // await loadProducts();
      setProducts(products.filter((p) => p._id != id));

      setSuccess("Producto eliminado correctamente");
    } catch (error) {
      if (error.status == 401) {
        logout();

        navigate("/login");

        return;
      }

      setError(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);

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
      <h1>Clase 25</h1>

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
