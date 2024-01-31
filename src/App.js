import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content.js";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <section className="todoapp">
        <Header />
        <Content />
      </section>
      <Footer />
    </>
  );
}

export default App;
