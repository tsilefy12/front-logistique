import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
   produitRecuInitialState,produitRecuItem
} from "./produitRecu.interface";

const initialState: produitRecuInitialState = {
    produitRecus: [],
    produitRecu: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editproduitRecu = createAsyncThunk(
    "fourniture_consommable/editproduitRecu",
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

export const createproduitRecu = createAsyncThunk(
    "fourniture_consommable/createproduitRecu",
    async (data: produitRecuItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/bon-de-commande-interne", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Produit créé avec succès",
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
  
export const deleteproduitRecu = createAsyncThunk(
    "fourniture_consommable/deleteproduitRecu",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/bon-de-commande-interne/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Produit Recu supprimé avec succès",
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

export const getproduitRecus = createAsyncThunk(
  "fourniture_consommable/getproduitRecus",
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

export const produitRecuSlice = createSlice({
    name: "produiReçu",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.produitRecu= {};
        },
    },
    extraReducers: {
        [getproduitRecus.pending.type]: (state) => {
            state.loading = true;
        },
        [getproduitRecus.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.produitRecus = action.payload;
        },
        [getproduitRecus.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createproduitRecu.pending.type]: (state) => {
            state.loading = true;
        },
        [createproduitRecu.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createproduitRecu.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteproduitRecu.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteproduitRecu.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteproduitRecu.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editproduitRecu.pending.type]: (state) => {
            state.loading = true;
        },
        [editproduitRecu.fulfilled.type]: (state, action) => {
            state.produitRecu = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editproduitRecu.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = produitRecuSlice.actions;