import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { updateVariablesHistogramData } from "../store/results-slice";

const URL = "http://localhost:8000/api/";
const fetchData = async (formData) => {
  const response = await axios({
    method: "post",
    url: URL + "generate/",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.results;
};

const RunComponent = () => {
  const { var_dists, sample_size_exponent, repeated_rows_pct } = useSelector(
    (state) => state.varDataReducer
  );

  const { latex_equation } = useSelector((state) => state.varRelationReducer);

  const { variablesHistogramData } = useSelector(
    (state) => state.varResultsReducer
  );

  const dispatch = useDispatch();

  const handleRun = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("variables_data", JSON.stringify(var_dists));
    form_data.append("sample_size_exponent", sample_size_exponent);
    form_data.append("repeated_rows_pct", repeated_rows_pct);
    form_data.append("latex_equation", latex_equation);
    // form_data.append("use_python_plots", usePythonPlots);

    // for (let pair of form_data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    fetchData(form_data).then((res) => {
      dispatch(updateVariablesHistogramData(res["hist_binSize_binCenters"]));
      //   setHistData(res["hist_binSize_binCenters"]);
      //   setShowResults(true);
      //   setLoadingData(false);
      //   setChart(res["python_plot"]);
      //   console.log(variablesHistogramData);
    });
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-end">
          <Button onClick={handleRun} type="submit" size="lg" className="my-3">
            Run
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RunComponent;
