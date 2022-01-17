import { createSlice } from "@reduxjs/toolkit";

const varRelationshipSlice = createSlice({
  name: "var_relationship",
  initialState: {
    latex_equation:
      "a+\\frac{c}{\\sqrt[3]{d+b}}-\\frac{2}{3}e^4-\\frac{af}{\\pi}",
  },
  reducers: {
    changeEquation: (state, action) => {
      const { payload } = action;
      state.latex_equation = payload;
    },
  },
});

export const { changeEquation } = varRelationshipSlice.actions;
export default varRelationshipSlice.reducer;
