import { createSlice } from "@reduxjs/toolkit";
import { categorieStockInitialState } from "./categorie.interface";
import { createCategorieStock } from "./useCase/categorie/createCategorie";
import { getCategories } from "./useCase/categorie/getCategories";


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
    
    [getCategories.pending.type]: (state) => {
      state.loading = true;
    },
    [getCategories.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.categorieStocks = action.payload;
    },
    [getCategories.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
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
