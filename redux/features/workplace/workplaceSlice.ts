import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

interface WorkplaceInitialState {
  workplaces: WorkplaceItem[];
  workplace: WorkplaceItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}

export interface WorkplaceItem {
  id?: string;
  name?: string;
  address?: string;
}

const initialState: WorkplaceInitialState = {
  workplaces: [],
  workplace: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const getWorkplace = createAsyncThunk(
  "workplace/getWorkplace",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/rh/workplace/${data.id}`, { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const getWorkplaces = createAsyncThunk(
  "workplace/getWorkplaces",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/rh/workplace", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const createWorkplace = createAsyncThunk(
  "workplace/createWorkplace",
  async (data: WorkplaceItem, thunkAPI) => {
    try {
      const response = await axios.post("/rh/workplace", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Lieu de travail créé avec succès",
          options: { variant: "success" },
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

export const updateWorkplace = createAsyncThunk(
  "workplace/updateWorkplace",
  async (data: { id: string; workplace: WorkplaceItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/rh/workplace/${data.id}`,
        data.workplace
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Lieu de travail mis à jour avec succès",
          options: { variant: "success" },
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

export const deleteWorkplace = createAsyncThunk(
  "workplace/deleteWorkplace",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/rh/workplace/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Lieu de travail supprimé avec succès",
          options: { variant: "success" },
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

export const editWorkplace = createAsyncThunk(
  "workplace/editWorkplace",
  async (data: { id: string }, thunkAPI) => {
    try {
      const workplace = await thunkAPI
        .dispatch(getWorkplace({ id: data.id }))
        .unwrap();
      return workplace;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const workplaceSlice = createSlice({
  name: "workplace",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.workplace = {};
    },
  },
  extraReducers: {
    [getWorkplace.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getWorkplace.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.workplace = action.payload;
    },
    [getWorkplace.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getWorkplaces.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getWorkplaces.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.workplaces = action.payload;
    },
    [getWorkplaces.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createWorkplace.pending.type]: (state, action) => {
      state.loading = true;
    },
    [createWorkplace.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createWorkplace.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateWorkplace.pending.type]: (state, action) => {
      state.loading = true;
    },
    [updateWorkplace.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.workplace = {};
      state.isEditing = false;
    },
    [updateWorkplace.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteWorkplace.pending.type]: (state, action) => {
      state.loading = true;
    },
    [deleteWorkplace.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteWorkplace.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [editWorkplace.pending.type]: (state, action) => {
      state.loading = true;
    },
    [editWorkplace.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.workplace = action.payload;
      state.isEditing = true;
    },
    [editWorkplace.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = workplaceSlice.actions;
