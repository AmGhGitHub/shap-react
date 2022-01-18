import VarQuantity from "./VarQuantity";
import VarDistTable from "./VarDistTable";
import VarDistParameters from "./VarDistParameters";

const VarsSpecs = () => {
  return (
    <section>
      <div className="container border mt-4">
        <h2>Variables Specs</h2>
        <VarQuantity />
        <div className="row mt-3">
          <div className="col-md-6">
            <VarDistTable />
          </div>
          <div className="col-md-6">
            <VarDistParameters />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VarsSpecs;
