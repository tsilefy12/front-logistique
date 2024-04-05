import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeProduitInitialState, typeProduitItem } from "./typeProduit.interface";
import { createTypeProduit } from "./useCase/typeProduit/createTypeProduit";
import { getTypeProduits } from "./useCase/typeProduit/getTypeProduits";
import { axios } from "../../../lib/axios";
import { enqueueSnackbar } from "../notification/notificationSlice";


const typeProduitInitialState: TypeProduitInitialState = {
  typeProduits: [],
  typeProduit: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const editTypeProduit = createAsyncThunk(
  "typeProduit/editTypeProduit",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/logistique/type-produit/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const deleteTypeProduit = createAsyncThunk(
  "produit/deleteTypeProduit",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/type-produit/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Type produit supprimé avec succès",
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

export const updateTypeProduit= createAsyncThunk(
  "produit/updateTypeProduit",
  async (data: { id: string; typeProduit: typeProduitItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/type-produit/${data.id}`,
        data.typeProduit
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "mis à jour avec succès",
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

export const typeProduitSlice = createSlice({
  name: "typeProduit",
  initialState: typeProduitInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.typeProduit = {};
    },
  },
  extraReducers: {
    // get TypeProduit
    [getTypeProduits.pending.type]: (state) => {
      state.loading = true;
    },
    [getTypeProduits.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.typeProduits = action.payload;
    },
    [getTypeProduits.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
    // create TypeProduit
    [createTypeProduit.pending.type]: (state) => {
      state.loading = true;
    },
    [createTypeProduit.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.typeProduits.push(action.payload);
    },
    [createTypeProduit.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteTypeProduit.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteTypeProduit.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteTypeProduit.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editTypeProduit.pending.type]: (state) => {
      state.loading = true;
    },
    [editTypeProduit.fulfilled.type]: (state, action) => {
      state.typeProduit = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editTypeProduit.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateTypeProduit.pending.type]: (state) => {
      state.loading = true;
    },
    [updateTypeProduit.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.typeProduit = {};
    },
    [updateTypeProduit.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = typeProduitSlice.actions;
