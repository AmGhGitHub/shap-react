import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

import numberFormatter from "../util/formatNumber";

const ModelSpecs = () => {
  const [sampleSize, setSampleSize] = useState(2);
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
        { id: prv[prv.length - 1].id + 1, distribution: "normal", null_pct: 0 },
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
            <Col sm={10}>
              <h5>Sample Size</h5>
              <Form.Range
                min="1"
                max="5"
                value={sampleSize}
                onChange={handleChangeSampleSize}
              />
            </Col>
            <Col sm={2}>
              <h5>Value</h5>
              <p>{numberFormatter(Math.pow(10, parseInt(sampleSize)))}</p>
            </Col>
          </Row>
        </Col>

        {/* varible types */}

        <Col>
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
                {/* <th colSpan={2}></th> */}
              </tr>
            </thead>
            <tbody>
              {varType.map((x) => (
                <tr key={x.id}>
                  <td>X{x.id}</td>
                  <td>
                    <Form.Select
                      name={`X${x.id}_distribution`}
                      size="sm"
                      onChange={(e) => handleChangeDistribution(x.id, e)}
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
                      id={`X${x.id}_null_pct`}
                      name={`X${x.id}_null_pct`}
                      value={varType[x.id]["null_pct"]}
                      onChange={(e) => handleChangeDistribution(x.id, e)}
                    />
                  </td>
                  {x.distribution === "normal" && (
                    <>
                      <td>
                        <Form.Control
                          size="sm"
                          type="number"
                          id={`X${x.id}_param0`}
                          name={`X${x.id}_param0`}
                          value={varType[x.id]["param0"]}
                          onChange={(e) => handleChangeDistribution(x.id, e)}
                          placeholder="&mu;"
                        />
                      </td>
                      <td>
                        <Form.Control
                          size="sm"
                          type="number"
                          min="0"
                          id={`X${x.id}_param1`}
                          name={`X${x.id}_param1`}
                          value={varType[x.id]["param1"]}
                          onChange={(e) => handleChangeDistribution(x.id, e)}
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
                          id={`X${x.id}_param0`}
                          name={`X${x.id}_param0`}
                          value={varType[x.id]["param1"]}
                          onChange={(e) => handleChangeDistribution(x.id, e)}
                          placeholder="min"
                        />
                      </td>
                      <td>
                        <Form.Control
                          size="sm"
                          type="number"
                          id={`X${x.id}_param1`}
                          name={`X${x.id}_param1`}
                          value={varType[x.id]["param1"]}
                          onChange={(e) => handleChangeDistribution(x.id, e)}
                          placeholder="mode"
                        />
                      </td>
                      <td>
                        <Form.Control
                          size="sm"
                          type="number"
                          id={`X${x.id}_param2`}
                          name={`X${x.id}_param2`}
                          value={varType[x.id]["param2"]}
                          onChange={(e) => handleChangeDistribution(x.id, e)}
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
                          id={`X${x.id}_param0`}
                          name={`X${x.id}_param0`}
                          value={varType[x.id]["param1"]}
                          onChange={(e) => handleChangeDistribution(x.id, e)}
                          placeholder="min"
                        />
                      </td>
                      <td>
                        <Form.Control
                          size="sm"
                          type="number"
                          min="0"
                          id={`X${x.id}_param1`}
                          name={`X${x.id}_param1`}
                          value={varType[x.id]["param1"]}
                          onChange={(e) => handleChangeDistribution(x.id, e)}
                          placeholder="max"
                        />
                      </td>
                      <td>
                        <Form.Control size="sm" type="number" disabled />
                      </td>
                    </>
                  )}

                  {/* <td className="text-center">
                    <BsPlusSquare onClick={handleAddVarible} />
                  </td>

                  <td className="text-center">
                    {x.id === 0 ? (
                      <BsTrash />
                    ) : (
                      <BsTrash onClick={handleDeleteVariable} />
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          {/* <h2 className="my-3 text-danger">Distribution Specs</h2>
        <Table responsive bordered size="sm">
          <thead>
            <tr>
              <th>Variable</th>
              <th colSpan={3}>Distribution Parameters</th>
            </tr>
          </thead>
        </Table> */}
        </Col>
      </Row>
    </Form>
  );
};

export default ModelSpecs;
