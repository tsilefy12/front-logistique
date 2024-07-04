import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../../lib/axios";
import { ActivityInitialState, ActivityItem } from "./activity.interface";


const ActivityInitial: ActivityInitialState = {
    activitys: [],
    activity: {},
    isEdit: false,
    loading: false,
    error: null
};

export const editActivity = createAsyncThunk(
    "activity/editActivity",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/activity/find-by-carVoucherId/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createActivity = createAsyncThunk(
    "activity/createActivity",
    async (data: ActivityItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/activity", data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const deleteActivity = createAsyncThunk(
    "activity/deleteActivity",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.delete(`/logistique/activity/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const getActivityList = createAsyncThunk(
    "activity/getActivityList",
    async (data: {args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get("/logistique/activity");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                // Extract relevant information from the error object
                const errorMessage = error.message || "An error occurred";
                return thunkAPI.rejectWithValue(errorMessage);
            }
            throw error;
        }
    }
);

export const getActivity = createAsyncThunk(
    "activity/getActivity",
    async (data: { id: string, args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get(`/logistique/activity/find-by-carVoucherId/${data.id}`, { params });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const updateActivity = createAsyncThunk(
  "activity/updateActivity",
  async (data: { id: string; activity: ActivityItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/activity/${data.id}`,
        data.activity
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


export const activitySlice = createSlice({
    name: "activity",
    initialState: ActivityInitial,
    reducers: {
        cancelEdit: (state) => {
            state.isEdit = false;
            state.employe = {};
        },
    },
    extraReducers: {
        [getActivity.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.activitys = action.payload;
        },
        [getActivity.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getActivity.pending.type]: (state) => {
            state.loading = true;
        },
        [getActivityList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.activitys = action.payload;
        },
        [getActivityList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getActivityList.pending.type]: (state) => {
            state.loading = true;
        },
        [createActivity.pending.type]: (state) => {
            state.loading = true;
        },
        [createActivity.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createActivity.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteActivity.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteActivity.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteActivity.pending.type]: (state) => {
            state.loading = true;
        },
        [editActivity.fulfilled.type]: (state, action) => {
            state.activity = action.payload;
            state.loading = false;
            state.isEdit = true;
        },
        [editActivity.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [updateActivity.pending.type]: (state) => {
            state.loading = true;
        },
        [updateActivity.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.isEdit = false;
            state.activity = {};
        },
        [updateActivity.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = activitySlice.actions;