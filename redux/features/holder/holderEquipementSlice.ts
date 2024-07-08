import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HolderEquipementInitialState, HolderEquipementItem } from "./holderEquipement.interface";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";


const holderEquipmentInitialState: HolderEquipementInitialState = {
  holderEquipementListe: [],
  holderEquipement: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const createHolderEquipement = createAsyncThunk(
    "holder/createHolderEquipement",
    async (holder: HolderEquipementItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/holder-equipment", holder);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Matériel créer avec succès",
            options: { variant: "success" },
          })
        );
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        return;
      }
    }
);
export const holderEquipementSlice = createSlice({
  name: "holderEquipement",
  initialState: holderEquipmentInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.holderEquipement = {};
    },
  },
  extraReducers: {

    // create holder equipment
    [createHolderEquipement.pending.type]: (state) => {
      state.loading = true;
    },
    [createHolderEquipement.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.holderEquipementListe.push(action.payload);
    },
    [createHolderEquipement.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  },
});

export const { cancelEdit } = holderEquipementSlice.actions;
