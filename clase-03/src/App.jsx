import "./App.css";
import ProductList from "./components/ProductList";
import Title from "./components/Title";
import Footer from "./components/Footer";
import Categorylist from "./components/CategoryList";
import { useState } from "react"; 
import Hora from "./components/Hora";
import Saludar from "./components/Saludar";



function App() {
  //Estado para productos
  const [products, setProducts] = useState([
    { id: 1, name: "laptop", price: 1000, category: "electronics" },
    { id: 2, name: "mouse", price: 25, category: "electronics" },
    { id: 3, name: "teclado", price: 75, category: "electronics" },
    { id: 4, name: "monitor", price: 300, category: "electronics" },
  ]);

  // const products = [
  //   { id: 1, name: "laptop", price: 1000, category: "electronics" },
  //   { id: 2, name: "mouse", price: 25, category: "electronics" },
  //   { id: 3, name: "teclado", price: 75, category: "electronics" },
  //   { id: 4, name: "monitor", price: 300, category: "electronics" },
  // ];

 const newProduct = { id: 5, name: "silla", price: 150, category: "home" };
 

  setProducts([...products, newProduct]);

  const categories = [
    { id: 1, name: "electronics" },
    { id: 2, name: "clothing" },
    { id: 3, name: "home" },  
  ]
function addCategory() {
  const newCategory = { id: Date.now(), name: newCategoryName };
  setCategories([...categories, newCategory]);
  setNewCategoryName("");
} 

const [newCategoryName, setNewCategoryName] = useState("");


 




  return (
    <>
      <Title title="Listado de productos" />
      <ProductList products={products} />
      <Categorylist categories={categories} />
      <Footer company="Mi Empresa" />
      <Hora />
      <Saludar name="Roger" />

    </>
  );
}

export default App;
