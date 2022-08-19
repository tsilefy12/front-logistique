import { createSlice } from "@reduxjs/toolkit";
import { ConsumableInitialState } from "./consumable.interface";
import { createConsumable } from "./useCase/createConsumable";
import { deleteConsumable } from "./useCase/deleteConsumable";
import { getConsumable } from "./useCase/getConsumable";
import { getConsumables } from "./useCase/getConsumables";
import { updateConsumable } from "./useCase/updateConsumable";
import { getEmployees } from "./useCase/getEmployees";
import { editConsumable } from "./useCase/editConsumable";
// import { getEmployee } from "./useCase/getEmployee";

const consumableInitialState: ConsumableInitialState = {
  consumables: [],
  consumable: {},
  employeeList: [],
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

    // edit vendor
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

    //
  },
});

export const { cancelEdit } = consumableSlice.actions;
