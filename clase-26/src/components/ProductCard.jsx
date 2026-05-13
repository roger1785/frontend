import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProductCard({ product, handleDelete }) {
  const { user } = useAuth();

  return (
    <article className="product-card">
      <h3>{product.name}</h3>
      <p>$ {product.price}</p>

      <div className="card-actions">
        <Link to={"/products/" + product._id} className="button">
          Detalle
        </Link>

        {user && (
          <>
            <Link to={`/products/${product._id}/edit`} className="button">
              Editar
            </Link>
            <button onClick={() => handleDelete(product._id)}>Eliminar</button>
          </>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
