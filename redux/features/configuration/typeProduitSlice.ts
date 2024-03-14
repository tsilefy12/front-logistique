import { createSlice } from "@reduxjs/toolkit";
import { typeProduitInitialState } from "./typeProduit.interface";
import { createTypeProduit } from "./useCase/typeProduit/createTypeProduit";
import { getTypeProduits } from "./useCase/typeProduit/getTypeProduits";


const typeProduitInitialState: typeProduitInitialState = {
  typeProduits: [],
  typeProduit: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const typeProduitSlice = createSlice({
  name: "typeProduit",
  initialState: typeProduitInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.typeProduit = {};
    },
  },
  extraReducers: {
    // get TypeProduit
    [getTypeProduits.pending.type]: (state) => {
      state.loading = true;
    },
    [getTypeProduits.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.typeProduits = action.payload;
    },
    [getTypeProduits.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
    // create TypeProduit
    [createTypeProduit.pending.type]: (state) => {
      state.loading = true;
    },
    [createTypeProduit.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.typeProduits.push(action.payload);
    },
    [createTypeProduit.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
  },
});

export const { cancelEdit } = typeProduitSlice.actions;
