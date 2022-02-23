import { useSelector } from "react-redux";
import ShapFeatureImportancePlot from "../charts/ShapFeatureImportanceChart";

const ShapResults = () => {
    const { features, feature_importance } = useSelector(
        (state) => state.varResultsReducer.shap
    );

    return (
        <ShapFeatureImportancePlot features={features} feature_importance_values={feature_importance} />
    );
}

export default ShapResults;