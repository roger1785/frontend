import "./ProductCard.css";

function ProductCard({ product, onSelectedProduct }) {
  return (
    <article className="product-card" onClick={() => onSelectedProduct(product)}>
      <h3>{product.name}</h3>
      <p>$ {product.price}</p>
      <p>Stock: {product.stock}</p>
    </article>
  );
}

export default ProductCard;
