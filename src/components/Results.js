import InputsHistogram from "./Results/HistogramInputs";
import OutputHistogram from "./Results/HistogramOutputs";
import ModelPredTrainData from './Results/ModelPredTrainData';
import ModelPredTestData from './Results/ModelPredTestData';


const ChartResults = () => {
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
      </div>
    </section>
  );
};

export default ChartResults;
