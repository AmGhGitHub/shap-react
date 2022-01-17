import { useState } from "react";
import Tex2SVG from "react-hook-mathjax";
import Button from "react-bootstrap/Button";

import { useSelector, useDispatch } from "react-redux";
import { changeEquation } from "../store/relationship-slice";

const Equation = () => {
  const { latex_equation } = useSelector((state) => state.varRelationReducer);
  const dispatch = useDispatch();

  // const [inputValue, setInputValue] = useState(
  //   "a+\\frac{c}{\\sqrt[3]{d+b}}-\\frac{2}{3}e^4-\\frac{af}{\\pi}"
  // );

  return (
    <section className="mt-4">
      <div className="container border">
        <h2 className="mb-4">Defining Relationships</h2>
        <div class="input-group mb-3 w-75 mx-auto">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Formula (Latex Format) :
          </span>
          <input
            type="text"
            class="form-control"
            defaultValue={latex_equation}
            onChange={(e) => dispatch(changeEquation(e.target.value))}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center text-primary">
          <h4 className="px-2">f=</h4>
          <Tex2SVG tabindex={-1} latex={latex_equation} />
        </div>
      </div>
      <div className="container">
        <Button type="submit" size="lg" className="float-end my-3">
          Run
        </Button>
      </div>
    </section>
  );
};

export default Equation;
