import { createSlice } from "@reduxjs/toolkit";
import { UniteStockInitialState } from "./uniteStock.interface";
import { createUniteStock } from "./useCase/uniteStock/createUniteStock";
import { getUniteStocks } from "./useCase/uniteStock/getUniteStock";


const uniteStockInitialState: UniteStockInitialState = {
  uniteStocks: [],
  uniteStock: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const UniteStockSLice = createSlice({
  name: "uniteStock",
  initialState: uniteStockInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.uniteStock = {};
    },
  },
  extraReducers: {
    // get uniteStock
    [getUniteStocks.pending.type]: (state) => {
      state.loading = true;
    },
    [getUniteStocks.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.uniteStocks = action.payload;
    },
    [getUniteStocks.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
    // create uniteStock
    [createUniteStock.pending.type]: (state) => {
      state.loading = true;
    },
    [createUniteStock.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.uniteStocks.push(action.payload);
    },
    [createUniteStock.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
  },
});

export const { cancelEdit } = UniteStockSLice.actions;
