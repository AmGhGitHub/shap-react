import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
const VarTable = ({ arr, setDist }) => {
  // console.log(filled);
  const [params, setParams] = useState([
    {
      id: 0,
      distribution: "",
      null_pct: 0,
      repeated: 0,
    },
  ]);

  const handleChangeDistribution = (index, e) => {
    const name = e.target.name;
    let obj = null;
    if (name.includes("dist")) {
      obj = { ...params[index], id: index, distribution: e.target.value }; // copying the old datas array
    }
    if (name.includes("null")) {
      obj = { ...params[index], id: index, null_pct: e.target.value }; // copying the old datas array
    }
    if (name.includes("repeated")) {
      obj = { ...params[index], id: index, repeated: e.target.value }; // copying the old datas array
    }
    // obj["distribution"] = e.target.value; // replace e.target.value with whatever you want to change it to
    let newArr = [...params];
    newArr[index] = obj;
    setParams(newArr);
    console.log(params);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setParams({ ...varDistParams });
    setDist([...params]);
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
                      onChange={(e) => handleChangeDistribution(i, e)}
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
                      value={params[0]["null_pct"]}
                      onChange={(e) => handleChangeDistribution(i, e)}
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
                      value={params[0]["repeated"]}
                      onChange={(e) => handleChangeDistribution(i, e)}
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
