import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // const handleCardClick = () => {
  //   navigate(`/products/${product._id}`);
  // };

  return (
    <article className="product-card" onClick={() => navigate(`/products/${product._id}`)}>
      <h3>{product.name}</h3>
      <p>$ {product.price}</p>
      <p>Stock: {product.stock}</p>
    </article>
  );
}

export default ProductCard;
