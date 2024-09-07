import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LocalisationInitialState,
  LocalisationItem,
} from "./localisation.interface";
import { axios } from "../../../lib/axios";
import { createLocalisation } from "./useCase/localisation/createLocalisation";
import { getLocalisations } from "./useCase/localisation/getLocalisation";
import { enqueueSnackbar } from "../notification/notificationSlice";

const localisationInitialState: LocalisationInitialState = {
  localisations: [],
  localisation: {},
  isEditing: false,
  loading: false,
};
export const editLocalisation = createAsyncThunk(
  "localisation/editLocalisation",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/logistique/localisation/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const deleteLocalisation = createAsyncThunk(
  "localisation/deleteLocalisation",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/localisation/${data.id}`,
        {
          method: "DELETE",
        }
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Localisation supprimé avec succès",
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

export const updateLocalisation = createAsyncThunk(
  "localisation/updateLocalisation",
  async (data: { id: string; localisation: LocalisationItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/localisation/${data.id}`,
        data.localisation
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Localisation mis à jour avec succès",
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
export const LocalisationSlice = createSlice({
  name: "localisation",
  initialState: localisationInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.localisation = {};
    },
  },
  extraReducers: {
    // get localisation
    [getLocalisations.pending.type]: (state) => {
      state.loading = true;
    },
    [getLocalisations.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.localisations = action.payload;
    },
    [getLocalisations.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create localisation
    [createLocalisation.pending.type]: (state) => {
      state.loading = true;
    },
    [createLocalisation.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.localisations.push(action.payload);
    },
    [createLocalisation.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [deleteLocalisation.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteLocalisation.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteLocalisation.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editLocalisation.pending.type]: (state) => {
      state.loading = true;
    },
    [editLocalisation.fulfilled.type]: (state, action) => {
      state.localisation = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editLocalisation.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateLocalisation.pending.type]: (state) => {
      state.loading = true;
    },
    [updateLocalisation.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.localisation = {};
    },
    [updateLocalisation.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});
