import React from "react";
import VarsHistogram from "./VarsHistogram";

const ChartResults = () => {
  return (
    <section>
      <div className="container border mt-3">
        <h2>Results</h2>
        <div className="row my-3">
          <div className="col-md-6">
            <VarsHistogram />
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </section>
  );
};

export default ChartResults;
