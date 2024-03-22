import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
   personneConcernerItem,personneConcernerItemInitialState
} from "./personneConcerne.interface";

const initialState: personneConcernerItemInitialState = {
    personeConcerners: [],
    personneConcerner: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editPersonneConcerner = createAsyncThunk(
    "materiels/editPersonneConcerner",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/personne-concerne/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createPersonneConcerner = createAsyncThunk(
    "materiels/createPersonneConcerner",
    async (data: personneConcernerItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/personne-concerne", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Personne concerner créé avec succès",
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
  
export const deletePersonneConcerner = createAsyncThunk(
    "materiels/deletePersonneConcerner",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/personne-concerne/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "PersonneConcerné supprimé avec succès",
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

export const getPersonneConcerners = createAsyncThunk(
  "materiels/getPersonneConcerners",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/personne-concerne", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);



export const PersonneConcernerSlice = createSlice({
    name: "personneConcerner",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
          state.isEditing = false;
          state.personneConcerner = {};
        },
    },
    extraReducers: {
        [getPersonneConcerners.pending.type]: (state) => {
            state.loading = true;
        },
        [getPersonneConcerners.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.personeConcerners = action.payload;
        },
        [getPersonneConcerners.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createPersonneConcerner.pending.type]: (state) => {
            state.loading = true;
        },
        [createPersonneConcerner.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createPersonneConcerner.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deletePersonneConcerner.pending.type]: (state) => {
            state.loading = true;
        },
        [deletePersonneConcerner.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deletePersonneConcerner.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editPersonneConcerner.pending.type]: (state) => {
            state.loading = true;
        },
        [editPersonneConcerner.fulfilled.type]: (state, action) => {
            state.personneConcerner = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editPersonneConcerner.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = PersonneConcernerSlice.actions;