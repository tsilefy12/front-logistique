import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import {
  EmployeInitialState,
  EmployeItem,
} from "./employeeSlice.interface";
import axios from "axios";

const initialState: EmployeInitialState = {
  employees: [],
  employe: {},
  isEditing: false,
  loading: false,
  error: null,
};


export const getEmployes = createAsyncThunk(
  "employe/getEmployes",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/rh/employee", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const employeSlice = createSlice({
    name: "employe",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.employe = {};
        },
    },
    extraReducers: {
        [getEmployes.pending.type]: (state) => {
        state.loading = true;
        },
        [getEmployes.fulfilled.type]: (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        },
        [getEmployes.rejected.type]: (state, action) => {
        state.loading = false;
        state.error = action.error;
        },
    },
});

export const { cancelEdit } = employeSlice.actions;