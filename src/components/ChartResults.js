import React from "react";
import InputsHistogram from "./InputsHistogram";
import OutputHistogram from "./OutputHistogram";

const ChartResults = () => {
  return (
    <section>
      <div className="container border mt-3">
        <h2>Results</h2>
        <div className="row my-3">
          <div className="col-md-6 text-start">
            <h4 className="text-primary">Input(s) Dist.</h4>
            <InputsHistogram />
          </div>
          <div className="col-md-6 text-start">
            <h4 className="text-danger">Output Dist.</h4>
            <OutputHistogram />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartResults;
