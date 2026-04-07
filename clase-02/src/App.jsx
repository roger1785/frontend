import "./App.css";
import ProductList from "./components/ProductList";
import Title from "./components/Title";
import Footer from "./components/Footer";
import Categorylist from "./components/CategoryList";


function App() {
  const products = [
    { id: 1, name: "laptop", price: 1000, category: "electronics" },
    { id: 2, name: "mouse", price: 25, category: "electronics" },
    { id: 3, name: "teclado", price: 75, category: "electronics" },
    { id: 4, name: "monitor", price: 300, category: "electronics" },
  ];

  const categories = [
    { id: 1, name: "electronics" },
    { id: 2, name: "clothing" },
    { id: 3, name: "home" },  
  ]



  return (
    <>
      <Title title="Listado de productos" />
      <ProductList products={products} />
      <Categorylist categories={categories} />
      <Footer company="Mi Empresa" />
    </>
  );
}

export default App;
