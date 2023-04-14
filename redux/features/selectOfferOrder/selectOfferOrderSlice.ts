import { createSlice } from "@reduxjs/toolkit";
import { SelectOfferOrderInitialState } from "./selectOfferOrder.interface";
import { createSelectOfferOrder } from "./useCase/createSelectOfferOrder";
import { deleteSelectOfferOrder } from "./useCase/deleteSelectOfferOrder";
import { editSelectOfferOrder } from "./useCase/editSelectOfferOrder";
import { getSelectOfferOrder } from "./useCase/getSelectOfferOrder";
import { getSelectOfferOrderListe } from "./useCase/getSelectOfferOrderListe";
import { updateSelectOfferOrder } from "./useCase/updateSelectOfferOrder";

const selectOfferOrderInitialState: SelectOfferOrderInitialState = {
  selectOfferOrderListe: [],
  selectOfferOrder: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const selectOfferOrderSlice = createSlice({
  name: "selectOfferOrder",
  initialState: selectOfferOrderInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.selectOfferOrder = {};
    },
  },
  extraReducers: {
    // get selectOfferOrder

    [getSelectOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [getSelectOfferOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.selectOfferOrder = action.payload;
    },
    [getSelectOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get selectOfferOrder
    [getSelectOfferOrderListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getSelectOfferOrderListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.selectOfferOrderListe = action.payload;
    },
    [getSelectOfferOrderListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create selectOfferOrder
    [createSelectOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [createSelectOfferOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.selectOfferOrderListe.push(action.payload);
    },
    [createSelectOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update selectOfferOrder
    [updateSelectOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [updateSelectOfferOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.selectOfferOrder = {};
      state.isEditing = false;
    },
    [updateSelectOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete selectOfferOrder
    [deleteSelectOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteSelectOfferOrder.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteSelectOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit selectOfferOrder
    [editSelectOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [editSelectOfferOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.selectOfferOrder = action.payload;
      state.isEditing = true;
    },
    [editSelectOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = selectOfferOrderSlice.actions;
