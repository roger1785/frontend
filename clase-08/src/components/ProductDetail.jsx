function ProductDetail({ product, onBack }) {
  return (
    <>
      <h2>{product.name}</h2>
      <p>Precio: {product.price}</p>
      <p>Stock: {product.stock}</p>

      <button onClick={() => onBack(null)}>Volver</button>
    </>
  );
}

export default ProductDetail;