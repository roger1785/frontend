import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductForm({ loadProducts }) {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    price: "",
    stock: "",
  };

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!form.name || !form.price || !form.stock) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    const newProduct = {
      name: form.name,
      price: form.price,
      stock: form.stock,
    };

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      // console.log(response);

      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }

      await loadProducts();

      setForm(initialState);

      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Nuevo Producto</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio: </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            min="0"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock: </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={form.stock}
            min="0"
            onChange={handleChange}
          ></input>
        </div>

        {/* <p className="error" style={{ display: error ? "block" : "none" }}>
          {error}
        </p> */}

        {/* { error ? <p className="error">{error}</p> : '' }  */}

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            Guardar producto
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
