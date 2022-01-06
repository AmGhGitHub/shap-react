import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

import numberFormatter from "../util/formatNumber";

const ModelSpecs = () => {
  const [sampleSize, setSampleSize] = useState(2);
  const [repeatedRowsPct, setRepeatedRowsPct] = useState(0);
  const [varType, setVarType] = useState([
    {
      id: 0,
      distribution: "normal",
      null_pct: 0,
      param0: 0,
      param1: 0,
      param2: 0,
    },
  ]);

  const handleChangeSampleSize = (e) => {
    setSampleSize(parseInt(e.target.value));
  };

  const handleDeleteVariable = () => {
    if (varType.length > 1) {
      const newArr = varType.filter((_, i) => i !== varType.length - 1);
      setVarType(newArr);
    }
  };

  const handleAddVarible = () => {
    if (varType.length < 11) {
      setVarType((prv) => [
        ...prv,
        {
          id: prv[prv.length - 1].id + 1,
          distribution: "normal",
          null_pct: 0,
          param0: 0,
          param1: 0,
          param2: 0,
        },
      ]);
    }
  };

  const handleChangeDistribution = (index, e) => {
    const name = e.target.name;
    let obj = null;
    if (name.includes("dist")) {
      obj = { ...varType[index], distribution: e.target.value }; // copying the old datas array
    }
    if (name.includes("null")) {
      obj = { ...varType[index], null_pct: e.target.value }; // copying the old datas array
    }
    if (name.includes("param0")) {
      obj = { ...varType[index], param0: e.target.value }; // copying the old datas array
    }
    if (name.includes("param1")) {
      obj = { ...varType[index], param1: e.target.value }; // copying the old datas array
    }
    if (name.includes("param2")) {
      obj = { ...varType[index], param2: e.target.value }; // copying the old datas array
    }

    let newArr = [...varType];
    newArr[index] = obj;
    setVarType(newArr);
  };

  return (
    <Form>
      <Row>
        <Col>
          <h2 className="my-3 text-danger">Model Specs</h2>
          <Row>
            <Col sm={4}>
              <h5>Sample Size</h5>
              <Form.Range
                min="1"
                max="5"
                value={sampleSize}
                onChange={handleChangeSampleSize}
              />
            </Col>
            <Col sm={2}>
              <h5>Number</h5>
              <p>{numberFormatter(Math.pow(10, parseInt(sampleSize)))}</p>
            </Col>
            <Col sm={4}>
              <h5>Repeated Rows</h5>
              <Form.Range
                min="0"
                max="20"
                value={repeatedRowsPct}
                onChange={(e) => setRepeatedRowsPct(e.target.value)}
              />
            </Col>
            <Col sm={2}>
              <h5>%</h5>
              <p>{repeatedRowsPct}</p>
            </Col>
          </Row>
          <h2 className="my-3 text-danger">Variable Specs</h2>
          <Table responsive bordered size="sm">
            <thead>
              <tr>
                <th>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Variable </span>
                    <span className="mx-2">
                      <BiPlusCircle onClick={handleAddVarible} />
                    </span>
                    <span>
                      <BiMinusCircle onClick={handleDeleteVariable} />
                    </span>
                  </div>
                </th>
                <th>Distribution</th>
                <th>% Null</th>
                <th colSpan={3}>Distribution Properties</th>
              </tr>
            </thead>
            <tbody>
              {varType.map((x) => {
                const { id } = x;
                return (
                  <tr key={id}>
                    <td>X{id}</td>
                    <td>
                      <Form.Select
                        name={`X${id}_distribution`}
                        size="sm"
                        onChange={(e) => handleChangeDistribution(id, e)}
                      >
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
                        id={`X${id}_null_pct`}
                        name={`X${id}_null_pct`}
                        value={varType[id]["null_pct"]}
                        onChange={(e) => handleChangeDistribution(id, e)}
                      />
                    </td>
                    {x.distribution === "normal" && (
                      <>
                        <td>
                          <Form.Control
                            size="sm"
                            type="number"
                            id={`X${id}_param0`}
                            name={`X${id}_param0`}
                            value={varType[id]["param0"]}
                            onChange={(e) => handleChangeDistribution(id, e)}
                            placeholder="&mu;"
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="number"
                            min="0"
                            id={`X${id}_param1`}
                            name={`X${id}_param1`}
                            value={varType[id]["param1"]}
                            onChange={(e) => handleChangeDistribution(id, e)}
                            placeholder="&sigma;"
                          />
                        </td>
                        <td>
                          <Form.Control size="sm" type="number" disabled />
                        </td>
                      </>
                    )}

                    {x.distribution === "triangular" && (
                      <>
                        <td>
                          <Form.Control
                            size="sm"
                            type="number"
                            id={`X${id}_param0`}
                            name={`X${id}_param0`}
                            value={varType[id]["param1"]}
                            onChange={(e) => handleChangeDistribution(id, e)}
                            placeholder="min"
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="number"
                            id={`X${id}_param1`}
                            name={`X${id}_param1`}
                            value={varType[id]["param1"]}
                            onChange={(e) => handleChangeDistribution(id, e)}
                            placeholder="mode"
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="number"
                            id={`X${id}_param2`}
                            name={`X${id}_param2`}
                            value={varType[id]["param2"]}
                            onChange={(e) => handleChangeDistribution(id, e)}
                            placeholder="max"
                          />
                        </td>
                      </>
                    )}
                    {x.distribution === "uniform" && (
                      <>
                        <td>
                          <Form.Control
                            size="sm"
                            type="number"
                            id={`X${id}_param0`}
                            name={`X${id}_param0`}
                            value={varType[id]["param1"]}
                            onChange={(e) => handleChangeDistribution(id, e)}
                            placeholder="min"
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="number"
                            min="0"
                            id={`X${id}_param1`}
                            name={`X${id}_param1`}
                            value={varType[id]["param1"]}
                            onChange={(e) => handleChangeDistribution(id, e)}
                            placeholder="max"
                          />
                        </td>
                        <td>
                          <Form.Control size="sm" type="number" disabled />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col></Col>
      </Row>
    </Form>
  );
};

export default ModelSpecs;
