import { useEffect, useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import NotFound from "./components/NotFound";
import Home from "./components/Home";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = () => {
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener lo productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <h1>Cargando productos...</h1>;
  }

  if (error) {
    // return <p style={{ color: "red" }}>{error}</p>;
    return <p className="error">{error}</p>;
  }

  if (selectedProduct) {
    return (
      <>
        <h2>Detalle de producto</h2>

        <ProductDetail product={selectedProduct} onBack={setSelectedProduct} />
      </>
    );
  }

  return (
    <main className="container">
      <h1>Clase 09</h1>

      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/products/:id"
          element={<ProductDetail products={products} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
