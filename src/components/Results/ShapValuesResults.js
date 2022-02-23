import { useSelector } from "react-redux";
import ShapValuesChart from "../charts/ShapValuesChart";
import { get_letter } from "../../util/jsUtilityFunctions";

const getParams = (arr) => {
    const numCols = arr[0].length;
    const features = new Array(numCols).fill(null).map((_, colIndex) => get_letter(colIndex));

    const transArr = []
    for (let i = 0; i < numCols; i++) {
        const output = arr[i].map((_, colIndex) => arr.map(row => row[colIndex]));
        transArr.push(output)
    }

    return { features, shap_values_trans: transArr };
}


const ShapValuesResults = () => {
    // const shap_values = useSelector(
    //     (state) => state.varResultsReducer.shap.values
    // );
    // const { features, shap_values_trans } = getParams(shap_values);

    return (
        // <ShapValuesChart features={features} values={shap_values_trans} />
        <></>
    );
}

export default ShapValuesResults;