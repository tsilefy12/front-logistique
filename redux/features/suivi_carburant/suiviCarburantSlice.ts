import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";

import { axios } from "../../../lib/axios";
import { SuiviCarburantItem,  } from "./suivi_carburant.interface";
import { SuiviCarburantInitialState } from "./suivi_carburant.interface";

const initialState: SuiviCarburantInitialState = {
    suiviCarburants: [],
    suiviCarburant: {},
    isEditing: false,
    loading: false,
    error: null
};

export const editSuiviCarburant = createAsyncThunk(
    "suivicarburant/editSuiviCarburant",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/suivi-de-carburant/${data.id}`);
            console.log("data :", response.data)
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createSuiviCarburant = createAsyncThunk(
    "suivicarburant/createSuiviCarburant",
    async (data: SuiviCarburantItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/suivi-de-carburant", data);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "suivi carburant créé avec succès",
                    options: {
                        variant: "success",
                    },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const deleteSuiviCarburant = createAsyncThunk(
    "suivicarburant/deleteSuiviCarburant",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.delete(`/logistique/suivi-de-carburant/${data.id}`);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "suivi carburant supprimé avec succès",
                    options: {
                        variant: "success",
                    },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const getSuiviCarburantList = createAsyncThunk(
    "suivicarburant/getSuiviCarburantList",
    async (data: { args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get("/logistique/suivi-de-carburant", { params });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);
export const getSuiviCarburant = createAsyncThunk(
    "suivicarburant/getSuiviCarburant",
    async (data: { id: string, args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get(`/logistique/suivi-de-carburant/${data.id}`, { params });
            console.log("donnees",response.data)
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);
export const updateSuiviCarburant = createAsyncThunk(
    "suivicarburant/updateSuiviCarburant",
    async (data: { id: string, suiviCarburant: SuiviCarburantItem }, thunkAPI) => {
        try {
            const response = await axios.patch(`/logistique/suivi-de-carburant/${data.id}`, data.suiviCarburant);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "suivi carburant mise à jour avec succès",
                    options: {
                        variant: "success",
                    },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const suiviCarburantSlice = createSlice({
    name: "suiviCarburant",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.suiviCarburant = {};
        },
    },
    extraReducers: {
        [getSuiviCarburant.pending.type]: (state) => {
            state.loading = true;
        },
        [getSuiviCarburant.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getSuiviCarburant.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.suiviCarburant = action.payload;
        },
        [getSuiviCarburantList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.suiviCarburants = action.payload;
        },
        [getSuiviCarburantList.pending.type]: (state) => {
            state.loading = true;
        },
        [getSuiviCarburantList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
       
        [createSuiviCarburant.pending.type]: (state) => {
            state.loading = true;
        },
        [createSuiviCarburant.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createSuiviCarburant.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteSuiviCarburant.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteSuiviCarburant.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteSuiviCarburant.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editSuiviCarburant.pending.type]: (state) => {
            state.loading = true;
        },
        [editSuiviCarburant.fulfilled.type]: (state, action) => {
            state.suiviCarburant = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editSuiviCarburant.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [updateSuiviCarburant.pending.type]: (state) => {
            state.loading = true;
        },
        [updateSuiviCarburant.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.isEditing = false;
            state.suiviCarburant = {};
        },
        [updateSuiviCarburant.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = suiviCarburantSlice.actions;