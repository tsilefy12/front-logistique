import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";

import {
     BonCommandeExternInitialState, BonCommandeExterneItem
} from "./bonCommandeExterne.interface";
import { axios } from "../../../lib/axios";

const initialState: BonCommandeExternInitialState = {
    bonCommandeExternes: [],
    bonCommandeExterne: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editBonCommandeExterne = createAsyncThunk(
    "fourniture_consommable/editBonCommandeExterne",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/bon-de-commande-externe/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createBonCommandeExterne = createAsyncThunk(
    "fourniture_consommable/createBonCommandeExterne",
    async (data: BonCommandeExterneItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/bon-de-commande-externe", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon commande Externe créé avec succès",
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
  
export const deleteBonCommandeExterne = createAsyncThunk(
    "fourniture_consommable/deleteBonCommandeExterne",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/bon-de-commande-externe/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon commande Externe supprimé avec succès",
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

export const getBonCommandeExternes = createAsyncThunk(
  "fourniture_consommable/getBonCommandeExternes",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/bon-de-commande-externe", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
export const getBonCommandeExterne = createAsyncThunk(
  "fourniture_consommable/getBonCommandeExterne",
  async (data: { id: string , args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/logistique/logistique/bon-de-commande-externe/${data.id}`, { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const bonCommandeExterneSlice = createSlice({
    name: "employe",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.employe = {};
        },
    },
    extraReducers: {
        [getBonCommandeExternes.pending.type]: (state) => {
            state.loading = true;
        },
        [getBonCommandeExternes.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.bonCommandeExternes = action.payload;
        },
        [getBonCommandeExternes.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getBonCommandeExterne.pending.type]: (state) => {
          state.loading = true;
        },
        [getBonCommandeExterne.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.bonCommandeExterne = action.payload;
        },
        [getBonCommandeExterne.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createBonCommandeExterne.pending.type]: (state) => {
            state.loading = true;
        },
        [createBonCommandeExterne.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createBonCommandeExterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteBonCommandeExterne.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteBonCommandeExterne.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteBonCommandeExterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editBonCommandeExterne.pending.type]: (state) => {
            state.loading = true;
        },
        [editBonCommandeExterne.fulfilled.type]: (state, action) => {
            state.bonCommandeExterne = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editBonCommandeExterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = bonCommandeExterneSlice.actions;