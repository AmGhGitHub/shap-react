import { useSelector, useDispatch } from "react-redux";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

import {
  changeVaribaleNullPercetage,
  changeVaribaleDistribution,
} from "../store/vars-slice";

const VarDistTable = () => {
  const { var_dists } = useSelector((state) => state.varDataReducer);
  const dispatch = useDispatch();

  const handleChangeNull = (index, e) =>
    dispatch(changeVaribaleNullPercetage({ index, value: e.target.value }));

  const handleChangeDistributiob = (index, e) =>
    dispatch(changeVaribaleDistribution({ index, value: e.target.value }));

  return (
    <Table responsive bordered size="sm">
      <thead>
        <tr>
          <th>Var</th>
          <th>Distribution</th>
          <th>%Null</th>
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
              <td>
                <Form.Select
                  name={`${letter}_distribution`}
                  size="sm"
                  onChange={(e) => handleChangeDistributiob(id, e)}
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
                  id={`X${letter}_null_pct`}
                  name={`X${letter}_null_pct`}
                  value={var_dists[id]["null_pct"]}
                  onChange={(e) => handleChangeNull(id, e)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default VarDistTable;
