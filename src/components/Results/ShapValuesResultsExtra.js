import { useSelector } from "react-redux";
import ShapResultsChart from './../charts/ShapResultsChart';


const ShapValuesResultsExtra = () => {
    const { features, features_values_test, features_shap_values_test } = useSelector(
        (state) => state.varResultsReducer.shap
    );
    return (
        <ShapResultsChart
            features={features}
            features_values={features_values_test}
            features_shap_values={features_shap_values_test}
        />
    );
}

export default ShapValuesResultsExtra;