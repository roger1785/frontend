function ProductCard({ products }) {
  const { name, price, category } = products;
  return (
    <li>
      <h3>{name}</h3>
      <p>${price}</p>
      <p>{category}</p>
    </li>
  );
}
export default ProductCard;
