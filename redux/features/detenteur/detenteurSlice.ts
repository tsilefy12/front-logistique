import { getDetenteurs } from "./useCase/getDetenteurs";
import { getDetenteur } from "./useCase/getDetenteur";
import { DetenteurInitialState } from "./detenteur.interface";
import { createSlice } from "@reduxjs/toolkit";

const vendorInitialState: DetenteurInitialState = {
    detenteurs: [],
    detenteur: {},
    isEditing: false,
    loading: false,
    error: null,
}

export const detenteurSlice = createSlice({
    name: "detenteur",
    initialState: vendorInitialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.vendor = {};
        },
    },
    extraReducers: {
        // get detenteur 
        [getDetenteur.pending.type]: (state) => {
            state.loading = true;
        },
        [getDetenteur.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.detenteur = action.payload;
        },
        [getDetenteur.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // get detenteurs
        [getDetenteurs.pending.type]: (state) => {
            state.loading = true;
        },
        [getDetenteurs.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.detenteurs = action.payload;
        },
        [getDetenteurs.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
      
    },
});

export const { cancelEdit } = detenteurSlice.actions;