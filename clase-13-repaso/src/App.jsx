import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChangeNombre = (event) =>
    setForm({
      nombre: event.target.value,
      correo: form.correo,
      mensaje: form.mensaje,
    });

  const handleChangeCorreo = (event) =>
    setForm({
      nombre: form.nombre,
      correo: event.target.value,
      mensaje: form.mensaje,
    });

  const handleChangeMensaje = (event) =>
    setForm({
      nombre: form.nombre,
      correo: form.correo,
      mensaje: event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    const consulta = {
      nombre: form.nombre,
      correo: form.correo,
      mensaje: form.mensaje,
    };

    console.log(consulta);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Escriba su nombre"
          value={form.nombre}
          onChange={handleChangeNombre}
        />
        <p>{form.nombre}</p>

        <input
          type="correo"
          id="correo"
          placeholder="Escribe tu correo"
          value={form.correo}
          onChange={handleChangeCorreo}
        />
        <p> {form.correo} </p>

        <textarea
          type="text"
          name="mensaje"
          id="mensaje"
          placeholder="Mensaje"
          value={form.mensaje}
          onChange={handleChangeMensaje}
        />
        <p>{form.mensaje}</p>

        <button type="submit">Enviar 1</button>
      </form>
    </>
  );
}

export default App;
