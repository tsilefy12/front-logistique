import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";
import {
  ModePaiementInitialState,
  ModePaiementItem,
} from "./modePaiement.interface";
import { getModePaiements } from "./useCase/modePaiement/getModePaiement";
import { createModePaiement } from "./useCase/modePaiement/createModePaiement";

const modePaiementInitialState: ModePaiementInitialState = {
  modePaiements: [],
  modePaiement: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const editModePaiement = createAsyncThunk(
  "modePaiement/editModePaiement",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/logistique/mode-paiement/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const deleteModePaiement = createAsyncThunk(
  "modePaiement/deleteModePaiement",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/mode-paiement/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mode de paiement supprimé avec succès",
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

export const updateModePaiement = createAsyncThunk(
  "modePaiement/updateModePaiement",
  async (data: { id: string; modePaiement: ModePaiementItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/mode-paiement/${data.id}`,
        data.modePaiement
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mode de paiement mis à jour avec succès",
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

export const ModePaiementSlice = createSlice({
  name: "modePaiement",
  initialState: modePaiementInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.modePaiement = {};
    },
  },
  extraReducers: {
    // get modePaiement
    [getModePaiements.pending.type]: (state) => {
      state.loading = true;
    },
    [getModePaiements.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.modePaiements = action.payload;
    },
    [getModePaiements.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create modePaiement
    [createModePaiement.pending.type]: (state) => {
      state.loading = true;
    },
    [createModePaiement.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.modePaiements.push(action.payload);
    },
    [createModePaiement.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [deleteModePaiement.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteModePaiement.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteModePaiement.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editModePaiement.pending.type]: (state) => {
      state.loading = true;
    },
    [editModePaiement.fulfilled.type]: (state, action) => {
      state.modePaiement = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editModePaiement.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateModePaiement.pending.type]: (state) => {
      state.loading = true;
    },
    [updateModePaiement.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.modePaiement = {};
    },
    [updateModePaiement.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = ModePaiementSlice.actions;
