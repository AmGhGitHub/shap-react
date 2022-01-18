// import Container from "react-bootstrap/Container";
import Logo from "./components/Logo";
// import ModelSpecs from "./components/ModelSpecs";
import ModelSpec from "./components/ModelSpec";
import VarsSpacs from "./components/VarsSpecs";

import store from "./store"; //when requiring a directory, it's index.js file will be used.
import { Provider } from "react-redux";
import Equation from "./components/CorrelationAndRealtion";
import RunComponent from "./components/RunComponent";
import ChartResults from "./components/ChartResults";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Provider store={store}>
        <Logo />
        <ModelSpec />
        <VarsSpacs />
        <Equation />
        <RunComponent />
        <ChartResults />
        <Footer />
      </Provider>
    </>
  );
}

export default App;
