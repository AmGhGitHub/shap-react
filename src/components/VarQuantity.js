import { useSelector, useDispatch } from "react-redux";
import { addVariable, removeVariable } from "../store/vars-slice";

const VarQuantity = () => {
  const { var_dists } = useSelector((state) => state.varDataReducer);
  const dispatch = useDispatch();
  return (
    <div class="d-flex align-items-center justify-content-between">
      <h5 className="text-primary">
        Number of variables:
        <span className="text-dark"> {var_dists.length}</span>{" "}
      </h5>
      <div className="d-flex">
        <h5 className="text-primary mx-2">
          <i
            className="bi bi-plus-square"
            onClick={() => dispatch(addVariable())}
          ></i>
        </h5>
        <h5 className="text-danger">
          <i
            className="bi bi-dash-square"
            onClick={() => dispatch(removeVariable())}
          ></i>
        </h5>
      </div>
    </div>
  );
};

export default VarQuantity;
