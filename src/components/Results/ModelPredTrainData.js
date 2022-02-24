import { useSelector } from "react-redux";
import PredictionChart from '../charts/MLPredictionChart';
import { getMinMax2DArr } from "../../util/jsUtilityFunctions";

const ModelPredTrainData = () => {
    const r2_train_data = useSelector(
        (state) => state.varResultsReducer.model.r2.train_data
    );

    const pred_train_data = useSelector(
        (state) => state.varResultsReducer.model.prediction.train_data
    );

    const { minVal, maxVal } = getMinMax2DArr(pred_train_data);

    return (
        <PredictionChart pred_data={pred_train_data} r2_value={r2_train_data} symbol_color={'#5470c6'} minVal={minVal} maxVal={ maxVal}/>
    );


}

export default ModelPredTrainData;