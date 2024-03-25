import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GrantInitialState } from "./interface";
import { axios } from "../../../lib/axios";

const initialState: GrantInitialState = {
    grantList: [],
    grant: {},
    isEditing: false,
    loading: false,
    error: null,
  };

export const getGrantList = createAsyncThunk(
    "grant/getGrantList",
    async (data: { args?: any }, thunkAPI) => {
      try {
        const params = {
          args: JSON.stringify(data.args),
        };
        const response = await axios.get("/compta/grant", { params });
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
);
  
export const grantSlice = createSlice({
    name: "grant",
    initialState,
    reducers: {
      cancelEdit: (state) => {
        state.isEditing = false;
        state.grant = {};
      },
    },
    extraReducers: {
      [getGrantList.pending.type]: (state) => {
        state.loading = true;
      },
      [getGrantList.fulfilled.type]: (state, action) => {
        state.grantList = action.payload;
        state.loading = false;
      },
      [getGrantList.rejected.type]: (state, action) => {
        state.error = action.error;
        state.loading = false;
      }
    },
  });
  
  export const { cancelEdit } = grantSlice.actions;