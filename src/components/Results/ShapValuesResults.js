import { useSelector } from "react-redux";
import ShapValuesChart from "../charts/ShapValuesChart";


const ShapValuesResults = () => {
    const { features, sample_values } = useSelector(
        (state) => state.varResultsReducer.shap
    );



    return (
        <ShapValuesChart features={features} values={sample_values} />
    );
}

export default ShapValuesResults;