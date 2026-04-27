import { useEffect, useState } from "react";
import { Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // const addProduct = (newProduct) => {
  //   products.push(newProduct);
  //   setProducts(products);
  // };

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
      <h1>Clase 10</h1>

      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/products/new">Nuevo Producto</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/products/:id"
          element={<ProductDetail products={products} />}
        />
        <Route
          path="/products/new"
          element={<ProductForm onAddProduct={addProduct} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
