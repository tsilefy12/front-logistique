import { createSlice } from "@reduxjs/toolkit";
import { VendorInitialState } from "./selectedOfferOrder.interface";
import { createVendor } from "./useCase/createSelectedOfferOrder";
import { deleteVendor } from "./useCase/deleteVendor";
import { editVendor } from "./useCase/editVendor";
import { getVendor } from "./useCase/getSelectedOfferOrder";
import { getVendors } from "./useCase/getSelectedOfferOrderList";
import { updateVendor } from "./useCase/updateVendor";

const vendorInitialState: VendorInitialState = {
  vendors: [],
  vendor: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const vendorSlice = createSlice({
  name: "vendor",
  initialState: vendorInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.vendor = {};
    },
  },
  extraReducers: {
    // get vendor
    [getVendor.pending.type]: (state) => {
      state.loading = true;
    },
    [getVendor.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.vendor = action.payload;
    },
    [getVendor.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get vendors
    [getVendors.pending.type]: (state) => {
      state.loading = true;
    },
    [getVendors.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.vendors = action.payload;
    },
    [getVendors.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create vendor
    [createVendor.pending.type]: (state) => {
      state.loading = true;
    },
    [createVendor.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.vendors.push(action.payload);
    },
    [createVendor.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update vendor
    [updateVendor.pending.type]: (state) => {
      state.loading = true;
    },
    [updateVendor.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.vendor = {};
      state.isEditing = false;
    },
    [updateVendor.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete vendor
    [deleteVendor.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteVendor.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteVendor.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit vendor
    [editVendor.pending.type]: (state) => {
      state.loading = true;
    },
    [editVendor.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.vendor = action.payload;
      state.isEditing = true;
    },
    [editVendor.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = vendorSlice.actions;
