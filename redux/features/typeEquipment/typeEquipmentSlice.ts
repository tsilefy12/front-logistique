import { createSlice } from "@reduxjs/toolkit";
import { createTypeEquipment } from "./useCase/createTypeEquipment";
import { deleteTypeEquipment } from "./useCase/deleteTypeEquipment";
import { editTypeEquipment } from "./useCase/editTypeEquipment";
import { getTypeEquipment } from "./useCase/getTypeEquipment";
import { getTypeEquipmentList } from "./useCase/getTypeEquipmentListe";
import { updateTypeEquipment } from "./useCase/updateTypeEquipment";
import { TypeEquipmentInitialState } from "./typeEquipmentSlice.interface";

const initialState: TypeEquipmentInitialState = {
  typeEquipmentList: [],
  typeEquipment: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const typeEquipmentSlice = createSlice({
  name: "typeEquipment",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.typeEquipment = {};
    },
  },
  extraReducers: {
    [getTypeEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [getTypeEquipment.fulfilled.type]: (state, action) => {
      state.typeEquipment = action.payload;
      state.loading = false;
    },
    [getTypeEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [getTypeEquipmentList.pending.type]: (state) => {
      state.loading = true;
    },
    [getTypeEquipmentList.fulfilled.type]: (state, action) => {
      state.typeEquipmentList = action.payload;
      state.loading = false;
    },
    [getTypeEquipmentList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [createTypeEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [createTypeEquipment.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createTypeEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateTypeEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [updateTypeEquipment.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.typeEquipment = {};
    },
    [updateTypeEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deleteTypeEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteTypeEquipment.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteTypeEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editTypeEquipment.pending.type]: (state) => {
      state.loading = true;
    },
    [editTypeEquipment.fulfilled.type]: (state, action) => {
      state.typeEquipment = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editTypeEquipment.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = typeEquipmentSlice.actions;
