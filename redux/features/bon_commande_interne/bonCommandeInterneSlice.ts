import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
     BonCommandeInternInitialState, BonCommandeItem
} from "./bonCommandeInterne.interface";

const initialState: BonCommandeInternInitialState = {
    bonCommandeInternes: [],
    bonCommandeInterne: {},
    isEditing: false,
    loading: false,
    error: null,
    demandeurs:[],
    grants: [],
    ligneBudgetaires:[]
};

export const editBonCommandeInterne = createAsyncThunk(
    "fourniture_consommable/editBonCommandeInterne",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/bon-de-commande-interne/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createBonCommandeInterne = createAsyncThunk(
    "fourniture_consommable/createBonCommandeInterne",
    async (data: BonCommandeItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/bon-de-commande-interne", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon commande interne créé avec succès",
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
  
export const deleteBonCommandeInterne = createAsyncThunk(
    "fourniture_consommable/deleteBonCommandeInterne",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/bon-de-commande-interne/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon commande Interne supprimé avec succès",
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

export const getBonCommandeInternes = createAsyncThunk(
  "fourniture_consommable/getBonCommandeInternes",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/bon-de-commande-interne", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const getBonCommandeInterne = createAsyncThunk(
  "fourniture_consommable/getBonCommandeInterne",
  async (data: { id: string , args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/logistique/bon-de-commande-interne/${data.id}`, { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const bonCommandeInterneSlice = createSlice({
    name: "employe",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.employe = {};
        },
    },
    extraReducers: {
        [getBonCommandeInternes.pending.type]: (state) => {
            state.loading = true;
        },
        [getBonCommandeInternes.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.bonCommandeInternes = action.payload;
        },
        [getBonCommandeInternes.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getBonCommandeInterne.pending.type]: (state) => {
          state.loading = true;
        },
        [getBonCommandeInterne.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.bonCommandeInterne = action.payload;
        },
        [getBonCommandeInterne.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createBonCommandeInterne.pending.type]: (state) => {
            state.loading = true;
        },
        [createBonCommandeInterne.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createBonCommandeInterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteBonCommandeInterne.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteBonCommandeInterne.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteBonCommandeInterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editBonCommandeInterne.pending.type]: (state) => {
            state.loading = true;
        },
        [editBonCommandeInterne.fulfilled.type]: (state, action) => {
            state.bonCommandeInterne = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editBonCommandeInterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = bonCommandeInterneSlice.actions;