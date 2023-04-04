import { createSlice } from "@reduxjs/toolkit";
import { LogSuplyAndConsumableInitialState } from "./log-supply-and-consumable.interface";
import { createLogSuplyAndConsumable } from "./useCase/createLogSupplyAndConsumable";
import { getLogSuplyAndConsumable } from "./useCase/getLogSupplyAndConsumable";
import { getLogSuplyAndConsumableList } from "./useCase/getLogSupplyAndConsumables";
import { updateLogSuplyAndConsumable } from "./useCase/updateSupplyAndConsumable";

const logsuplyAndConsumableInitialState: LogSuplyAndConsumableInitialState = {
  logsuplyAndConsumableList: [],
  logsuplyAndConsumable: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const logsuplyAndConsumableSlice = createSlice({
  name: "logSuplyAndConsumble",
  initialState: logsuplyAndConsumableInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.suplyAndConsumable = {};
    },
  },
  extraReducers: {
    // get logsuplyAndConsumable
    [getLogSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [getLogSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.logsuplyAndConsumable = action.payload;
    },
    [getLogSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get logsuplyAndConsumableList
    [getLogSuplyAndConsumableList.pending.type]: (state) => {
      state.loading = true;
    },
    [getLogSuplyAndConsumableList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.logsuplyAndConsumableList = action.payload;
    },
    [getLogSuplyAndConsumableList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create logsuplyAndConsumable
    [createLogSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [createLogSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.logsuplyAndConsumableList.push(action.payload);
    },
    [createLogSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update suplyAndConsumable
    [updateLogSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [updateLogSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.logsuplyAndConsumable = {};
      state.isEditing = false;
    },
    [updateLogSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = logsuplyAndConsumableSlice.actions;
