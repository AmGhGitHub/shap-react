import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
  name: "res",
  initialState: {
    inputsHistogramData: [{ bin_size: [], bin_centers: [] }],
    outputHistogramData: [{ bin_size: [], bin_centers: [] }],
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
  },
});

export const { updateInputsHistogramData, updateOutputHistogramData } =
  resultsSlice.actions;
export default resultsSlice.reducer;
