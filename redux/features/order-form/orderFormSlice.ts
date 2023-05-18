import { createSlice } from "@reduxjs/toolkit";
import { OrderFormInitialState } from "./orderForm.interface";
import { createOrderForm } from "./useCase/createOrderForm";
import { deleteOrderForm } from "./useCase/deleteOrderForm";
import { editOrderForm } from "./useCase/editOrderForm";
import { getOrderForm } from "./useCase/getOrderForm";
import { getOrderFormListe } from "./useCase/getOrderFormListe";
import { updateOrderForm } from "./useCase/updateOrderForm";

const orderFormInitialState: OrderFormInitialState = {
  orderFormListe: [],
  orderForm: {},
  vendors: [],
  isEditing: false,
  loading: false,
  error: null,
};
export const orderFormSlice = createSlice({
  name: "orderForm",
  initialState: orderFormInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.orderForm = {};
    },
  },
  extraReducers: {
    // get orderForm

    [getOrderForm.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderForm.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderForm = action.payload;
    },
    [getOrderForm.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get orderFormListe
    [getOrderFormListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderFormListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderFormListe = action.payload;
    },
    [getOrderFormListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create orderForm
    [createOrderForm.pending.type]: (state) => {
      state.loading = true;
    },
    [createOrderForm.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderFormListe.push(action.payload);
    },
    [createOrderForm.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update orderForm
    [updateOrderForm.pending.type]: (state) => {
      state.loading = true;
    },
    [updateOrderForm.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderForm = {};
      state.isEditing = false;
    },
    [updateOrderForm.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete orderForm
    [deleteOrderForm.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOrderForm.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteOrderForm.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit orderForm
    [editOrderForm.pending.type]: (state) => {
      state.loading = true;
    },
    [editOrderForm.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.orderForm = action.payload;
      state.isEditing = true;
    },
    [editOrderForm.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = orderFormSlice.actions;
