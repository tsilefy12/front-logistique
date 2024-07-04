import { createSlice } from "@reduxjs/toolkit";
import { CarVoucherInitialState } from "./carVoucher.interface";
import { createCarVoucher } from "./usesCases/createCarVoucher";
import { deleteCarVoucher } from "./usesCases/deleteCarVoucher";
import { editCarVoucher } from "./usesCases/editCarVoucher";
import { getCarVoucher } from "./usesCases/getCarVoucher";
import { getCarVouchers } from "./usesCases/getCarVouchers";
import { updateCarVoucher } from "./usesCases/updateCarVoucher";

const carVoucherInitialState : CarVoucherInitialState = {
    carVouchers: [],
    carVoucher: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const carVoucherSlice = createSlice({
    name: "car-voucher",
    initialState: carVoucherInitialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.carVoucher = {};
        },
    },
    extraReducers: {

        // get Car Voucher
        [getCarVoucher.pending.type]: (state) => {
            state.loading = true;
        },
        [getCarVoucher.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.carVoucher = action.payload;
        },
        [getCarVoucher.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
      
        // get Car Voucher
        [getCarVouchers.pending.type]: (state) => {
            state.loading = true;
        },
        [getCarVouchers.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.carVouchers = action.payload;
        },
        [getCarVouchers.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

         // create Car Voucher
        [createCarVoucher.pending.type]: (state) => {
            state.loading = true;
        },
        [createCarVoucher.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.carVouchers.push(action.payload);
        },
        [createCarVoucher.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // update Car Voucher
        [updateCarVoucher.pending.type]: (state) => {
            state.loading = true;
        },
        [updateCarVoucher.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.carVoucher = {};
            state.isEditing = false;
        },
        [updateCarVoucher.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },


        // edit Car Voucher
        [editCarVoucher.pending.type]: (state) => {
            state.loading = true;
        },
        [editCarVoucher.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.carVoucher = action.payload;
            state.isEditing = true;
        },
        [editCarVoucher.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // delete Car Voucher
        [deleteCarVoucher.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteCarVoucher.fulfilled.type]: (state) => {
            state.loading = false;
        },
        [deleteCarVoucher.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

    },
});

export const { cancelEdit } = carVoucherSlice.actions;