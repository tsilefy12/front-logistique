import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";

import { axios } from "../../../lib/axios";
import { ActivityInitialState, ActivityItem } from "./activity.interface";


const ActivityInitialState: ActivityInitialState = {
    activitys: [],
    activity: {},
    isEditing: false,
    loading: false,
    error: null
};

export const editActivity = createAsyncThunk(
    "activity/editActivity",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/activity/${data.id}`);
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
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Activity créée avec succès",
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

export const deleteActivity = createAsyncThunk(
    "activity/deleteActivity",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.delete(`/logistique/activity/${data.id}`);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Activity supprimée avec succès",
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

export const getActivityList = createAsyncThunk(
    "activity/getActivityList",
    async (data: { args?: any }, thunkAPI) => {
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
            const response = await axios.get(`/logistique/activity/${data.id}`, { params });
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
        console.log("id :", data.id)
      const response = await axios.patch(
        `/logistique/activity/${data.id}`,
        data.activity
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Activity mis à jour avec succès",
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


export const activitySlice = createSlice({
    name: "activity",
    initialState: ActivityInitialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.employe = {};
        },
    },
    extraReducers: {
        [getActivity.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.activity = action.payload;
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
            state.isEditing = true;
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
            state.isEditing = false;
            state.activity = {};
        },
        [updateActivity.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = activitySlice.actions;