import { useSelector } from "react-redux";
import PredictionChart from '../charts/MLPredictionChart';
import { getMinMax2DArr } from "../../util/jsUtilityFunctions";

const color_palate = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']


const ModelPredTestData = () => {
    const r2_test_data = useSelector(
        (state) => state.varResultsReducer.model.r2.test_data
    );

    const pred_test_data = useSelector(
        (state) => state.varResultsReducer.model.prediction.test_data
    );

    const { minVal, maxVal } = getMinMax2DArr(pred_test_data);

    return (
        <PredictionChart pred_data={pred_test_data} r2_value={r2_test_data} symbol_color={'#fac858'} minVal={minVal} maxVal={maxVal} />
    );
}

export default ModelPredTestData;