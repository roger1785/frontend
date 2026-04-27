import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  

  const initialState = {
    name: "Pedro",
    price: "",
    stock: "",
    description: "",
    category: "",
  };

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    setForm({ ...form, name: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.price || !form.stock) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // console.log("Datos del formulario:", {
    //   name: form.name,
    //   price: form.price,
    //   stock: form.stock,
    // });

    const newProduct = {
     // _id: crypto.randomUUID(),
      name: form.name,
      price: form.price,
      stock: form.stock,
      //description: form.description,
      //category: form.category,
    };

    const response = await fetch("http://localhost:3000/products", {
      
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

   console.log(response)

    if (!response.ok) {
      throw new Error("error al crear el producto");
    }

    // console.log("Producto a guardar:", newProduct);
    onAddProduct(newProduct);

    setForm(initialState);

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

        <div className="form-group">
          <label htmlFor="Description">Descripción</label>
          <textarea
            type="text"
            name="Description"
            id="Description"
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="text"
            value={form.category}
            onChange={(event) =>
              setForm({ ...form, category: event.target.value })
            }
          />
        </div>

        {/* {error ? <p className="error">{error}</p> : ""} */}
        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="submit">Guardar Producto</button>
          <button type="button" onClick={()=>{
            setForm(initialState);
          }}>Borrar formulario</button>
        </div>

        <p>Nombre: {form.name}</p>
        <p>Precio: {form.price}</p>
        <p>Stock: {form.stock}</p>
      </form>
    </section>
  );
}

export default ProductForm;
