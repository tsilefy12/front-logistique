import { createSlice } from "@reduxjs/toolkit";
import { InventaireItemInitialState } from "./inventaire.interface";
import { createInventaire } from "./usecase/createInventaire";
import { getInventaire } from "./usecase/getInventaire";
import { getInventaireListe } from "./usecase/getInventaireList";
import { updateInventaire } from "./usecase/updateInventaire";

const InventaireInitialState: InventaireItemInitialState = {
    inventaireList: [],
    inventaire: {},
    isEditing: false,
    loading: false,
    error: null,
};
export const InventaireSlice = createSlice({
  name: "inventaire",
  initialState: InventaireInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.inventaire = {};
    },
  },
  extraReducers: {
    // get Inventaire
    [getInventaire.pending.type]: (state) => {
      state.loading = true;
    },
    [getInventaire.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.inventaire = action.payload;
    },
    [getInventaire.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get InventaireList
    [getInventaireListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getInventaireListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.inventaireList = action.payload;
    },
    [getInventaireListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create Inventaire
    [createInventaire.pending.type]: (state) => {
      state.loading = true;
    },
    [createInventaire.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.inventaireList.push(action.payload);
    },
    [createInventaire.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update inventaire
    [updateInventaire.pending.type]: (state) => {
      state.loading = true;
    },
    [updateInventaire.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.inventaire = {};
      state.isEditing = false;
    },
    [updateInventaire.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = InventaireSlice.actions;
