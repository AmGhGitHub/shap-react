import { useSelector } from "react-redux";
import PredictionChart from './../charts/PredictionChart';


const ModelPredTrainData = () => {
    const { train_data: r2_train_data } = useSelector(
        (state) => state.varResultsReducer.modelR2
    );

    const { train_data: pred_train_data } = useSelector(
        (state) => state.varResultsReducer.modelPrediction
    );


    return (
        <>
            <PredictionChart pred_data={pred_train_data} r2_value={r2_train_data} symbol_color={'#5470c6'} />
        </>
    );


}

export default ModelPredTrainData;