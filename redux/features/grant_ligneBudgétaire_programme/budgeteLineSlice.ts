import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BudgetLineInitialState } from "./interface";
import { axios } from "../../../lib/axios";

const initialState: BudgetLineInitialState = {
  budgetLineList: [],
  budgetLine: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const getBudgetLineList = createAsyncThunk(
    "BudgetLine/getBudgetLineList",
    async (data: { args?: any }, thunkAPI) => {
      try {
        const params = {
          args: JSON.stringify(data.args),
        };
        const response = await axios.get("/compta/budget-line", { params });
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
);

export const budgetLineSlice = createSlice({
  name: "budgetLine",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.budgetLine = {};
    },
  },
  extraReducers: {
    [getBudgetLineList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBudgetLineList.fulfilled.type]: (state, action) => {
      state.budgetLineList = action.payload;
      state.loading = false;
    },
    [getBudgetLineList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = budgetLineSlice.actions;