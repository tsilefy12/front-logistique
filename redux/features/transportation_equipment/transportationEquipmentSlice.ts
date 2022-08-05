import { TransportationEquipmentInitialState } from "./transportationEquipment.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getTransportationEquipments } from "./useCases/TransportationEquipments";
import { createTransportEquipment } from "./useCases/createTransportEquipment";
import { updateTransportationEquipment } from "./useCases/updateTransportEquipment";
import { editTransportationEquipment } from "./useCases/editTransportEquipment";
import { deleteTransportationEquipment } from "./useCases/deleteTransportEquipment";



const transportationEquipmentInitialState : TransportationEquipmentInitialState = {
    transportationEquipments: [],
    transportationEquipment: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const transportationEquipmentSlice = createSlice({
    name: "transportation_equipment",
    initialState: transportationEquipmentInitialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.transportationEquipment = {};
        },
    },
    extraReducers: {
      
        // get transportation Equipments
        [getTransportationEquipments.pending.type]: (state) => {
            state.loading = true;
        },
        [getTransportationEquipments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.transportationEquipments = action.payload;
        },
        [getTransportationEquipments.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

         // create ransportation Equipments
        [createTransportEquipment.pending.type]: (state) => {
            state.loading = true;
        },
        [createTransportEquipment.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.transportationEquipments.push(action.payload);
        },
        [createTransportEquipment.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // update Transportation Equipment
        [updateTransportationEquipment.pending.type]: (state) => {
            state.loading = true;
        },
        [updateTransportationEquipment.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.transportationEquipment = {};
            state.isEditing = false;
        },
        [updateTransportationEquipment.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },


        // edit Transportation Equipment
        [editTransportationEquipment.pending.type]: (state) => {
            state.loading = true;
        },
        [editTransportationEquipment.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.transportationEquipment = action.payload;
            state.isEditing = true;
        },
        [editTransportationEquipment.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // delete Transportation Equipment
        [deleteTransportationEquipment.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteTransportationEquipment.fulfilled.type]: (state) => {
            state.loading = false;
        },
        [deleteTransportationEquipment.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

    },
});

export const { cancelEdit } = transportationEquipmentSlice.actions;