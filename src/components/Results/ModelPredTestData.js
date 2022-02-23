import { useSelector } from "react-redux";
import PredictionChart from '../charts/MLPredictionChart';

const color_palate = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']


const ModelPredTestData = () => {
    const { test_data: r2_test_data } = useSelector(
        (state) => state.varResultsReducer.modelR2
    );

    const { test_data: pred_test_data } = useSelector(
        (state) => state.varResultsReducer.modelPrediction
    );


    return (
        <>
            <PredictionChart pred_data={pred_test_data} r2_value={r2_test_data} symbol_color={'#fac858'} />
        </>
    );


}

export default ModelPredTestData;