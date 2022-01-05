import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
const VarTable = ({ arr, setDist }) => {
  const [varDistParams, setVarDistParams] = useState({});
  const [params, setParams] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVarDistParams({ ...varDistParams, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setParams({ ...varDistParams });
    setDist({ ...varDistParams });
    // setShow(true);
  };

  return (
    <Row className="my-3">
      <Col>
        <h4>Variables Specs</h4>
        <Form>
          <Table responsive bordered size="sm">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Distribution</th>
                <th>% Nullified</th>
                <th>% Repeated</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((x, i) => (
                <tr key={i}>
                  <td>X{i}</td>
                  <td>
                    <Form.Select
                      name={`X${i}_distribution`}
                      size="sm"
                      onChange={handleChange}
                    >
                      <option>Select Distribution</option>
                      <option value="normal">Normal</option>
                      <option value="uniform">Uniform</option>
                      <option value="triangular">Triangular</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      size="sm"
                      type="number"
                      min="0"
                      max="20"
                      step="1"
                      id={`X${i}_null_pct`}
                      name={`X${i}_null_pct`}
                      placeholder="0"
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      size="sm"
                      type="number"
                      min="0"
                      max="20"
                      step="1"
                      id={`X${i}_repeated_pct`}
                      name={`X${i}_repeated_pct`}
                      placeholder="0"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            className="float-end"
            variant="outline-dark"
            size="lg"
            type="submit"
            onClick={handleSubmit}
          >
            Apply
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default VarTable;
