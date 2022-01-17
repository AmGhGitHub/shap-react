import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_NORMAL_PARAMETERS = {
  distribution: "normal",
  null_pct: 5,
  param0: 0,
  param1: 1,
  param2: 0,
};

const uiSlice = createSlice({
  name: "var_dist_spec", // Generated action type constants will use this as a prefix.
  initialState: [
    {
      id: 0,
      ...DEFAULT_NORMAL_PARAMETERS,
    },
  ],
  reducers: {
    addVariable: (state) => {
      const current_index = state.length;
      state.push({ id: current_index, ...DEFAULT_NORMAL_PARAMETERS });
    },
    removeVariable: (state) => {
      //redux toolkit uses immer on the background so it is ok to write mutable code.
      if (state.length > 1) {
        state.pop();
      }
    },
      changeDistribution: (state, action) => {
          const { payload } = action;
          
    },
  },
});

export const { addVariable, removeVariable } = uiSlice.actions;
export default uiSlice.reducer;
