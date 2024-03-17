import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";

import {
     PvComparaisonInitialState, PvComparaisonItem
} from "./pvComparaison.interface";
import { axios } from "../../../lib/axios";

const initialState: PvComparaisonInitialState = {
    pvComparaisons: [],
    pvComparaison: {},
    isEditing: false,
    loading: false,
    error: null
};

export const editPvComparaison = createAsyncThunk(
    "pvComparaison/editPvComparaison",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/pv-de-comparaison/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createPvComparaison = createAsyncThunk(
    "PvComparaison/createPvComparaison",
    async (data: PvComparaisonItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/pv-de-comparaison", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "pv comparaison créé avec succès",
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
  
export const deletePvComparaison = createAsyncThunk(
    "pvComparaison/deletePvComparaison",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/pv-de-comparaison/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "pv comparaison supprimé avec succès",
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

export const getPvComparaisons = createAsyncThunk(
  "pvComparaison/getPvComparaison",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/pv-de-comparaison", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const pvComparaisonSlice = createSlice({
    name: "pvComparaison",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.employe = {};
        },
    },
    extraReducers: {
        [getPvComparaisons.pending.type]: (state) => {
            state.loading = true;
        },
        [getPvComparaisons.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.pvComparaisons = action.payload;
        },
        [getPvComparaisons.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createPvComparaison.pending.type]: (state) => {
            state.loading = true;
        },
        [createPvComparaison.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createPvComparaison.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deletePvComparaison.pending.type]: (state) => {
            state.loading = true;
        },
        [deletePvComparaison.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deletePvComparaison.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editPvComparaison.pending.type]: (state) => {
            state.loading = true;
        },
        [editPvComparaison.fulfilled.type]: (state, action) => {
            state.pvComparaison = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editPvComparaison.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = pvComparaisonSlice.actions;