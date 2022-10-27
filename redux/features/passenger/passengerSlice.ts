import { createSlice } from "@reduxjs/toolkit";
import { createPassenger } from "./useCase/createPassenger";
import { deletePassenger } from "./useCase/deletePassenger";
import { editPassenger } from "./useCase/editPassenger";
import { getPassenger } from "./useCase/getPassenger";
import { getPassengerListe } from "./useCase/getPassengerListe";
import { updatePassenger } from "./useCase/updatePassenger";
import { PassengerInitialState } from "./passengerSlice.interface";

const initialState: PassengerInitialState = {
  passengerListe: [],
  passenger: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const passengerSlice = createSlice({
  name: "passenger",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.passenger = {};
    },
  },
  extraReducers: {
    [getPassenger.pending.type]: (state) => {
      state.loading = true;
    },
    [getPassenger.fulfilled.type]: (state, action) => {
      state.passenger = action.payload;
      state.loading = false;
    },
    [getPassenger.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [getPassengerListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getPassengerListe.fulfilled.type]: (state, action) => {
      state.passengerListe = action.payload;
      state.loading = false;
    },
    [getPassengerListe.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [createPassenger.pending.type]: (state) => {
      state.loading = true;
    },
    [createPassenger.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createPassenger.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updatePassenger.pending.type]: (state) => {
      state.loading = true;
    },
    [updatePassenger.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.passenger = {};
    },
    [updatePassenger.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deletePassenger.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePassenger.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deletePassenger.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editPassenger.pending.type]: (state) => {
      state.loading = true;
    },
    [editPassenger.fulfilled.type]: (state, action) => {
      state.passenger = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editPassenger.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = passengerSlice.actions;
