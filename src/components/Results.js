import React from "react";
import InputsHistogram from "./Results/InputsHistogram";
import OutputHistogram from "./Results/OutputHistogram";
import MLModelAccuracy from "./Results/MLModelAccuracy";

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
            <h4 className="text-primary">Model Accuracy</h4>
            <MLModelAccuracy />
          </div>
          <div className="col-md-6 text-start">
            <h4 className="text-primary">SHAP Impact Factors</h4>
            {/* <OutputHistogram /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartResults;
