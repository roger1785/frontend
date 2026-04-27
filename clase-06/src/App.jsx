import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  // let loading = true;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function loadProducts() {
    setLoading(true);
    setError("");

    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        //loading = false;
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <h1>Clase 06</h1>

      {loading && <p>Cargando productos...</p>}
      {error && <p>Error: {error}</p>}

      <button onClick={loadProducts}>Recargar Productos</button>

      <section>
        <h2>Productos</h2>

        <div>
          {products.map((product) => (
            <div key={product._id}>{product.name}</div>
          ))}
        </div>

        <p>Cantidad: {products.length}</p>
      </section>
    </>
  );
}

export default App;
