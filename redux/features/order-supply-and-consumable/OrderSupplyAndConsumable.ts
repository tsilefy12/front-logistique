import { createSlice } from "@reduxjs/toolkit";
import { ConsumableInitialState } from "./OrderSupplyAndConsumable.interface";
import { createConsumable } from "./useCase/createOrderSupplyAndConsumable";
import { deleteConsumable } from "./useCase/deleteOrderSupplyAndConsumable";
import { getConsumable } from "./useCase/getOrderSupplyAndConsumable";
import { getConsumables } from "./useCase/getOrderSupplyAndConsumables";
import { updateConsumable } from "./useCase/updateOrderSupplyAndConsumable";
import { getEmployees } from "./useCase/getEmployees";
import { editConsumable } from "./useCase/editOrderSupplyAndConsumable";
// import { getSuplyAndConsumableList } from "./useCase/getSupplyAndConsumables";

const consumableInitialState: ConsumableInitialState = {
  consumables: [],
  consumable: {},
  employeeList: [],
  // suplyAndConsumableList: [],
  isEditing: false,
  loading: false,
  error: null,
};
export const consumableSlice = createSlice({
  name: "Consumable",
  initialState: consumableInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.consumable = {};
    },
  },
  extraReducers: {
    // get consumable
    [getConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [getConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.consumable = action.payload;
    },
    [getConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get consumable
    [getConsumables.pending.type]: (state) => {
      state.loading = true;
    },
    [getConsumables.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.consumables = action.payload;
    },
    [getConsumables.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create consumable
    [createConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [createConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.consumables.push(action.payload);
    },
    [createConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update consumable
    [updateConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [updateConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.consumable = {};
      state.isEditing = false;
    },
    [updateConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete consumable
    [deleteConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteConsumable.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit consumable
    [editConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [editConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.consumable = action.payload;
      state.isEditing = true;
    },
    [editConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get employees
    [getEmployees.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmployees.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employeeList = action.payload;
    },
    [getEmployees.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get SuplyAndConsumable

    // [getSuplyAndConsumableList.pending.type]: (state) => {
    //   state.loading = true;
    // },
    // [getSuplyAndConsumableList.fulfilled.type]: (state, action) => {
    //   state.loading = false;
    //   state.suplyAndConsumableList = action.payload;
    // },
    // [getSuplyAndConsumableList.rejected.type]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    // },

    //
  },
});

export const { cancelEdit } = consumableSlice.actions;
