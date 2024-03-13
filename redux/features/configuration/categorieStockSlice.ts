import { createSlice } from "@reduxjs/toolkit";
import { categorieStockInitialState } from "./categorie.interface";
import { createCategorieStock } from "./useCase/categorie/createCategorie";


const categorieInitialState: categorieStockInitialState = {
  categorieStocks: [],
  categorieStock: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const categorieStockSlice = createSlice({
  name: "categorieStock",
  initialState: categorieInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.categorieStock = {};
    },
  },
  extraReducers: {
    // get categorieStock
    
    // create categorieStock
    [createCategorieStock.pending.type]: (state) => {
      state.loading = true;
    },
    [createCategorieStock.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.categorieStocks.push(action.payload);
    },
    [createCategorieStock.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
  },
});

export const { cancelEdit } = categorieStockSlice.actions;
