import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import Logo from "./components/Logo";
import VarSpecs from "./components/VarDistType";
import VarDistSpecs from "./components/VarDistSpecs";
import RunSpecs from "./components/RunSpecs";
import ModelSpecs from "./components/ModelSpecs";

function App() {
  // const [arr, setArr] = useState([]);
  // const [nvar, setNVar] = useState(0);
  // const [dist, setDist] = useState({});
  // const [showVarSpec, setShowVarSpec] = useState(false);
  // const [showVarDist, setShowVarDist] = useState(false);

  return (
    <Container fluid>
      <Logo />
      <ModelSpecs />
      {/* {showVarSpec && (
        <VarSpecs
          nvar={nvar}
          arr={arr}
          setDist={setDist}
          setShow={setShowVarDist}
        />
      )}
      {showVarDist && <VarDistSpecs dist={dist} />} */}
    </Container>
  );
}

export default App;
