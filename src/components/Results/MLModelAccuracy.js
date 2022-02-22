import { useSelector } from "react-redux";

import { roundNumber } from "../../util/jsUtilityFunctions";

function MLModelAccuracy() {
    const { r2_train_data, r2_test_data } = useSelector(
        (state) => state.varResultsReducer.modelAccuracy
    );
    return (
        <>
            <h4>R<sup>2</sup> (Training Data) = {roundNumber(r2_train_data, 3)}</h4>
            <h4>R<sup>2</sup> (Test Data) = {roundNumber(r2_test_data, 3)}</h4>
        </>
    )
}

export default MLModelAccuracy;