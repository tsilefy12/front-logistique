import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OffreRetenuInitialState, OffreRetenuItem } from "./offreRetenu.interface";
import { axios } from "../../../lib/axios";
import { enqueueSnackbar } from "../notification/notificationSlice";

const initialState: OffreRetenuInitialState = {
    offreRetenus: [],
    offreRetenu: {},
    isEditing: false,
    loading: false,
    error: null
};

export const createOffreRetenu = createAsyncThunk(
    "PvComparaison/createOffreRetenu",
    async (data: OffreRetenuItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/offre-retenu", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "offre retenu créé avec succès",
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

export const deleteOffreRetenu = createAsyncThunk(
    "pvComparaison/deleteOffreRetenu",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/offre-retenu/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "offre supprimé avec succès",
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

export const OffreRetenuSlice = createSlice({
    name: "offerRetenu",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.offreRetenu = {};
        },
    },
    extraReducers: {
        [createOffreRetenu.pending.type]: (state) => {
            state.loading = true;
        },
        [createOffreRetenu.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createOffreRetenu.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },

        [deleteOffreRetenu.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteOffreRetenu.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteOffreRetenu.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = OffreRetenuSlice.actions;