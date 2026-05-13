import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, setError, loading, error } = useProducts();

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

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <section className="product-detail">
        <h2>Producto no encontrado</h2>
        <Link to="/">Volver</Link>
      </section>
    );
  }

  return (
    <section className="product-detail">
      <h2>Detalle de producto</h2>

      <article>
        <h3>{product.name}</h3>
        <p>$ {product.price}</p>
        <p>Stock: {product.stock}</p>
      </article>

      <button onClick={() => navigate("/")}>Volver</button>
    </section>
  );
}

export default ProductDetail;
