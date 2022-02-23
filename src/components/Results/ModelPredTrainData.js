import { useSelector } from "react-redux";
import PredictionChart from '../charts/MLPredictionChart';


const ModelPredTrainData = () => {
    const r2_train_data = useSelector(
        (state) => state.varResultsReducer.model.r2.train_data
    );

    const pred_train_data = useSelector(
        (state) => state.varResultsReducer.model.prediction.train_data
    );

    return (
        <PredictionChart pred_data={pred_train_data} r2_value={r2_train_data} symbol_color={'#5470c6'} />
    );


}

export default ModelPredTrainData;