import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
  name: "res",
  initialState: {
    histogram: {
      inputs: [{ bin_size: [], bin_centers: [] }],
      output: [{ bin_size: [], bin_centers: [] }]
    },
    model: {
      r2: { train_data: null, test_data: null },
      prediction: { train_data: [], test_data: [] }
    },
    shap: {
      features: [], sample_values: [], feature_importance: [],
      features_values_test: [], features_shap_values_test: []
    }
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

    updateHistogramData: (state, action) => {
      const { hist_inputs, hist_output } = action.payload;
      state.histogram.inputs = hist_inputs;
      state.histogram.output = hist_output;
    },

    updateModel: (state, action) => {
      const { r2, prediction } = action.payload;
      state.model.r2.train_data = r2.train_data;
      state.model.r2.test_data = r2.test_data;
      state.model.prediction.train_data = prediction.train_data;
      state.model.prediction.test_data = prediction.test_data;
    },


    updateShap: (state, action) => {
      const { features, sample_values, feature_importance, features_values_test, features_shap_values_test } = action.payload;
      state.shap.features = features;
      state.shap.sample_values = sample_values;
      state.shap.feature_importance = feature_importance;
      state.shap.features_values_test = features_values_test;
      state.shap.features_shap_values_test = features_shap_values_test;
      // console.log(state.shap)
    },
  },
});

export const { updateHistogramData, updateInputsHistogramData,
  updateOutputHistogramData,
  updateModel, updateShap } =
  resultsSlice.actions;
export default resultsSlice.reducer;
