import axios from "axios";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import numberFormatter from "../util/formatNumber";

import VarsHistogram from "./VarsHistogram";

const MAX_NUMBER_OF_VARIABLES = 10;
const URL = "http://localhost:8000/api/";
const DEFAULT_NORMAL_PARAMETERS = {
  distribution: "normal",
  null_pct: 5,
  param0: 0,
  param1: 1,
  param2: 0,
};

const DEFAULT_UNIFORM_PARAMETERS = {
  distribution: "uniform",
  null_pct: 5,
  param0: -1,
  param1: 1,
  param2: 0,
};

const DEFAULT_TRIANGULAR_PARAMETERS = {
  distribution: "triangular",
  null_pct: 5,
  param0: -1,
  param1: 0,
  param2: 1,
};

const fetchData = async (formData) => {
  const response = await axios({
    method: "post",
    url: URL + "generate/",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.results;
};

const ModelSpecs = () => {
  const [showResults, setShowResults] = useState(false);
  const [histData, setHistData] = useState([{ bin_size: [], bin_centers: [] }]);
  const [sampleSize, setSampleSize] = useState(2);
  const [repeatedRowsPct, setRepeatedRowsPct] = useState(0);
  const [chart, setChart] = useState();
  const [varData, setVarData] = useState([
    {
      id: 0,
      ...DEFAULT_NORMAL_PARAMETERS,
    },
  ]);
  const [usePythonPlots, setUsePythonPlots] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleRun = (e) => {
    e.preventDefault();
    setLoadingData(true);
    let form_data = new FormData();
    form_data.append("variables_data", JSON.stringify(varData));
    form_data.append("sample_size_exponent", sampleSize);
    form_data.append("repeated_rows_pct", repeatedRowsPct);
    form_data.append("use_python_plots", usePythonPlots);

    // for (let pair of form_data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    fetchData(form_data).then((res) => {
      setHistData(res["hist_binSize_binCenters"]);
      setShowResults(true);
      setLoadingData(false);
      setChart(res["python_plot"]);
    });
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
          ...DEFAULT_NORMAL_PARAMETERS,
        },
      ]);
    }
  };

  const handleChangeDistribution = (index, e) => {
    const name = e.target.name;
    let obj = null;
    if (name.includes("dist")) {
      const value = e.target.value;
      if (value === "normal")
        obj = { ...varData[index], ...DEFAULT_NORMAL_PARAMETERS };
      if (value === "uniform")
        obj = { ...varData[index], ...DEFAULT_UNIFORM_PARAMETERS };
      if (value === "triangular")
        obj = { ...varData[index], ...DEFAULT_TRIANGULAR_PARAMETERS };
      // obj = { ...varData[index], distribution: e.target.value }; // copying the old datas array
    }
    if (name.includes("null")) {
      obj = { ...varData[index], null_pct: parseFloat(e.target.value) }; // copying the old datas array
    }
    if (name.includes("param0")) {
      obj = { ...varData[index], param0: parseFloat(e.target.value) }; // copying the old datas array
    }
    if (name.includes("param1")) {
      obj = { ...varData[index], param1: parseFloat(e.target.value) }; // copying the old datas array
    }
    if (name.includes("param2")) {
      obj = { ...varData[index], param2: parseFloat(e.target.value) }; // copying the old datas array
    }

    let newArr = [...varData];
    newArr[index] = obj;
    setVarData(newArr);
  };

  return (
    <>
      <Row>
        <Col>
          <Form>
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
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
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
                  <th style={{ width: "15%" }}>Distribution</th>
                  <th style={{ width: "10%" }}>%Null</th>
                  <th colSpan={3}>Distribution Properties</th>
                </tr>
              </thead>
              <tbody className="align-middle">
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
                          step="0.1"
                          id={`X${id}_null_pct`}
                          name={`X${id}_null_pct`}
                          value={varData[id]["null_pct"]}
                          onChange={(e) => handleChangeDistribution(id, e)}
                        />
                      </td>
                      {x.distribution === "normal" && (
                        <>
                          <td>
                            <InputGroup size="sm">
                              <InputGroup.Text
                                id={`X${id}_mu`}
                                className="px-3"
                              >
                                &mu;
                              </InputGroup.Text>
                              <Form.Control
                                size="sm"
                                type="number"
                                step=".01"
                                id={`X${id}_param0`}
                                name={`X${id}_param0`}
                                value={varData[id]["param0"]}
                                onChange={(e) =>
                                  handleChangeDistribution(id, e)
                                }
                                placeholder="&mu;"
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <InputGroup size="sm">
                              <InputGroup.Text
                                id={`X${id}_sigma`}
                                className="px-3"
                              >
                                &sigma;
                              </InputGroup.Text>
                              <Form.Control
                                size="sm"
                                type="number"
                                min="0"
                                step=".01"
                                id={`X${id}_param1`}
                                name={`X${id}_param1`}
                                value={varData[id]["param1"]}
                                onChange={(e) =>
                                  handleChangeDistribution(id, e)
                                }
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <Form.Control size="sm" type="number" disabled />
                          </td>
                        </>
                      )}

                      {x.distribution === "triangular" && (
                        <>
                          <td>
                            <InputGroup size="sm">
                              <InputGroup.Text id={`X${id}_min`}>
                                min
                              </InputGroup.Text>
                              <Form.Control
                                size="sm"
                                type="number"
                                step=".01"
                                id={`X${id}_param0`}
                                name={`X${id}_param0`}
                                value={varData[id]["param0"]}
                                onChange={(e) =>
                                  handleChangeDistribution(id, e)
                                }
                                placeholder="min"
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <InputGroup size="sm">
                              <InputGroup.Text id={`X${id}_mode`}>
                                mode
                              </InputGroup.Text>
                              <Form.Control
                                size="sm"
                                type="number"
                                step=".01"
                                id={`X${id}_param1`}
                                name={`X${id}_param1`}
                                value={varData[id]["param1"]}
                                onChange={(e) =>
                                  handleChangeDistribution(id, e)
                                }
                                placeholder="mode"
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <InputGroup size="sm">
                              <InputGroup.Text id={`X${id}_max`}>
                                max
                              </InputGroup.Text>
                              <Form.Control
                                size="sm"
                                type="number"
                                step=".01"
                                id={`X${id}_param2`}
                                name={`X${id}_param2`}
                                value={varData[id]["param2"]}
                                onChange={(e) =>
                                  handleChangeDistribution(id, e)
                                }
                                placeholder="max"
                              />
                            </InputGroup>
                          </td>
                        </>
                      )}
                      {x.distribution === "uniform" && (
                        <>
                          <td>
                            <InputGroup size="sm">
                              <InputGroup.Text id={`X${id}_min`}>
                                min
                              </InputGroup.Text>
                              <Form.Control
                                size="sm"
                                type="number"
                                step=".01"
                                id={`X${id}_param0`}
                                name={`X${id}_param0`}
                                value={varData[id]["param0"]}
                                onChange={(e) =>
                                  handleChangeDistribution(id, e)
                                }
                                placeholder="min"
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <InputGroup>
                              <InputGroup.Text id={`X${id}_max`}>
                                max
                              </InputGroup.Text>

                              <Form.Control
                                size="sm"
                                type="number"
                                min="0"
                                step=".01"
                                id={`X${id}_param1`}
                                name={`X${id}_param1`}
                                value={varData[id]["param1"]}
                                onChange={(e) =>
                                  handleChangeDistribution(id, e)
                                }
                                placeholder="max"
                              />
                            </InputGroup>
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
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={usePythonPlots}
                onChange={(e) => setUsePythonPlots(!usePythonPlots)}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Get Python plot directly?
              </label>
            </div>
            <Button type="submit" className="float-end" onClick={handleRun}>
              Run
            </Button>
          </Form>
        </Col>
        <Col>{showResults && <VarsHistogram hist_data={histData} />}</Col>
      </Row>
      {loadingData && (
        <Row>
          <>
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="danger" />
          </>
        </Row>
      )}

      {!loadingData && (
        <Row>
          <h3 className="danger">Direct Python Import:</h3>
          <img
            src={`data:image/jpeg;base64,${chart}`}
            alt=""
            className="my-3"
          />
        </Row>
      )}
    </>
  );
};

export default ModelSpecs;
