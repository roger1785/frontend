import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  // const navigate = useNavigate();

  // const handleCardClick = () => {
  //   navigate(`/products/${product._id}`);
  // };

  return (
    <article className="product-card">
      <h3>{product.name}</h3>
      <p>$ {product.price}</p>

      <div className="card-actions">
        <Link to={`/products/${product._id}`}>Detalle</Link>
        <Link to={`/products/${product._id}/edit`}>Editar</Link>
      </div>
    </article>
  );
}

export default ProductCard;
