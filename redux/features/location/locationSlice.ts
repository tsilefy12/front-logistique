import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";

import { axios } from "../../../lib/axios";
import { LocationInitialState, LocationItem } from "./location.interface";

const initialState: LocationInitialState = {
    locationDeTransports: [],
    locationDeTransport: {},
    isEditing: false,
    loading: false,
    error: null
};

export const editLocation = createAsyncThunk(
    "location/editLocation",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/location-de-transport/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createLocation = createAsyncThunk(
    "location/createLocation",
    async (data: LocationItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/location-de-transport", data);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Location créée avec succès",
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

export const deleteLocation = createAsyncThunk(
    "location/deleteLocation",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.delete(`/logistique/location-de-transport/${data.id}`);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Location supprimée avec succès",
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

export const getLocationtList = createAsyncThunk(
    "location/getLocationtList",
    async (data: { args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get("/logistique/location-de-transport", {params});
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

export const getLocation = createAsyncThunk(
    "location/getLocation",
    async (data: { id: string, args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get(`/logistique/location-de-transport/${data.id}`, { params });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (data: { id: string; location: LocationItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/location-de-transport/${data.id}`,
        data.location
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Location mis à jour avec succès",
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


export const locationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.employe = {};
        },
    },
    extraReducers: {
        [getLocation.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.locationDeTransport = action.payload;
        },
        [getLocation.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getLocation.pending.type]: (state) => {
            state.loading = true;
        },
        [getLocationtList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.locationDeTransports = action.payload;
        },
        [getLocationtList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getLocationtList.pending.type]: (state) => {
            state.loading = true;
        },
        [createLocation.pending.type]: (state) => {
            state.loading = true;
        },
        [createLocation.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createLocation.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteLocation.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteLocation.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteLocation.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteLocation.pending.type]: (state) => {
            state.loading = true;
        },
        [editLocation.fulfilled.type]: (state, action) => {
            state.locationDeTransport = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editLocation.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [updateLocation.pending.type]: (state) => {
            state.loading = true;
        },
        [updateLocation.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.isEditing = false;
            state.locationDeTransport = {};
        },
        [updateLocation.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = locationSlice.actions;