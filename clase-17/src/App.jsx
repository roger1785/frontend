import { useState } from "react";
import "./App.css";

const initialForm = {
  title: "",
  status: "pending",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("La tarea es obligatoria");
      return;
    }

    if (form.title.trim().length < 3) {
      setError("La tarea tiene que tener 3 caracteres o mas");
      return;
    }

    setError("");

    const task = {
      id: crypto.randomUUID(),
      title: form.title,
      status: form.status,
    };

    // tasks.push(task) // No usar con estados
    setTasks([...tasks, task]);
    setForm(initialForm);
  };

  const handleDelete = (id) => {
    // const filtered = tasks.filter((t) => t.id != id);
    // setTasks(filtered);

    setTasks(tasks.filter((t) => t.id != id));
  };

  return (
    <main className="container">
      <h1>Gestor de tareas</h1>

      <section className="form-section">
        <h2>Nueva tarea</h2>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Tarea: </label>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Estado: </label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="pending">Pendiente</option>
              <option value="done">Terminada</option>
            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Crear tarea</button>
        </form>
      </section>

      <section className="tasks-section">
        <h2>Tareas</h2>

        <div className="task-list">
          {tasks.map((task) => (
            <article key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.status}</p>

              <div className="actions">
                <button type="button">Editar</button>
                <button type="button" onClick={() => handleDelete(task.id)}>
                  Eliminar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
