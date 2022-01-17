import { configureStore } from "@reduxjs/toolkit";
import varDataSlice from "./vars-slice";
import varRelationshipSlice from "./relationship-slice";

export default configureStore({
  reducer: {
    varDataReducer: varDataSlice,
    varRelationReducer: varRelationshipSlice,
  },
});
