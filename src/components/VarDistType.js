import React, { useState, useEffect, useReducer } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const getInitial = (n) => {
  const data = new Array(n).fill(0);
  return data.map((val, i) => {
    return { id: i, distribution: "", null_pct: 0 };
  });
};

const VarTable = ({ nvar, setDist, setShow }) => {
  let data_init = getInitial(nvar);
  const [params, setParams] = useState(data_init);
  const [repeatedpct, setRepeatedpct] = useState(0);

  const getNewData = (nvar) => {
    const newParmas = params.map((item, index) => {
      if (nvar <= params.length) {
        return item;
      } else {
        return { id: index, distribution: "", null_pct: 0 };
      }
    });
    setParams(newParmas);
  };

  const [myArray, dispatch] = useReducer(
    (myArray, { type, value }) => {
      switch (type) {
        case "add":
          return [...myArray, value];
        case "remove":
          return myArray.filter((_, index) => index !== value);
        default:
          return myArray;
      }
    },
    [1, 2, 3]
  );

  // useEffect(() => {
  //   getNewData(nvar);
  // }, []);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDist(params.map(({ distribution }) => distribution));
    setShow(true);
  };

  const handleChangeRepeatedRows = (e) => {
    setRepeatedpct(e.target.value);
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
                <th>% Null</th>
                {/* <th>% Repeated</th> */}
              </tr>
            </thead>
            <tbody>
              {params.map((x, i) => (
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
                      value={params[i]["null_pct"]}
                      onChange={(e) => handleChangeDistribution(i, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row>
            <Col sm={10}>
              <h5>% Repeated Rows</h5>
              <Form.Range
                min="0"
                max="20"
                value={repeatedpct}
                onChange={handleChangeRepeatedRows}
              />
            </Col>
            <Col sm={2}>
              <h5>Value</h5>
              <p>{repeatedpct}</p>
            </Col>
          </Row>
          <Button
            className="float-end my-2"
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
