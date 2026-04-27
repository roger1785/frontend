import { useState } from "react";

function Register() {
  // Estado
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

  // handleChange
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.nombre.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (form.password.length < 5) {
      setError("La contraseña debe tener al menos 5 caracteres.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("El Password no coincide");
      return;
    }

    if (form.email !== form.confirm_email) {
      setError("El Email no coincide");
      return;
    }

    if (
      !form.nombre ||
      !form.email ||
      !form.confirm_email ||
      !form.password ||
      !form.confirm_password
    ) {
      setError("Los campos no pueden estar vacios.");
      return;
    }

    // try {
    //   if (
    //     !form.nombre ||
    //     !form.email ||
    //     !form.confirm_email ||
    //     !form.password ||
    //     !form.confirm_password
    //   ) {
    //     throw new Error("All fields are required");
    //   }

    //   if (form.email !== form.confirm_email) {
    //     throw new Error("Emails do not match");
    //   }

    //   if (form.password !== form.confirm_password) {
    //     throw new Error("Passwords do not match");
    //   }

    //   console.log(form);
    // } catch (error) {
    //   setError(error.message);
    // }

    // setError("");

    // if (
    //   !form.nombre ||
    //   !form.email ||
    //   !form.confirm_email ||
    //   !form.password ||
    //   !form.confirm_password
    // ) {
    //   setError("Por favor, completa todos los campos.");
    //   return;
    // }

    // if (form.email !== form.confirm_email) {
    //   setError("Los emails no coinciden.");
    //   return;
    // }

    // if (form.password !== form.confirm_password) {
    //   setError("Las contraseñas no coinciden.");
    //   return;
    // }

    console.log(form);
  };

  return (
    <>
      <h1>Registro</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            name="nombre"
            id="name"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="confirm_email">Confirmar Email: </label>
          <input
            type="email"
            name="confirm_email"
            id="confirm_email"
            value={form.confirm_email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="confirm_password">Confirmar Contraseña: </label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Register;
