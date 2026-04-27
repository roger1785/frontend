import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "Pedro",
    price: "",
    stock: "",
  });

  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.price || !form.stock) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // console.log("Datos del formulario:", {
    //   name: form.name,
    //   price: form.price,
    //   stock: form.stock,
    // });

    const newProduct = {
      _id: crypto.randomUUID(),
      name: form.name,
      price: form.price,
      stock: form.stock,
    };

    // console.log("Producto a guardar:", newProduct);
    onAddProduct(newProduct);

    setForm({
      name: "",
      price: "",
      stock: "",
    });

    navigate("/");
  };

  return (
    <section>
      <h2>Formulario de Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            min="0"
            value={form.price}
            onChange={(event) =>
              setForm({ ...form, price: event.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            min="0"
            value={form.stock}
            onChange={(event) =>
              setForm({ ...form, stock: event.target.value })
            }
          />
        </div>
        <div className="form-actions">
          <button type="submit">Guardar Producto</button>
        </div>

        <p>Nombre: {form.name}</p>
        <p>Precio: {form.price}</p>
        <p>Stock: {form.stock}</p>
      </form>
    </section>
  );
}

export default ProductForm;
