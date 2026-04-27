import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");

      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }

      const data = await response.json();

      setProducts(data);
      setError(null);
    } catch (error) {
      // console.log(error);
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
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al borrar el producto");
      }

      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <p className="message">Cargando productos...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <main className="container">
      <h1>Clase 15 - CRUD</h1>

      <nav className="main-nav">
        <Link to="/">Inicio</Link>
        <Link to="/products/new">Nuevo producto</Link>
      </nav>

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
            <ProductForm products={products} loadProducts={loadProducts} />
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProductForm products={products} loadProducts={loadProducts} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
