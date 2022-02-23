import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
  name: "res",
  initialState: {
    // for input values a list is required to handle multiple values
    inputsHistogramData: [{ bin_size: [], bin_centers: [] }],
    outputHistogramData: [{ bin_size: [], bin_centers: [] }],
    modelR2: { train_data: 0.0, test_data: 0.0 },
    modelPrediction: { train_data: [], test_data: [] },
    shap: { features: [], values: [], feature_importance: [] }
  },
  reducers: {
    updateInputsHistogramData: (state, action) => {
      const { payload } = action;
      state.inputsHistogramData = payload;
    },
    updateOutputHistogramData: (state, action) => {
      const { payload } = action;
      state.outputHistogramData = payload;
    },
    updateModelR2: (state, action) => {
      const { r2_train_data, r2_test_data } = action.payload;
      state.modelR2.train_data = r2_train_data;
      state.modelR2.test_data = r2_test_data;
    },

    updateModelPrediction: (state, action) => {
      const { pred_train_data, pred_test_data } = action.payload;
      state.modelPrediction.train_data = JSON.parse(pred_train_data);
      state.modelPrediction.test_data = JSON.parse(pred_test_data);
    },

    updateModelShapValues: (state, action) => {
      const { payload } = action;
      state.shap.values = JSON.parse(payload);
    },

    updateModelShapFeatureImportance: (state, action) => {
      const { data } = JSON.parse(action.payload);
      state.shap.feature_importance = data;
    },
  },
});

export const { updateInputsHistogramData,
  updateOutputHistogramData,
  updateModelR2, updateModelPrediction, updateModelShapValues, updateModelShapFeatureImportance } =
  resultsSlice.actions;
export default resultsSlice.reducer;
