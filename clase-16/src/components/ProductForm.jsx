import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductForm({ products, loadProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const initialState = {
    name: "",
    price: "",
    stock: "",
  };

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const product = products.find((p) => p._id == id);

      if (product) {
        setForm({
          name: product.name,
          price: product.price,
          stock: product.stock,
        });
      }
    } else {
      setForm(initialState);
    }
  }, [id, isEdit, products]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.price || !form.stock) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setSaving(true);

    const newOrUpdateProduct = {
      name: form.name,
      price: form.price,
      stock: form.stock,
    };

    let url;
    let method;

    if (isEdit) {
      url = `http://localhost:3000/products/${id}`;
      method = "PUT";
    } else {
      url = "http://localhost:3000/products";
      method = "POST";
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrUpdateProduct),
      });

      if (!response.ok) {
        throw new Error(`Error al ${isEdit ? `editar` : `crear`} el producto`);
      }

      await loadProducts();

      setForm(initialState);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const isDisabled = !form.name || !form.price || !form.stock || saving;

  return (
    <section>
      <h2>{isEdit ? "Editar" : "Crear"} Producto</h2>

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
            min="0"
            name="price"
            value={form.price}
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

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isDisabled}>
            {saving && (isEdit ? "Editando" : "Creando")}
            {!saving && (isEdit ? "Editar" : "Crear")} producto
          </button>

          {isEdit && (
            <button type="button" onClick={() => navigate("/")}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
