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
    "materiels/editFicheDotation",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/fiche-de-dotation/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const updateFicheDotation = createAsyncThunk(
  "FicheDotation/updateFicheDotation",
  async (data: { id: string; updateData: ficheDotationItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/fiche-de-dotation/${data.id}`,
        data.updateData
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Fiche de dotation mis à jour avec succès",
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

export const createFicheDotation = createAsyncThunk(
    "materiels/createFicheDotation",
    async (data: ficheDotationItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/fiche-de-dotation", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Fiche de dotation créé avec succès",
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
    "materiels/deleteFicheDotation",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/fiche-de-dotation/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Fiche de dotation supprimé avec succès",
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
  "materiels/getFicheDotations",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/fiche-de-dotation", { params });
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
  "materiels/getFicheDotation",
  async (data: { id: string , args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/logistique/fiche-de-dotation/${data.id}`, { params });
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

        // update fiche de dotation
        [updateFicheDotation.pending.type]: (state) => {
          state.loading = true;
        },
        [updateFicheDotation.fulfilled.type]: (state, action) => {
          state.loading = false;
          state.ficheDotation = {};
          state.isEditing = false;
        },
        [updateFicheDotation.rejected.type]: (state, action) => {
          state.loading = false;
          state.error = action.error;
        },
    },
});

export const { cancelEdit } = ficheDotationSlice.actions;