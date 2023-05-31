import { createSlice } from "@reduxjs/toolkit";
import { EquipmentStockInitialState } from "./equipmentStock.interface";
import { getEquipmentStock } from "./useCase/getEquipmentStock";
import { getEquipmentStockList } from "./useCase/getEquipmentStockList";

const equipmentStockInitialState: EquipmentStockInitialState = {
  equipmentStockList: [],
  equipmentStock: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const equipmentStockSlice = createSlice({
  name: "equipmentStock",
  initialState: equipmentStockInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.equipmentStock = {};
    },
  },
  extraReducers: {
    // get equipmentStock
    [getEquipmentStock.pending.type]: (state) => {
      state.loading = true;
    },
    [getEquipmentStock.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.equipmentStock = action.payload;
    },
    [getEquipmentStock.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get equipmentList
    [getEquipmentStockList.pending.type]: (state) => {
      state.loading = true;
    },
    [getEquipmentStockList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.equipmentStockList = action.payload;
    },
    [getEquipmentStockList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = equipmentStockSlice.actions;
