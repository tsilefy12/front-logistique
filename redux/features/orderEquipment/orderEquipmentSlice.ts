import { createSlice } from "@reduxjs/toolkit";
import { createOrderEquipment } from "./useCase/createOrderEquipment";
import { deleteOrderEquipment } from "./useCase/deleteOrderEquipment";
import { editOrderEquipment } from "./useCase/editOrderEquipment";
import { getOrderEquipment } from "./useCase/getOrderEquipment";
import { getOrderEquipmentList } from "./useCase/getOrderEquipmentListe";
import { updateOrderEquipment } from "./useCase/updateOrderEquipment";
import { OrderEquipmentInitialState } from "./orderEquipmentSlice.interface";
import { getEmployees } from "./useCase/getEmployees";

const initialState: OrderEquipmentInitialState = {
  orderEquipmentList: [],
  orderEquipment: {},
  employeList: [],
  isEditing: false,
  loading: false,
  error: null,
};

export const orderEquipmentSlice = createSlice({
  name: "orderEquipment",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.orderEquipment = {};
    },
  },
  extraReducers: {
    [getOrderEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderEquipment.fulfilled.type]: (state, action) => {
      state.orderEquipment = action.payload;
      state.loading = false;
    },
    [getOrderEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [getOrderEquipmentList.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderEquipmentList.fulfilled.type]: (state, action) => {
      state.orderEquipmentList = action.payload;
      state.loading = false;
    },
    [getOrderEquipmentList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [createOrderEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [createOrderEquipment.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createOrderEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateOrderEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [updateOrderEquipment.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.orderEquipment = {};
    },
    [updateOrderEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deleteOrderEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOrderEquipment.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteOrderEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editOrderEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [editOrderEquipment.fulfilled.type]: (state, action) => {
      state.orderEquipment = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editOrderEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    // get employees
    [getEmployees.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmployees.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employeList = action.payload;
    },
    [getEmployees.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = orderEquipmentSlice.actions;
