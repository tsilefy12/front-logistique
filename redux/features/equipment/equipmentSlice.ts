import { createSlice } from "@reduxjs/toolkit";
import { EquipmentInitialState } from "./equipment.interface";
import { createEquipment } from "./useCases/createEquipment";
import { getEquipments } from "./useCases/getEquipments";
import { updateEquipment } from "./useCases/updateEquipment";
import { deleteEquipment } from "./useCases/deleteEquipment";
import { getTypeEquipments } from "./useCases/getTypeEquipments";
import { getEmployees } from "./useCases/getEmployees";
import { editEquipment } from "./useCases/editEquipment";




const equipementInitialState: EquipmentInitialState = {
    equipments: [],
    equipment: {},
    employees: [],
    typeequipment:[],
    isEditing: false,
    loading: false,
    error: null,
};

export const equipmentSlice = createSlice({
    name: "equipment",
    initialState: equipementInitialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.equipment = {};
        },
    },
    extraReducers: {
       
        // get equipment
        [getTypeEquipments.pending.type]: (state) => {
            state.loading = true;
        },
        [getTypeEquipments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.typeequipment = action.payload;
        },
        [getTypeEquipments.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        // get employee
        [getEmployees.pending.type]: (state) => {
            state.loading = true;
        },
        [getEmployees.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.employees = action.payload;
        },
        [getEmployees.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        // get equipments
        [getEquipments.pending.type]: (state) => {
            state.loading = true;
        },
        [getEquipments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.equipments = action.payload;
        },
        [getEquipments.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        // edit equipment
        [editEquipment.pending.type]: (state) => {
            state.loading = true;
        },
        [editEquipment.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.equipment = action.payload;
            state.isEditing = true;
        },
        [editEquipment.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        // create equipment
        [createEquipment.pending.type]: (state) => {
            state.loading = true;
        },
        [createEquipment.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.equipments.push(action.payload);
        },
        [createEquipment.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        // update equipment
        [updateEquipment.pending.type]: (state) => {
            state.loading = true;
        },
        [updateEquipment.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.equipment = {};
            state.isEditing = false;
        },
        [updateEquipment.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        // delete equipment
        [deleteEquipment.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteEquipment.fulfilled.type]: (state) => {
            state.loading = false;
        },
        [deleteEquipment.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        },
});

 export const { cancelEdit } = equipmentSlice.actions;
