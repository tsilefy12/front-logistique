import { createSlice } from "@reduxjs/toolkit";
import { OfferOrderItemInitialState } from "./offerOrderItem.interface";
import { createOfferOrderItem } from "./useCase/createOfferOrderItem";
import { deleteOfferOrderItem } from "./useCase/deleteOfferOrderItem";
import { editOfferOrderItem } from "./useCase/editOfferOrderItem";
import { getOfferOrderItem } from "./useCase/getOfferOrderItem";
import { getOfferOrderItemListe } from "./useCase/getOfferOrderItemListe";
import { updateOfferOrderItem } from "./useCase/updateOfferOrderItem";

const offerOrderItemInitialState: OfferOrderItemInitialState = {
  offerOrderItemListe: [],
  offerOrderItem: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const offerOrderItemSlice = createSlice({
  name: "offerOrderItem",
  initialState: offerOrderItemInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.offerOrderItem = {};
    },
  },
  extraReducers: {
    // get OfferOrderItem

    [getOfferOrderItem.pending.type]: (state) => {
      state.loading = true;
    },
    [getOfferOrderItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrderItem = action.payload;
    },
    [getOfferOrderItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get OfferOrderItem
    [getOfferOrderItemListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getOfferOrderItemListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrderItemListe = action.payload;
    },
    [getOfferOrderItemListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create OfferOrderItem
    [createOfferOrderItem.pending.type]: (state) => {
      state.loading = true;
    },
    [createOfferOrderItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrderItemListe.push(action.payload);
    },
    [createOfferOrderItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update OfferOrderItem
    [updateOfferOrderItem.pending.type]: (state) => {
      state.loading = true;
    },
    [updateOfferOrderItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrderItem = {};
      state.isEditing = false;
    },
    [updateOfferOrderItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete OfferOrderItem
    [deleteOfferOrderItem.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOfferOrderItem.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteOfferOrderItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit OfferOrderItem
    [editOfferOrderItem.pending.type]: (state) => {
      state.loading = true;
    },
    [editOfferOrderItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.offerOrderItem = action.payload;
      state.isEditing = true;
    },
    [editOfferOrderItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = offerOrderItemSlice.actions;
