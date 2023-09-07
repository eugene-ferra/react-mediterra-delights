import Header from "../Header/Header";
import "./App.scss";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import About from "../About/About";

function App() {
  return (
    <>
      <Header />
      <div>
        <Promo />
        <About />
      </div>
      <Footer />
    </>
  );
}

export default App;
