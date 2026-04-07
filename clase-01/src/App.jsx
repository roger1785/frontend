import "./App.css";
import Title from "./components/Title";
import Footer from "./components/Footer";
import Section from "./components/Section";

function App() {
  const nombre = "Roger";
  const age = 30;
  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "mouse" },
    { id: 3, name: "teclado" },
  ];
  return (
    <>
      <p>Bienvenidos a React</p>
      <h1>
        Mi nombre es {nombre} y mi edad es {age}
      </h1>
      <Title />
      <Section />
      {/* <ul>
        {products.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul> */}
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <Footer />
    </>
  );
}

export default App;
