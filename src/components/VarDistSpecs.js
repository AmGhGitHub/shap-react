import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const VarDistParams = ({ dist }) => {
  console.log(dist);
  return (
    <Row className="my-3">
      <Col>
        <h4>Variables Dist Specs</h4>
        <Form>
          <Table responsive bordered size="sm">
            <thead>
              <tr>
                <th>Variable</th>
                <th colSpan={3}>Distribution Parameters</th>
              </tr>
            </thead>
            <tbody>
              {dist.map((d, i) => {
                if (d === "normal") {
                  return (
                    <tr key={i}>
                      <td className="align-middle">X{i + 1}</td>
                      <td>
                        <div className="input-group my-1">
                          <span className="input-group-text" id="basic-addon1">
                            <strong>&mu;</strong>
                          </span>
                          <input type="text" className="form-control" />
                        </div>
                      </td>
                      <td>
                        <div className="input-group my-1">
                          <span className="input-group-text" id="basic-addon1">
                            <strong>&sigma;</strong>
                          </span>
                          <input type="text" className="form-control" />
                        </div>
                      </td>
                      <td>
                        <div className="input-group my-1">
                          <input
                            type="text"
                            className="form-control"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
                if (d === "uniform") {
                  return (
                    <tr key={i}>
                      <td className="align-middle">X{i + 1}</td>
                      <td>
                        <div className="input-group  my-1">
                          <span className="input-group-text" id="basic-addon1">
                            <strong>min</strong>
                          </span>
                          <input type="text" className="form-control" />
                        </div>
                      </td>
                      <td>
                        <div className="input-group  my-1">
                          <span className="input-group-text" id="basic-addon1">
                            <strong>max</strong>
                          </span>
                          <input type="text" className="form-control" />
                        </div>
                      </td>
                      <td>
                        <div className="input-group  my-1">
                          <input
                            type="text"
                            className="form-control"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={i}>
                    <td className="align-middle">X{i}</td>
                    <td>
                      <div className="input-group my-1">
                        <span className="input-group-text" id="basic-addon1">
                          <strong>min</strong>
                        </span>
                        <input type="text" className="form-control" />
                      </div>
                    </td>
                    <td>
                      <div className="input-group my-1">
                        <span className="input-group-text" id="basic-addon1">
                          <strong>mode</strong>
                        </span>
                        <input type="text" className="form-control" />
                      </div>
                    </td>
                    <td>
                      <div className="input-group my-1">
                        <span className="input-group-text" id="basic-addon1">
                          <strong>max</strong>
                        </span>
                        <input type="text" className="form-control" />
                      </div>
                    </td>
                  </tr>
                );
              })}
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

export default VarDistParams;
