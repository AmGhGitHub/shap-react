import { createSlice } from "@reduxjs/toolkit";
import { get_letter } from "../util/jsUtilityFunctions";

const MAX_NUMBER_OF_VARIABLES = 5;
// const letter_ascii = 97; // ascii letter for a
// const get_letter = (id) => String.fromCharCode(id + letter_ascii);

const DEFAULT_NORMAL_PARAMETERS = {
  distribution: "normal",
  null_pct: 5,
  param0: 0,
  param1: 1,
  param2: 0,
};

const DEFAULT_UNIFORM_PARAMETERS = {
  distribution: "uniform",
  null_pct: 5,
  param0: -1,
  param1: 1,
  param2: 0,
};

const DEFAULT_TRIANGULAR_PARAMETERS = {
  distribution: "triangular",
  null_pct: 5,
  param0: -1,
  param1: 0,
  param2: 1,
};

const varDataSlice = createSlice({
  name: "var_dist_spec",
  initialState: {
    sample_size_exponent: 1,
    repeated_rows_pct: 0,
    var_dists: [
      {
        id: 0,
        letter: get_letter(0),
        ...DEFAULT_NORMAL_PARAMETERS,
      },
    ],
  },
  reducers: {
    addVariable: (state) => {
      const { var_dists } = state;
      const current_index = var_dists.length;
      if (current_index <= MAX_NUMBER_OF_VARIABLES)
        var_dists.push({
          id: current_index,
          letter: get_letter(current_index),
          ...DEFAULT_NORMAL_PARAMETERS,
        });
    },
    removeVariable: (state) => {
      const { var_dists } = state;
      if (var_dists.length > 1) {
        var_dists.pop();
      }
    },
    changeSampleSize: (state, action) => {
      const { payload } = action;
      state.sample_size_exponent = parseInt(payload);
    },
    changeRepeatedRows: (state, action) => {
      const { payload } = action;
      state.repeated_rows_pct = parseInt(payload);
    },

    changeVaribaleDistribution: (state, action) => {
      const { var_dists } = state;
      const { index, value } = action.payload;
      if (value === "normal")
        var_dists[index] = {
          id: index,
          letter: get_letter(index),
          ...DEFAULT_NORMAL_PARAMETERS,
        };
      if (value === "uniform")
        var_dists[index] = {
          id: index,
          letter: get_letter(index),
          ...DEFAULT_UNIFORM_PARAMETERS,
        };
      if (value === "triangular")
        var_dists[index] = {
          id: index,
          letter: get_letter(index),
          ...DEFAULT_TRIANGULAR_PARAMETERS,
        };
    },
    changeVaribaleNullPercetage: (state, action) => {
      const { var_dists } = state;
      const { index, value } = action.payload;
      var_dists[index]["null_pct"] = value;
    },

    changeVaribaleDistributionParameter: (state, action) => {
      const { var_dists } = state;
      const { index, param, value } = action.payload;
      var_dists[index][param] = value;
    },
  },
});

export const {
  addVariable,
  removeVariable,
  changeSampleSize,
  changeRepeatedRows,
  changeVaribaleNullPercetage,
  changeVaribaleDistribution,
  changeVaribaleDistributionParameter,
} = varDataSlice.actions;
export default varDataSlice.reducer;
