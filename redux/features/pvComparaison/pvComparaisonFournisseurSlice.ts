import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";
import { PvComparaisonFournisseurInitialState, PvComparaisonFournisseurItem } from "./pvComparaisonFournisseur.interface.";

const initialState: PvComparaisonFournisseurInitialState = {
    pvComparaisonFournisseurs: [],
    pvComparaisonFournisseur: {},
    isEditing: false,
    loading: false,
    error: null
};

export const editPvComparaisonFournisseur = createAsyncThunk(
    "pvComparaison/editPvComparaisonFournisseur",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/vendor/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createPvComparaisonFournisseur = createAsyncThunk(
    "PvComparaison/createPvComparaisonFournisseur",
    async (data: PvComparaisonFournisseurItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/vendor", data);
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
  
export const deletePvComparaisonFournisseur = createAsyncThunk(
    "pvComparaison/deletePvComparaisonFournisseur",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/vendor/${data.id}`);
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

export const getPvComparaisonFournisseurs = createAsyncThunk(
  "pvComparaison/getPvComparaisonFournisseurs",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/rh/employee", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const pvComparaisonFournisseurSlice = createSlice({
    name: "pvComparaison",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.employe = {};
        },
    },
    extraReducers: {
        [getPvComparaisonFournisseurs.pending.type]: (state) => {
            state.loading = true;
        },
        [getPvComparaisonFournisseurs.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.pvComparaisonFournisseurs = action.payload;
        },
        [getPvComparaisonFournisseurs.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createPvComparaisonFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [createPvComparaisonFournisseur.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createPvComparaisonFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deletePvComparaisonFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [deletePvComparaisonFournisseur.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deletePvComparaisonFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editPvComparaisonFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [editPvComparaisonFournisseur.fulfilled.type]: (state, action) => {
            state.pvComparaison = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editPvComparaisonFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = pvComparaisonFournisseurSlice.actions;