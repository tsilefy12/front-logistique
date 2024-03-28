import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
   bonTransfertInitialState,bonTransfertItem
} from "./bonTransfert.interface";;

const initialState: bonTransfertInitialState = {
    bonTransferts: [],
    bonTransfert: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editBonTransfert = createAsyncThunk(
    "fourniture_consommable/editBonTransfert",
    async (data: { id: string , args?: any }, thunkAPI) => {
      try {
        const params = {
          args: JSON.stringify(data.args),
        };
            const response = await axios.get(`/logistique/bon-de-transfert/${data.id}`,{params});
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createBonTransfert = createAsyncThunk(
    "fourniture_consommable/createBonTransfert",
    async (data: bonTransfertItem, thunkAPI) => {
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
  
export const deleteBonTransfert = createAsyncThunk(
    "fourniture_consommable/deleteBonTransfert",
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
export const getBonTransferts = createAsyncThunk(
  "fourniture_consommable/getBonTransferts",
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
export const getBonTransfert = createAsyncThunk(
  "fourniture_consommable/getBonTransfert",
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

export const updateBonTransfert = createAsyncThunk(
  "BonTransfert/updateBonTransfert",
  async (data: { id: string; updateData: bonTransfertItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/bon-de-transfert/${data.id}`,
        data.updateData
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Bon de transfert mis à jour avec succès",
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
export const bonTransfertSlice = createSlice({
    name: "bonTransfert",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.bonTransfert = {};
        },
    },
    extraReducers: {
        [getBonTransferts.pending.type]: (state) => {
            state.loading = true;
        },
        [getBonTransferts.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.bonTransferts = action.payload;
        },
        [getBonTransferts.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getBonTransfert.pending.type]: (state) => {
          state.loading = true;
        },
        [getBonTransfert.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.bonTransfert = action.payload;
        },
        [getBonTransfert.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createBonTransfert.pending.type]: (state) => {
            state.loading = true;
        },
        [createBonTransfert.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createBonTransfert.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteBonTransfert.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteBonTransfert.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteBonTransfert.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editBonTransfert.pending.type]: (state) => {
            state.loading = true;
        },
        [editBonTransfert.fulfilled.type]: (state, action) => {
            state.bonTransfert = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editBonTransfert.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        // update bon de transfert
        [updateBonTransfert.pending.type]: (state) => {
          state.loading = true;
        },
        [updateBonTransfert.fulfilled.type]: (state, action) => {
          state.loading = false;
          state.bonTransfert = {};
          state.isEditing = false;
        },
        [updateBonTransfert.rejected.type]: (state, action) => {
          state.loading = false;
          state.error = action.error;
        },
    },
});

export const { cancelEdit } = bonTransfertSlice.actions;