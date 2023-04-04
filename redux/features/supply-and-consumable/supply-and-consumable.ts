import { createSlice } from "@reduxjs/toolkit";
import { SuplyAndConsumableInitialState } from "./supply-and-consumable.interface";
import { createSuplyAndConsumable } from "./useCase/createSupplyAndConsumable";
import { deleteSuplyAndConsumable } from "./useCase/deleteSupplyAndConsumable";
import { editSuplyAndConsumable } from "./useCase/editOrderSupplyAndConsumable";
import { getSuplyAndConsumable } from "./useCase/getSupplyAndConsumable";
import { getSuplyAndConsumableList } from "./useCase/getSupplyAndConsumables";
import { updateSuplyAndConsumable } from "./useCase/updateSupplyAndConsumable";

const suplyAndConsumableInitialState: SuplyAndConsumableInitialState = {
  suplyAndConsumableList: [],
  suplyAndConsumable: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const suplyAndConsumableSlice = createSlice({
  name: "suplyAndConsumble",
  initialState: suplyAndConsumableInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.suplyAndConsumable = {};
    },
  },
  extraReducers: {
    // get suplyAndConsumable
    [getSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [getSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.suplyAndConsumable = action.payload;
    },
    [getSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get suplyAndConsumableList
    [getSuplyAndConsumableList.pending.type]: (state) => {
      state.loading = true;
    },
    [getSuplyAndConsumableList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.suplyAndConsumableList = action.payload;
    },
    [getSuplyAndConsumableList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create suplyAndConsumable
    [createSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [createSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.suplyAndConsumableList.push(action.payload);
    },
    [createSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update suplyAndConsumable
    [updateSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [updateSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.suplyAndConsumable = {};
      state.isEditing = false;
    },
    [updateSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete suplyAndConsumable
    [deleteSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteSuplyAndConsumable.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edite suplyAndConsumable
    [editSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [editSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.suplyAndConsumable = action.payload;
      state.isEditing = true;
    },
    [editSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = suplyAndConsumableSlice.actions;
