import { useSelector } from "react-redux";
import ShapValuesChart from "../charts/ShapValuesChart";


const ShapResults = () => {
    const feature_importance = useSelector(
        (state) => state.varResultsReducer.shap.feature_importance
    );
    // console.log("shap_values: ", shap_values)


    return (
        <>
            <ShapValuesChart feature_importance={feature_importance} />
        </>
    );


}

export default ShapResults;