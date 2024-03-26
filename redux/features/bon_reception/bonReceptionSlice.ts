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

export const updateBonReception = createAsyncThunk(
  "BonReception/updateBonReception",
  async (data: { id: string; updateDataBR: bonReceptionItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/bon-de-reception/${data.id}`,
        data.updateDataBR
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "BonReception mis à jour avec succès",
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
        //getAll bon de réception
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

        // get bon de réception
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

        // create bon de réception
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

        // delete bon de reception
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

        // edit bon de reception
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

        // update bon de réception
        [updateBonReception.pending.type]: (state) => {
          state.loading = true;
        },
        [updateBonReception.fulfilled.type]: (state, action) => {
          state.loading = false;
          state.bonReception = {};
          state.isEditing = false;
        },
        [updateBonReception.rejected.type]: (state, action) => {
          state.loading = false;
          state.error = action.error;
        },
    },
});

export const { cancelEdit } = bonReceptionSlice.actions;