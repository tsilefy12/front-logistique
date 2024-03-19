import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
   bonReceptionInitialState,bonReceptionItem
} from "./bonReception.interface";

const initialState: bonReceptionInitialState = {
    bonReceptions: [],
    bonReception: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editBonReception = createAsyncThunk(
    "fourniture_consommable/editBonReception",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/bon-de-reception/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createBonReception = createAsyncThunk(
    "fourniture_consommable/createBonReception",
    async (data: bonReceptionItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/bon-de-reception", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon  de reception créé avec succès",
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
  
export const deleteBonReception = createAsyncThunk(
    "fourniture_consommable/deleteBonReception",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/bon-de-reception/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon cde reception supprimé avec succès",
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

export const getBonReceptions = createAsyncThunk(
  "fourniture_consommable/getBonReceptions",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/bon-de-reception", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
export const getBonReception= createAsyncThunk(
  "fourniture_consommable/getBonReception",
  async (data: { id: string , args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/logistique/bon-de-reception/${data.id}`, { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const bonReceptionSlice = createSlice({
    name: "bonReceptions",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
          state.isEditing = false;
          state.bonReception = {};
        },
    },
    extraReducers: {
        [getBonReceptions.pending.type]: (state) => {
            state.loading = true;
        },
        [getBonReceptions.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.bonReceptions = action.payload;
        },
        [getBonReceptions.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getBonReception.pending.type]: (state) => {
          state.loading = true;
        },
        [getBonReception.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.bonReception = action.payload;
        },
        [getBonReception.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createBonReception.pending.type]: (state) => {
            state.loading = true;
        },
        [createBonReception.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createBonReception.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteBonReception.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteBonReception.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteBonReception.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editBonReception.pending.type]: (state) => {
            state.loading = true;
        },
        [editBonReception.fulfilled.type]: (state, action) => {
            state.bonReception = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editBonReception.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = bonReceptionSlice.actions;