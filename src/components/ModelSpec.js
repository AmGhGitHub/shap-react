import { useSelector, useDispatch } from "react-redux";
import { changeSampleSize, changeRepeatedRows } from "../store/vars-slice";
import numberFormatter from "../util/formatNumber";

const ModelSpec = () => {
  const dispatch = useDispatch();
  const { sample_size_exponent, repeated_rows_pct } = useSelector(
    (state) => state.varDataReducer
  );

  const handleChangeSampleSize = (e) => {
    dispatch(changeSampleSize(e.target.value));
  };

  const handleChangeRepeatedRows = (e) => {
    dispatch(changeRepeatedRows(e.target.value));
  };
  return (
    <section className="mt-4">
      <div className="container border">
        <h2 className="mb-4">Model Sepcs</h2>
        <div className="row my-3">
          <div className="col-md-6">
            <h5 className="text-primary">Sample Size</h5>
            <div className="row">
              <div className="col-sm-10">
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-100"
                  value={sample_size_exponent}
                  onChange={handleChangeSampleSize}
                />
              </div>
              <div className="col-sm-2">
                <h5>
                  {numberFormatter(
                    Math.pow(10, parseInt(sample_size_exponent))
                  )}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="text-primary">Repeated Samples (%)</h5>
            <div className="row">
              <div className="col-sm-10">
                <input
                  type="range"
                  min="0"
                  max="20"
                  className="w-100"
                  value={repeated_rows_pct}
                  onChange={handleChangeRepeatedRows}
                />
              </div>
              <div className="col-sm-2">
                <h5>{repeated_rows_pct}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelSpec;
