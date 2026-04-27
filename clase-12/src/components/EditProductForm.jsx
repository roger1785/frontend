import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm({ products, loadProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    name: "",
    price: "",
    stock: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const product = products.find((p) => p._id == id);

    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [id, products]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!form.name || !form.price || !form.stock) {
      return;
    }

    const updatedProduct = {
      name: form.name,
      price: form.price,
      stock: form.stock,
    };

    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      await loadProducts();

      setForm(initialState);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //                  !"a" || !"4" || !"1" || true
  //                 false || false || false || true
  const isDisabled = !form.name || !form.price || !form.stock || loading;

  return (
    <section>
      <h2>Editar producto</h2>

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
            min="0"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock: </label>
          <input
            type="number"
            min="0"
            id="stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isDisabled}>
            Guardar producto
          </button>

          <button type="button" onClick={() => navigate("/")}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditProductForm;
