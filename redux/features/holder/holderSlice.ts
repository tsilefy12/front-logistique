import { createSlice } from "@reduxjs/toolkit";
import { HolderInitialState } from "./holder.interface";
import { createHolder } from "./useCase/createHolder";
import { deleteHolder } from "./useCase/deleteHolder";
import { editHolder } from "./useCase/editHolder";
import { getHolder } from "./useCase/getHolder";
import { getHolderListe } from "./useCase/getHolderListe";
import { updateHolder } from "./useCase/updateHolder";

const holderInitialState: HolderInitialState = {
  holderListe: [],
  holder: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const holderSlice = createSlice({
  name: "holder",
  initialState: holderInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.holder = {};
    },
  },
  extraReducers: {
    // get holder
    [getHolder.pending.type]: (state) => {
      state.loading = true;
    },
    [getHolder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.holder = action.payload;
    },
    [getHolder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get holderListe
    [getHolderListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getHolderListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.holderListe = action.payload;
    },
    [getHolderListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create holder
    [createHolder.pending.type]: (state) => {
      state.loading = true;
    },
    [createHolder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.holderListe.push(action.payload);
    },
    [createHolder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update holder
    [updateHolder.pending.type]: (state) => {
      state.loading = true;
    },
    [updateHolder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.holder = {};
      state.isEditing = false;
    },
    [updateHolder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete holder
    [deleteHolder.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteHolder.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteHolder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit holder
    [editHolder.pending.type]: (state) => {
      state.loading = true;
    },
    [editHolder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.holder = action.payload;
      state.isEditing = true;
    },
    [editHolder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = holderSlice.actions;
