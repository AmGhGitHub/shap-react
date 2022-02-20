import { createSlice } from "@reduxjs/toolkit";

const resultsMlSlice = createSlice({
  name: "res",
  initialState: {
    trainingModelScore: 0.0,
    testModelScore: 0.0,
  },
  reducers: {
    updateTrainingModelScore: (state, action) => {
      const { payload } = action;
      state.trainingModelScore = payload;
    },
    updateTestModelScore: (state, action) => {
      const { payload } = action;
      state.testModelScore = payload;
    },
  },
});

export const { updateTrainingModelScore, updateTestModelScore } =
  resultsMlSlice.actions;
export default resultsMlSlice.reducer;
