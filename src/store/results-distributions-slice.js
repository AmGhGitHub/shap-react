import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
  name: "res",
  initialState: {
    inputsHistogramData: [{ bin_size: [], bin_centers: [] }],
    outputHistogramData: [{ bin_size: [], bin_centers: [] }],
    modelAccuracy: { r2_train_data: 0.0, r2_test_data: 0.0 }
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
    updateR2Data: (state, action) => {
      const { payload } = action;
      state.modelAccuracy.r2_train_data = payload["r2_train_data"];
      state.modelAccuracy.r2_test_data = payload["r2_test_data"];
    },
  },
});

export const { updateInputsHistogramData, updateOutputHistogramData, updateR2Data } =
  resultsSlice.actions;
export default resultsSlice.reducer;
