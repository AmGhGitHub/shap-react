import React from "react";
import { Row, Col, Table, Form, Button } from "react-bootstrap";

import numberFormatter from "../util/formatNumber";

const Runs = ({ setArr }) => {
  const [nRuns, setNRuns] = React.useState(Math.pow(10, 2));
  const [nVariables, setNVariables] = React.useState(1);

  const handleChangeRuns = (e) => {
    setNRuns(Math.pow(10, parseInt(e.target.value)));
  };
  const handleChangeVariables = (e) => {
    setNVariables(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = new Array(nVariables).fill(0);
    setArr(() => [...arr]);
  };

  return (
    <Row>
      <h4 className="primary">Runs Specs</h4>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Table responsive bordered size="sm">
            <tbody>
              <tr>
                <td style={{ width: "33.33%" }}>Sample size</td>
                <td style={{ width: "33.33%" }}>
                  <Form.Range
                    size="sm"
                    id="number-of-runs"
                    name="number-of-runs"
                    min="1"
                    max="5"
                    onChange={handleChangeRuns}
                  />
                </td>
                <td style={{ width: "33.33%" }}>{numberFormatter(nRuns)}</td>
              </tr>
              <tr>
                <td style={{ width: "33.33%" }}>Variables</td>
                <td style={{ width: "33.33%" }}>
                  <Form.Range
                    size="sm"
                    id="number-of-variables"
                    name="number-of-variables"
                    min="1"
                    max="5"
                    value={nVariables}
                    onChange={handleChangeVariables}
                  />
                </td>
                <td style={{ width: "33.33%" }}>
                  {numberFormatter(nVariables)}
                </td>
              </tr>
            </tbody>
          </Table>
          <Button
            className="float-end"
            variant="outline-dark"
            size="lg"
            type="submit"
          >
            Set
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Runs;
