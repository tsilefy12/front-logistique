import { createSlice } from "@reduxjs/toolkit";
import { createFournisseur } from "./useCase/createFournisseur";
import { deleteFournisseur } from "./useCase/deleteFournisseur";
import { editFournisseur } from "./useCase/editFournisseur";
import { getFournisseur } from "./useCase/getFournisseur";
import { getFournisseurList } from "./useCase/getFournisseurListe";
import { updateFournisseur } from "./useCase/updateFournisseur";
import { FournisseurInitialState } from "./fournisseurSlice.interface";

const initialState: FournisseurInitialState = {
  fournisseurList: [],
  fournisseur: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const fournisseurSlice = createSlice({
  name: "fournisseur",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.fournisseur = {};
    },
  },
  extraReducers: {
    [getFournisseur.pending.type]: (state) => {
      state.loading = true;
    },
    [getFournisseur.fulfilled.type]: (state, action) => {
      state.fournisseur = action.payload;
      state.loading = false;
    },
    [getFournisseur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [getFournisseurList.pending.type]: (state) => {
      state.loading = true;
    },
    [getFournisseurList.fulfilled.type]: (state, action) => {
      state.fournisseurList = action.payload;
      state.loading = false;
    },
    [getFournisseurList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [createFournisseur.pending.type]: (state) => {
      state.loading = true;
    },
    [createFournisseur.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createFournisseur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateFournisseur.pending.type]: (state) => {
      state.loading = true;
    },
    [updateFournisseur.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.fournisseur = {};
    },
    [updateFournisseur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deleteFournisseur.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteFournisseur.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteFournisseur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editFournisseur.pending.type]: (state) => {
      state.loading = true;
    },
    [editFournisseur.fulfilled.type]: (state, action) => {
      state.fournisseur = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editFournisseur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = fournisseurSlice.actions;
