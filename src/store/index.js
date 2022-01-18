import { configureStore } from "@reduxjs/toolkit";
import varDataSlice from "./vars-slice";
import varRelationshipSlice from "./relationship-slice";
import resultsSlice from "./results-slice";

export default configureStore({
  reducer: {
    varDataReducer: varDataSlice,
    varRelationReducer: varRelationshipSlice,
    varResultsReducer: resultsSlice,
  },
});
