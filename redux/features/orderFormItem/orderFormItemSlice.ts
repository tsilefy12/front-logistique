import { createSlice } from "@reduxjs/toolkit";
import { OrderFormItemInitialState } from "./orderFormItem.interface";
import { createOrderFormItem } from "./useCase/createOrderFormItem";
import { deleteOrderFormItem } from "./useCase/deleteOrderFormItem";
import { editOrderFormItem } from "./useCase/editOrderFormItem";
import { getOrderFormItem } from "./useCase/getOrderFormItem";
import { getOrderFormItemListe } from "./useCase/getOrderFormItemListe";
import { updateOrderFormItem } from "./useCase/updateOrderFormItem";

const orderFormItemInitialState: OrderFormItemInitialState = {
  orderFormItemListe: [],
  orderFormItem: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const orderFormItemSlice = createSlice({
  name: "orderFormItem",
  initialState: orderFormItemInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.orderFormItem = {};
    },
  },
  extraReducers: {
    // get orderForm

    [getOrderFormItem.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderFormItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderFormItem = action.payload;
    },
    [getOrderFormItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get orderFormListe
    [getOrderFormItemListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderFormItemListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderFormItemListe = action.payload;
    },
    [getOrderFormItemListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create orderForm
    [createOrderFormItem.pending.type]: (state) => {
      state.loading = true;
    },
    [createOrderFormItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderFormItemListe.push(action.payload);
    },
    [createOrderFormItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update orderForm
    [updateOrderFormItem.pending.type]: (state) => {
      state.loading = true;
    },
    [updateOrderFormItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderFormItem = {};
      state.isEditing = false;
    },
    [updateOrderFormItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete orderForm
    [deleteOrderFormItem.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOrderFormItem.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteOrderFormItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit orderForm
    [editOrderFormItem.pending.type]: (state) => {
      state.loading = true;
    },
    [editOrderFormItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderFormItem = action.payload;
      state.isEditing = true;
    },
    [editOrderFormItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = orderFormItemSlice.actions;
