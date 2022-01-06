import axios from "axios";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import numberFormatter from "../util/formatNumber";

const MAX_NUMBER_OF_VARIABLES = 10;
const DEFAULT_PARAMETERS = {
  distribution: "normal",
  null_pct: 5,
  param0: 0,
  param1: 1,
  param2: 0,
};

const fetchData = async (formData) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:8000/api/generate/",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  const vars_hist_data = response.data["hist_binSize_binCenters"];
  // for (let i = 0; i < vars_hist_data.length; i++) {
  //   console.log(vars_hist_data[i]["bin_size"]);
  // }
  return response.data["sample_size"];
};

const ModelSpecs = () => {
  const [results, setResults] = useState(0);
  const [sampleSize, setSampleSize] = useState(2);
  const [repeatedRowsPct, setRepeatedRowsPct] = useState(0);
  const [varData, setVarData] = useState([
    {
      id: 0,
      ...DEFAULT_PARAMETERS,
    },
  ]);

  const handleRun = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("variables_data", JSON.stringify(varData));
    form_data.append("sample_size_exponent", sampleSize);
    form_data.append("repeated_rows_pct", repeatedRowsPct);
    fetchData(form_data).then((val) => setResults(val));
  };

  const handleChangeSampleSize = (e) => {
    setSampleSize(parseInt(e.target.value));
  };

  const handleDeleteVariable = () => {
    if (varData.length > 1) {
      const newArr = varData.filter((_, i) => i !== varData.length - 1);
      setVarData(newArr);
    }
  };

  const handleAddVarible = () => {
    if (varData.length < MAX_NUMBER_OF_VARIABLES) {
      setVarData((prv) => [
        ...prv,
        {
          id: prv[prv.length - 1].id + 1,
          ...DEFAULT_PARAMETERS,
        },
      ]);
    }
  };

  const handleChangeDistribution = (index, e) => {
    const name = e.target.name;
    let obj = null;
    if (name.includes("dist")) {
      obj = { ...varData[index], distribution: e.target.value }; // copying the old datas array
    }
    if (name.includes("null")) {
      obj = { ...varData[index], null_pct: e.target.value }; // copying the old datas array
    }
    if (name.includes("param0")) {
      obj = { ...varData[index], param0: e.target.value }; // copying the old datas array
    }
    if (name.includes("param1")) {
      obj = { ...varData[index], param1: e.target.value }; // copying the old datas array
    }
    if (name.includes("param2")) {
      obj = { ...varData[index], param2: e.target.value }; // copying the old datas array
    }

    let newArr = [...varData];
    newArr[index] = obj;
    setVarData(newArr);
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
                <th>%Null</th>
                <th colSpan={3}>Distribution Properties</th>
              </tr>
            </thead>
            <tbody>
              {varData.map((x) => {
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
                        value={varData[id]["null_pct"]}
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
                            value={varData[id]["param0"]}
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
                            value={varData[id]["param1"]}
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
                            value={varData[id]["param0"]}
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
                            value={varData[id]["param1"]}
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
                            value={varData[id]["param2"]}
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
                            value={varData[id]["param0"]}
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
                            value={varData[id]["param1"]}
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
          <Button type="submit" className="float-end" onClick={handleRun}>
            Run
          </Button>
        </Col>
        <Col>
          <h1>{results}</h1>
        </Col>
      </Row>
    </Form>
  );
};

export default ModelSpecs;
