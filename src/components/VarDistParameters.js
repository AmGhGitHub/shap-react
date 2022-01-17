import { useSelector, useDispatch } from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";

import { changeVaribaleDistributionParameter } from "../store/vars-slice";

const VarDistParameters = () => {
  const { var_dists } = useSelector((state) => state.varDataReducer);
  const dispatch = useDispatch();

  const handleChangeDistributionParam = (index, e) => {
    const name = e.target.name;

    if (name.includes("param0"))
      dispatch(
        changeVaribaleDistributionParameter({
          index,
          param: "param0",
          value: e.target.value,
        })
      );

    if (name.includes("param1"))
      dispatch(
        changeVaribaleDistributionParameter({
          index,
          param: "param1",
          value: e.target.value,
        })
      );

    if (name.includes("param2"))
      dispatch(
        changeVaribaleDistributionParameter({
          index,
          param: "param2",
          value: e.target.value,
        })
      );
  };

  return (
    <>
      <Table responsive bordered size="sm">
        <thead>
          <tr>
            <th>Var</th>
            <th colSpan={3}>Distribution Properties</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {var_dists.map((x) => {
            const { id, letter } = x;
            return (
              <tr key={id}>
                <td>
                  <em>{letter}</em>
                </td>
                {x.distribution === "normal" && (
                  <>
                    <td>
                      <InputGroup size="sm">
                        <InputGroup.Text id={`${letter}_mu`} className="px-3">
                          &mu;
                        </InputGroup.Text>
                        <Form.Control
                          size="sm"
                          type="number"
                          step=".01"
                          id={`${letter}_param0`}
                          name={`${letter}_param0`}
                          value={var_dists[id]["param0"]}
                          onChange={(e) => handleChangeDistributionParam(id, e)}
                          placeholder="&mu;"
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <InputGroup size="sm">
                        <InputGroup.Text
                          id={`${letter}_sigma`}
                          className="px-3"
                        >
                          &sigma;
                        </InputGroup.Text>
                        <Form.Control
                          size="sm"
                          type="number"
                          min="0"
                          step=".01"
                          id={`${letter}_param1`}
                          name={`${letter}_param1`}
                          value={var_dists[id]["param1"]}
                          onChange={(e) => handleChangeDistributionParam(id, e)}
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
                        <InputGroup.Text id={`${letter}_min`}>
                          min
                        </InputGroup.Text>
                        <Form.Control
                          size="sm"
                          type="number"
                          step=".01"
                          id={`${letter}_param0`}
                          name={`${letter}_param0`}
                          value={var_dists[id]["param0"]}
                          onChange={(e) => handleChangeDistributionParam(id, e)}
                          placeholder="min"
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <InputGroup size="sm">
                        <InputGroup.Text id={`${letter}_mode`}>
                          mode
                        </InputGroup.Text>
                        <Form.Control
                          size="sm"
                          type="number"
                          step=".01"
                          id={`X${id}_param1`}
                          name={`X${id}_param1`}
                          value={var_dists[id]["param1"]}
                          onChange={(e) => handleChangeDistributionParam(id, e)}
                          placeholder="mode"
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <InputGroup size="sm">
                        <InputGroup.Text id={`${letter}_max`}>
                          max
                        </InputGroup.Text>
                        <Form.Control
                          size="sm"
                          type="number"
                          step=".01"
                          id={`${letter}_param2`}
                          name={`${letter}_param2`}
                          value={var_dists[id]["param2"]}
                          onChange={(e) => handleChangeDistributionParam(id, e)}
                        />
                      </InputGroup>
                    </td>
                  </>
                )}
                {x.distribution === "uniform" && (
                  <>
                    <td>
                      <InputGroup size="sm">
                        <InputGroup.Text id={`${letter}_min`}>
                          min
                        </InputGroup.Text>
                        <Form.Control
                          size="sm"
                          type="number"
                          step=".01"
                          id={`${letter}_param0`}
                          name={`${letter}_param0`}
                          value={var_dists[id]["param0"]}
                          onChange={(e) => handleChangeDistributionParam(id, e)}
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <InputGroup size="sm">
                        <InputGroup.Text id={`${letter}_max`}>
                          max
                        </InputGroup.Text>

                        <Form.Control
                          size="sm"
                          type="number"
                          min="0"
                          step=".01"
                          id={`${letter}_param1`}
                          name={`${letter}_param1`}
                          value={var_dists[id]["param1"]}
                          onChange={(e) => handleChangeDistributionParam(id, e)}
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
    </>
  );
};

export default VarDistParameters;
