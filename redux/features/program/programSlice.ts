import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

interface ProgramInitialState {
  programs: ProgramItem[]
  program: ProgramItem
  isEditing: boolean,
  loading: boolean,
  [key: string]: any
}

export interface ProgramItem {
  id?: string,
  name?: string,
};

const initialState: ProgramInitialState = {
  programs: [],
  program: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const getProgram = createAsyncThunk('program/getProgram', async (data: { id: string, args?: any }, thunkAPI) => {
  try {
    const params = {
      args: JSON.stringify(data.args),
    };
    const response = await axios.get(`/rh/program/${data.id}`, { params });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
});

export const getPrograms = createAsyncThunk('program/getPrograms', async (data: { args?: any }, thunkAPI) => {
  try {
    const params = {
      args: JSON.stringify(data.args),
    };
    const response = await axios.get('/rh/program', { params });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
});

export const createProgram = createAsyncThunk('program/createProgram', async (data: ProgramItem, thunkAPI) => {
  try {
    const response = await axios.post('/rh/program', data);
    thunkAPI.dispatch(enqueueSnackbar({ message: 'Programme créé avec succès', options: { variant: 'success' } }));
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
})

export const updateProgram = createAsyncThunk('program/updateProgram', async (data: { id: string, program: ProgramItem }, thunkAPI) => {
  try {
    const response = await axios.patch(`/rh/program/${data.id}`, data.program);
    thunkAPI.dispatch(enqueueSnackbar({ message: 'Programme mis à jour avec succès', options: { variant: 'success' } }));
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
});

export const deleteProgram = createAsyncThunk('program/deleteProgram', async (data: { id: string }, thunkAPI) => {
  try {
    const response = await axios.delete(`/rh/program/${data.id}`);
    thunkAPI.dispatch(enqueueSnackbar({ message: 'Programme supprimé avec succès', options: { variant: 'success' } }));
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
});


export const editProgram = createAsyncThunk('program/editProgram', async (data: { id: string }, thunkAPI) => {
  try {
    const program = await thunkAPI.dispatch(getProgram({ id: data.id })).unwrap();
    return program;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
})

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.program = {};
    }
  },
  extraReducers: {
    [getProgram.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getProgram.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.program = action.payload;
    },
    [getProgram.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getPrograms.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getPrograms.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.programs = action.payload;
    },
    [getPrograms.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createProgram.pending.type]: (state, action) => {
      state.loading = true;
    },
    [createProgram.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createProgram.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateProgram.pending.type]: (state, action) => {
      state.loading = true;
    },
    [updateProgram.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.program = {};
      state.isEditing = false;
    },
    [updateProgram.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteProgram.pending.type]: (state, action) => {
      state.loading = true;
    },
    [deleteProgram.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteProgram.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [editProgram.pending.type]: (state, action) => {
      state.loading = true;
    },
    [editProgram.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.program = action.payload;
      state.isEditing = true;
    },
    [editProgram.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  },
});

export const { cancelEdit } = programSlice.actions;