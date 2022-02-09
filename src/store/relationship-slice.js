import { createSlice } from "@reduxjs/toolkit";

const varRelationshipSlice = createSlice({
  name: "var_relationship",
  initialState: {
    latex_equation:
      // "u+\\frac{v}{\\sqrt[3]{w+x}}-\\frac{2}{3}y^4-\\frac{z}{x\\pi}",
      "u^2+uv"
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
