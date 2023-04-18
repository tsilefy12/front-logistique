import { createSlice } from "@reduxjs/toolkit";
import { LogSuplyAndConsumableInitialState } from "./log-supply-and-consumable.interface";
import { createLogSuplyAndConsumable } from "./useCase/createLogSupplyAndConsumable";
import { getLogSuplyAndConsumable } from "./useCase/getLogSupplyAndConsumable";
import { getLogSuplyAndConsumableListe } from "./useCase/getLogSupplyAndConsumableList";
import { updateLogSuplyAndConsumable } from "./useCase/updateSupplyAndConsumable";

const logSuplyAndConsumableInitialState: LogSuplyAndConsumableInitialState = {
  logSuplyAndConsumableList: [],
  logSuplyAndConsumable: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const logSuplyAndConsumableSlice = createSlice({
  name: "logSuplyAndConsumble",
  initialState: logSuplyAndConsumableInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.logSuplyAndConsumable = {};
    },
  },
  extraReducers: {
    // get logsuplyAndConsumable
    [getLogSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [getLogSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.logSuplyAndConsumable = action.payload;
    },
    [getLogSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get logsuplyAndConsumableList
    [getLogSuplyAndConsumableListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getLogSuplyAndConsumableListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.logSuplyAndConsumableList = action.payload;
    },
    [getLogSuplyAndConsumableListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create logsuplyAndConsumable
    [createLogSuplyAndConsumable.pending.type]: (state) => {
      state.loading = true;
    },
    [createLogSuplyAndConsumable.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.logSuplyAndConsumableList.push(action.payload);
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
      state.logSuplyAndConsumable = {};
      state.isEditing = false;
    },
    [updateLogSuplyAndConsumable.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = logSuplyAndConsumableSlice.actions;
