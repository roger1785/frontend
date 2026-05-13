import ProductList from "./ProductList";
import { useProducts } from "../hooks/useProducts";

function Home() {
   const {
      products,
      setError,
      success,
      loading,
      error,     
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
    <section>
      <h2>Listado de productos</h2>

      {success && <p className="success">{success}</p>}

      {products.length == 0 && (
        <p className="message">No hay productos disponibles</p>
      )}

      <ProductList products={products} handleDelete={handleDelete} />

      <p>Cantidad: {products.length}</p>
    </section>
  );
}

export default Home;
