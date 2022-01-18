// based on https://www.npmjs.com/package/react-hook-mathjax
import Tex2SVG from "react-hook-mathjax";

import { useSelector, useDispatch } from "react-redux";
import { changeEquation } from "../store/relationship-slice";

const Equation = () => {
  const { latex_equation } = useSelector((state) => state.varRelationReducer);
  const dispatch = useDispatch();

  return (
    <section className="mt-4">
      <div className="container border">
        <h2 className="mb-4">Defining Relationships</h2>
        <div className="input-group mb-3 w-75 mx-auto">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Formula (Latex Format) :
          </span>
          <input
            type="text"
            className="form-control"
            defaultValue={latex_equation}
            onChange={(e) => dispatch(changeEquation(e.target.value))}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center text-primary">
          <h4 className="px-2">f=</h4>
          <Tex2SVG tabindex={-1} latex={latex_equation} />
        </div>
      </div>
    </section>
  );
};

export default Equation;
