import { createSlice } from "@reduxjs/toolkit";
import { ConsumptionInvoiceInitialState } from "./consumptionInvoice.interface";
import { createConsumptionInvoice } from "./useCases/createConsumptionInvoice";
import { deleteConsumptionInvoice } from "./useCases/deleteConsumptionInvoice";
import { editConsumptionInvoice } from "./useCases/editConsumptionInvoice";
import { getCarVouchers } from "./useCases/getCarVouchers";
import { getConsumptionInvoice } from "./useCases/getConsumptionInvoice";
import { getConsumptionInvoices } from "./useCases/getConsumptionInvoices";
import { updateConsumptionInvoice } from "./useCases/updateConsumptionInvoice";



const consumptionInvoiceInitialState : ConsumptionInvoiceInitialState = {
    consumptionInvoices: [],
    consumptionInvoice: {},
    carvouchers: [],
    isEditing: false,
    loading: false,
    error: null,
};

export const consumptionInvoiceSlice = createSlice({
    name: "consumption-invoice",
    initialState: consumptionInvoiceInitialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.consumptionInvoice = {};
        },
    },
    extraReducers: {


        // get consumptionInvoice
        [getConsumptionInvoice.pending.type]: (state) => {
            state.loading = true;
        },
        [getConsumptionInvoice.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.consumptionInvoice = action.payload;
        },
        [getConsumptionInvoice.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
      
        // get consumptionInvoice
        [getConsumptionInvoices.pending.type]: (state) => {
            state.loading = true;
        },
        [getConsumptionInvoices.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.consumptionInvoices = action.payload;
        },
        [getConsumptionInvoices.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

         // create consumptionInvoice
        [createConsumptionInvoice.pending.type]: (state) => {
            state.loading = true;
        },
        [createConsumptionInvoice.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.consumptionInvoices.push(action.payload);
        },
        [createConsumptionInvoice.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // update consumptionInvoice
        [updateConsumptionInvoice.pending.type]: (state) => {
            state.loading = true;
        },
        [updateConsumptionInvoice.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.consumptionInvoice = {};
            state.isEditing = false;
        },
        [updateConsumptionInvoice.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },


        // edit consumptionInvoice
        [editConsumptionInvoice.pending.type]: (state) => {
            state.loading = true;
        },
        [editConsumptionInvoice.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.consumptionInvoice = action.payload;
            state.isEditing = true;
        },
        [editConsumptionInvoice.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // delete consumptionInvoice
        [deleteConsumptionInvoice.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteConsumptionInvoice.fulfilled.type]: (state) => {
            state.loading = false;
        },
        [deleteConsumptionInvoice.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // get carVouchers
        [getCarVouchers.pending.type]: (state) => {
            state.loading = true;
        },
        [getCarVouchers.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.carvouchers = action.payload;
        },
        [getCarVouchers.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

    },
});

export const { cancelEdit } = consumptionInvoiceSlice.actions;