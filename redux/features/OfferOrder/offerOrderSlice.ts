import { createSlice } from "@reduxjs/toolkit";
import { OfferOrderInitialState } from "./offerOrder.interface";
import { createOfferOrder } from "./useCase/createOfferOrder";
import { deleteOfferOrder } from "./useCase/deleteOfferOrder";
import { editOfferOrder } from "./useCase/editOfferOrder";
import { getOfferOrder } from "./useCase/getOfferOrder";
import { getOfferOrderListe } from "./useCase/getOfferOrderListe";
import { updateOfferOrder } from "./useCase/updateOfferOrder";

const offerOrderInitialState: OfferOrderInitialState = {
  offerOrderListe: [],
  offerOrder: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const offerOrderSlice = createSlice({
  name: "offerOrder",
  initialState: offerOrderInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.offerOrder = {};
    },
  },
  extraReducers: {
    // get OfferOrder

    [getOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [getOfferOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrder = action.payload;
    },
    [getOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get OfferOrder
    [getOfferOrderListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getOfferOrderListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrderListe = action.payload;
    },
    [getOfferOrderListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create OfferOrder
    [createOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [createOfferOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrderListe.push(action.payload);
    },
    [createOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update OfferOrder
    [updateOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [updateOfferOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrder = {};
      state.isEditing = false;
    },
    [updateOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete OfferOrder
    [deleteOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOfferOrder.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit OfferOrder
    [editOfferOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [editOfferOrder.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrder = action.payload;
      state.isEditing = true;
    },
    [editOfferOrder.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = offerOrderSlice.actions;
