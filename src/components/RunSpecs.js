import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import numberFormatter from "../util/formatNumber";

const Runs = ({ setVar, setArr, setShow }) => {
  const [sampleSize, setSampleSize] = React.useState(1);
  const [nVariables, setNVariables] = React.useState(1);

  const handleChangeSampleSize = (e) => {
    setSampleSize(parseInt(e.target.value));
  };
  const handleChangeVariables = (e) => {
    setNVariables(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = new Array(nVariables).fill(0);
    setArr(() => [...arr]);
    setVar(nVariables);
    setShow(true);
  };

  return (
    <>
      <h2 className="my-3 text-danger">Model Specs</h2>
      <Row>
        <Col>
          <Form>
            <Row>
              <Col sm={10}>
                <h5>Sample Size</h5>
                <Form.Range
                  min="1"
                  max="5"
                  value={sampleSize}
                  onChange={handleChangeSampleSize}
                />
                <h5 className="mt-2">Number of Variables</h5>
                <Form.Range
                  min="1"
                  max="5"
                  value={nVariables}
                  onChange={handleChangeVariables}
                />
              </Col>
              <Col sm={2}>
                <h5>Value</h5>
                <p>{numberFormatter(Math.pow(10, parseInt(sampleSize)))}</p>
                <h5 style={{ color: "white" }}>-</h5>
                <p>{numberFormatter(nVariables)}</p>
              </Col>
            </Row>
            <Button
              className="float-end my-2"
              variant="outline-dark"
              size="sm"
              type="submit"
              onClick={handleSubmit}
            >
              Apply
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default Runs;
