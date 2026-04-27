import { useState } from "react";

function Product() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    stock: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    // if (!form.name || !form.price || !form.stock) {
    //   setError("Por favor, complete todos los campos");
    //   return;
    // }

    if (form.title.length < 3) {
      setError("El titulo tiene que tener 3 caracteres como mínimo");
      return;
    }

    if (form.title === "" || form.price === "" || form.stock === "") {
      setError("Por favor, complete todos los campos");
      return;
    }

    console.log(form);

    setForm({
      title: "",
      price: "",
      stock: "",
    });
  };

  return (
    <>
      <h1>Producto</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titulo: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enviar</button>

        <div>
          <p>{form.title}</p>
          <p>{form.price}</p>
          <p>{form.stock}</p>
        </div>
      </form>
    </>
  );
}

export default Product;
