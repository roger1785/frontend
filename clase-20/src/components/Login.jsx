import { useState } from "react";
import { useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const initialState = {
  email: "",
  password: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (!emailRegex.test(form.email)) {
      return "El correo electrónico no es válido";
    }

    if (!form.password.trim()) {
      return "La contraseña es obligatoria";
    }

    if (form.password.trim().length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(form);

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    setSaving(true);

    const user = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || `Error al registrar un usuario`);
      }

      localStorage.setItem("token", data.token);

      setError(null);
      setSuccess("Se inició sesión correctamente");
      setForm(initialState);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);

  const isdisabled = !form.email || !form.password || saving;

  return (
    <section className="auth-section">
      <div className="auth-title">
        <h2>Iniciar sección</h2>
      </div>
      <p>Iniciar sección para poder acceder a la aplicación.</p>
      {success && <p className="success">{success}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña: </label>
          <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />

          
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlashIcon className="icon" /> : <EyeIcon className="icon" />}
          </button>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isdisabled}>
          Iniciar sección
        </button>
      </form>
    </section>
  );
}

export default Login;
