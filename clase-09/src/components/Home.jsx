import ProductList from "./ProductList";

function Home({ products }) {
  return (
    <section>
      <h2>Products</h2>

      <ProductList products={products} />

      <p>Cantidad: {products.length}</p>
    </section>
  );
}

export default Home;
