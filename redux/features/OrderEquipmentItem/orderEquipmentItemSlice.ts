import { createSlice } from "@reduxjs/toolkit";
import { OrderEquipmentItemsInitialState } from "./orderEquipmentItem.interface";
import { createOrderEquipmentItem } from "./useCase/createOrderEquipmentItem";
import { deleteOrderEquipmentItem } from "./useCase/deleteOrderEquipmentItem";
import { editOrderEquipmentItem } from "./useCase/editOrderEquipmentItem";
import { getOrderEquipmentItem } from "./useCase/getOrderEquipmentItem";
import { getOrderEquipmentItemListe } from "./useCase/getOrderEquipmentItemListe";
import { updateOrderEquipmentItem } from "./useCase/updateOrderEquipmentItem";

const orderEquipmentItemInitialState: OrderEquipmentItemsInitialState = {
  orderEquipmentItemListe: [],
  orderEquipmentItem: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const orderEquipmentItemSlice = createSlice({
  name: "orderEquipementItem",
  initialState: orderEquipmentItemInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.orderEquipmentItem = {};
    },
  },
  extraReducers: {
    // get orderForm

    [getOrderEquipmentItem.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderEquipmentItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderEquipmentItem = action.payload;
    },
    [getOrderEquipmentItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get orderFormListe
    [getOrderEquipmentItemListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderEquipmentItemListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderEquipmentItemListe = action.payload;
    },
    [getOrderEquipmentItemListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create orderForm
    [createOrderEquipmentItem.pending.type]: (state) => {
      state.loading = true;
    },
    [createOrderEquipmentItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderEquipmentItemListe.push(action.payload);
    },
    [createOrderEquipmentItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update orderForm
    [updateOrderEquipmentItem.pending.type]: (state) => {
      state.loading = true;
    },
    [updateOrderEquipmentItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderEquipmentItem = {};
      state.isEditing = false;
    },
    [updateOrderEquipmentItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete orderForm
    [deleteOrderEquipmentItem.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOrderEquipmentItem.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteOrderEquipmentItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit orderForm
    [editOrderEquipmentItem.pending.type]: (state) => {
      state.loading = true;
    },
    [editOrderEquipmentItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderEquipmentItem = action.payload;
      state.isEditing = true;
    },
    [editOrderEquipmentItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = orderEquipmentItemSlice.actions;
