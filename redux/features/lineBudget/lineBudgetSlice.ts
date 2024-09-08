import { createSlice } from "@reduxjs/toolkit";
import { LineBudgetInitialState } from "./lineBudget.interface";
import { getLineBudget } from "./useCase/getLineBudget";

const lineBudgetInitialState: LineBudgetInitialState = {
  lineBudgetList: [],
  lineBudget: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const lineBudgetSlice = createSlice({
  name: "lineBudget",
  initialState: lineBudgetInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.lineBudget = {};
    },
  },
  extraReducers: {
    // get ligne de budget
    [getLineBudget.pending.type]: (state) => {
      state.loading = true;
    },
    [getLineBudget.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.lineBudgetList = action.payload;
    },
    [getLineBudget.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = lineBudgetSlice.actions;
