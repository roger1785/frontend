import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeEmail = (event) =>
    setForm({ email: event.target.value, password: form.password });

  const handleChangePassword = (event) => {
    setForm({
      email: form.email,
      password: event.target.value,
    });
  };

  console.log(form);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: form.email,
      password: form.password,
    };

    console.log(user);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChangeEmail}
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChangePassword}
        />

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Login;
