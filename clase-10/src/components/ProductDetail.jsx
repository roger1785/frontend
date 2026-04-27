import { Link, useNavigate, useParams } from "react-router-dom";

function ProductDetail({ products }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <section>
        <p>Producto no encontrado</p>;
        <button onClick={() => navigate("/")}>
          Volver a la lista de productos
        </button>
      </section>
    );
  }

  return (
    <>
      <h2>Product Detail</h2>
      <h3>{product.name}</h3>
      <p>Precio: {product.price}</p>
      <p>Stock: {product.stock}</p>
      {/* <Link to="/">Volver a la lista de productos</Link> */}
      <button onClick={() => navigate("/")}>Volver</button>
    </>
  );
}

export default ProductDetail;
