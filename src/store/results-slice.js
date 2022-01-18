import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
  name: "res",
  initialState: {
    variablesHistogramData: [{ bin_size: [], bin_centers: [] }],
  },
  reducers: {
    updateVariablesHistogramData: (state, action) => {
      const { payload } = action;
      state.variablesHistogramData = payload;
    },
  },
});

export const { updateVariablesHistogramData } = resultsSlice.actions;
export default resultsSlice.reducer;
