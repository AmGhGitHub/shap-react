import { useSelector } from "react-redux";
import ShapFeatureImportancePlot from "../charts/ShapFeatureImportanceChart";

const getFeatureImportanceParams = (arr) => {
    const names = [].concat(...arr.map(x => x[0]));
    const values = [].concat(...arr.map(x => x[1]));
    return { features: names, feature_importance_values: values }
}


const ShapResults = () => {
    const feature_importance = useSelector(
        (state) => state.varResultsReducer.shap.feature_importance
    );

    const { features, feature_importance_values } = getFeatureImportanceParams(feature_importance);

    return (
        <ShapFeatureImportancePlot features={features} feature_importance_values={feature_importance_values} />
    );


}

export default ShapResults;