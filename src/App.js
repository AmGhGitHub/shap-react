import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import Logo from "./components/Logo";
import VarSpecs from "./components/VarSpecs2";
import VarDistSpecs from "./components/VarDistParams";
import RunSpecs from "./components/Runs";

function App() {
  const [arr, setArr] = useState([0]);
  const [dist, setDist] = useState({});

  return (
    <Container>
      <Logo />
      <RunSpecs setArr={setArr} />
      <VarSpecs arr={arr} setDist={setDist} />
      <VarDistSpecs dist={dist} />
    </Container>
  );
}

export default App;
