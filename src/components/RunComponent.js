import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  updateInputsHistogramData,
  updateOutputHistogramData,
  updateHistogramData,
  updateModel,
  updateShap
} from "../store/results-distributions-slice";

const URL = "http://localhost:8000/api/";

const submitData = async (formData) => {
  const response = await axios({
    method: "post",
    url: URL + "generate/",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.celery_task_id;
};

const RunComponent = () => {
  const [celeryTaskId, setCeleryTaskId] = useState();
  const { var_dists, sample_size_exponent, repeated_rows_pct } = useSelector(
    (state) => state.varDataReducer);

  const { latex_equation } = useSelector((state) => state.varRelationReducer);

  const dispatch = useDispatch();
  const firstUpdate = useRef(true);
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    // to prevent the initial render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const interval = setInterval(
      async () => {
        const response = await axios({
          method: "get",
          url: URL + "generate/",
          params: { task_id: celeryTaskId }
        });
        const res = response.data;
        console.log(res)

        if (res.status === 'SUCCESS') {
          const { inputs: hist_inputs, output: hist_output } = res["Histogram data"]
          const { model, shap } = res["ML-SHAP data"]
          dispatch(updateHistogramData({ hist_inputs, hist_output }));
          dispatch(updateModel(model))
          dispatch(updateShap(shap))
          clearInterval(interval);
          setShowSpinner(false);
        };
      }, 500);

    return () => clearInterval(interval);

  }, [celeryTaskId])

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSpinner(true)
    let form_data = new FormData();
    form_data.append("variables_data", JSON.stringify(var_dists));
    form_data.append("sample_size_exponent", sample_size_exponent);
    form_data.append("repeated_rows_pct", repeated_rows_pct);
    form_data.append("latex_equation", latex_equation);

    submitData(form_data).then((res) => {
      setCeleryTaskId(res);
    });
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-8 my-auto">
            {showSpinner &&
              <div>
                <div className="spinner-border text-warning" />
                <div className="spinner-border text-secondary" />
                <div className="spinner-border text-success" />
              </div>
            }
          </div>
          <div className="col-md-4 text-end">
            <Button onClick={handleSubmit} type="submit" size="lg" className="my-3">
              Run
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RunComponent;
