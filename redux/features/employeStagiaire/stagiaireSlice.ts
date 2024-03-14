import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../lib/axios";
import { InternshipInitialState } from './stagiaireSlice.interface';

const initialState: InternshipInitialState = {
    interns: [],
    intern: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const getInterns = createAsyncThunk(
	"interns/getInterns",
	async (data: { args?: any }, thunkAPI) => {
		try {
            const params = {
                args: JSON.stringify(data.args),
            };
			const response = await axios.get("/rh/intern", { params });
			return response.data;
		} catch (error: any) {
			if (error.response) {
				return thunkAPI.rejectWithValue(error);
			}
			throw error;
		}
	}
);
  
export const stagiaireSlice = createSlice({
    name: "intern",
    initialState,
    reducers: {
      cancelEdit: (state) => {
        state.isEditing = false;
        state.intern = {};
      },
    },
    extraReducers: {
        [getInterns.pending.type]: (state) => {
            state.loading = true;
        },
        [getInterns.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.interns = action.payload;
        },
        [getInterns.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    },
  });
  
  export const { cancelEdit } = stagiaireSlice.actions;