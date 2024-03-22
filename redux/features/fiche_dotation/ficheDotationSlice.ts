import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
   ficheDotationItem,ficheDotationItemInitialState
} from "./ficheDotation.interface";

const initialState: ficheDotationItemInitialState = {
    ficheDotations: [],
    ficheDotation: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editFicheDotation = createAsyncThunk(
    "fourniture_consommable/editFicheDotation",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/bon-de-transfert/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createFicheDotation = createAsyncThunk(
    "fourniture_consommable/createFicheDotation",
    async (data: ficheDotationItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/bon-de-transfert", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon  de Transfert créé avec succès",
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
  
export const deleteFicheDotation = createAsyncThunk(
    "fourniture_consommable/deleteFicheDotation",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/bon-de-transfert/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon de Transfert supprimé avec succès",
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
export const getFicheDotations = createAsyncThunk(
  "fourniture_consommable/getFicheDotations",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/bon-de-transfert", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
export const getFicheDotation = createAsyncThunk(
  "fourniture_consommable/getFicheDotation",
  async (data: { id: string , args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/logistique/bon-de-transfert/${data.id}`, { params });
      return response.data
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const ficheDotationSlice = createSlice({
    name: "fi",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.ficheDotation = {};
        },
    },
    extraReducers: {
        [getFicheDotations.pending.type]: (state) => {
            state.loading = true;
        },
        [getFicheDotations.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.ficheDotations = action.payload;
        },
        [getFicheDotations.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getFicheDotation.pending.type]: (state) => {
          state.loading = true;
        },
        [getFicheDotation.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.ficheDotation = action.payload;
        },
        [getFicheDotation.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createFicheDotation.pending.type]: (state) => {
            state.loading = true;
        },
        [createFicheDotation.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createFicheDotation.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteFicheDotation.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteFicheDotation.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteFicheDotation.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editFicheDotation.pending.type]: (state) => {
            state.loading = true;
        },
        [editFicheDotation.fulfilled.type]: (state, action) => {
            state.ficheDotation = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editFicheDotation.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = ficheDotationSlice.actions;