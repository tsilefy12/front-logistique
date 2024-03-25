import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";

import { axios } from "../../../lib/axios";
import { MissionTranportItem, MissionTransportInitialState } from "./missionTransport.interface";

const initialState: MissionTransportInitialState = {
    missionTransports: [],
    missionTransport: {},
    isEditing: false,
    loading: false,
    error: null
};

export const editMissionDeTransport = createAsyncThunk(
    "mission_transport/editMissionTransport",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/mission-de-transport/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createMissionDeTransport = createAsyncThunk(
    "mission_transport/createMissionDeTransport",
    async (data: MissionTranportItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/mission-de-transport", data);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Mission de transport créé avec succès",
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

export const deleteMissionDeTransport = createAsyncThunk(
    "mission_transport/deleteMissionDeTransport",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.delete(`/logistique/mission-de-transport/${data.id}`);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Mission de transport supprimée avec succès",
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

export const getMissionDeTransportList = createAsyncThunk(
    "mission_transport/getMissionDaTransportList",
    async (data: { args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get("/logistique/mission-de-transport", { params });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);
export const getMissionDeTransport = createAsyncThunk(
    "mission_transport/getMissionDaTranspor",
    async (data: { id: string, args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get(`/logistique/mission-de-transport/${data.id}`, { params });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);
export const updateMissionDeTransport = createAsyncThunk(
    "mission_transport/updateMissionDeTransport",
    async (data: { id: string, mission: MissionTranportItem }, thunkAPI) => {
        try {
            const response = await axios.patch(`/logistique/mission-de-transport/${data.id}`, data.mission);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Mission de transport mise à jour avec succès",
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

export const missionTransportSlice = createSlice({
    name: "missonTransport",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.missionTransport = {};
        },
    },
    extraReducers: {
        [getMissionDeTransport.pending.type]: (state) => {
            state.loading = true;
        },
        [getMissionDeTransportList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.missionTransports = action.payload;
        },
        [getMissionDeTransportList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMissionDeTransportList.pending.type]: (state) => {
            state.loading = true;
        },
        [getMissionDeTransport.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.missionTransport = action.payload;
        },
        [getMissionDeTransport.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createMissionDeTransport.pending.type]: (state) => {
            state.loading = true;
        },
        [createMissionDeTransport.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createMissionDeTransport.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteMissionDeTransport.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteMissionDeTransport.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteMissionDeTransport.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteMissionDeTransport.pending.type]: (state) => {
            state.loading = true;
        },
        [editMissionDeTransport.fulfilled.type]: (state, action) => {
            state.missionTransport = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editMissionDeTransport.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [updateMissionDeTransport.pending.type]: (state) => {
            state.loading = true;
        },
        [updateMissionDeTransport.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.isEditing = false;
            state.missionTransport = {};
        },
        [updateMissionDeTransport.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = missionTransportSlice.actions;