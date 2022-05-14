import { useSelector } from "react-redux";
import InputsHistogram from "./Results/HistogramInputs";
import OutputHistogram from "./Results/HistogramOutputs";
import ModelPredTrainData from './Results/ModelPredTrainData';
import ModelPredTestData from './Results/ModelPredTestData';
import ShapFeatureImportancePlot from "./Results/ShapFeatureImportanceResults";
import ShapValuesResults from "./Results/ShapValuesResults";
import ShapValuesResultsExtra from "./Results/ShapValuesResultsExtra";

const ChartResults = () => {
  const { features, features_values_test, features_shap_values_test } = useSelector(
    (state) => state.varResultsReducer.shap
  );
  // const m = Math.floor(features.length / 2) + features.length % 2;
  const m = features.length;
  const vals = new Array(m).fill(0)


  return (
    <section>
      <div className="container border mt-3">
        <h2>Distributions Results</h2>
        <div className="row my-3">
          <div className="col-md-6 text-start">
            <h4 className="text-primary">Input(s) Dist.</h4>
            <InputsHistogram />
          </div>
          <div className="col-md-6 text-start">
            <h4 className="text-primary">Output Dist.</h4>
            <OutputHistogram />
          </div>
        </div>
        <h2>ML & SHAP Results</h2>
        <div className="row my-3">
          <div className="col-md-6 text-start">
            <h4 className="text-primary">ML - Trainind Data</h4>
            <ModelPredTrainData />
          </div>
          <div className="col-md-6 text-start">
            <h4 className="text-primary">ML - Test Data</h4>
            <ModelPredTestData />
          </div>
        </div>
        {/* <div className="row my-3">
          <div className="col-md-6 text-start">
            <h4 className="text-primary">SHAP Analysis</h4>
            <ShapFeatureImportancePlot />
          </div>
          <div className="col-md-6 text-start">
            <h4 className="text-primary"><span style={{ color: 'white' }}>.</span></h4>
            <ShapValuesResults />
          </div>
        </div> */}
        {vals.map((m, i) => {

          return (<div className="row my-3" key={i}>
            <div className="col-md-6 text-start">
              <ShapValuesResultsExtra />
            </div>
            <div className="col-md-6 text-start">
              <ShapValuesResultsExtra />
            </div>
          </div>)
        })
        }
      </div>
    </section>
  );
};

export default ChartResults;
