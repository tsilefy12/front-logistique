import { createSlice } from "@reduxjs/toolkit";
import { typeProduitInitialState } from "./typeProduit.interface";
import { createTypeProduit } from "./useCase/typeProduit/createTypeProduit";


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
