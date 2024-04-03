import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommandeFournisseurInitialState, CommandeFournisseurItem } from "./bonCommandeFournisseur.interface";
import { axios } from "../../../lib/axios";
import { enqueueSnackbar } from "../notification/notificationSlice";

const initialState:CommandeFournisseurInitialState = {
    commandeFournisseurs: [],
    commandeFournisseur: {},
    isEditing: false,
    loading: false,
    error: null,
};
export const editBonCommandeFournisseur = createAsyncThunk(
    "materiels/editBonCommandeFournisseur",
    async (data: { id: string , args?: any }, thunkAPI) => {
        try {
          
            const params = {
              args: JSON.stringify(data.args),
            };

            const response = await axios.get(`/logistique/bon-de-commande-interne/${data.id}`, { params });
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createBonCommandeFournisseur = createAsyncThunk(
    "materiels/createBonCommandeFournisseur",
    async (data: CommandeFournisseurItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/bon-de-commande-interne", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon de commande fournisseur créé avec succès",
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
  
export const deleteBonCommandeFournisseur = createAsyncThunk(
    "materiels/deleteBonCommandeFournisseur",
    async (data: { id: string }, thunkAPI) => {
      console.log("data.id" + data.id)
      try {
        const response = await axios.delete(`/logistique/bon-de-commande-interne/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Bon de commande fournisseur supprimé avec succès",
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

export const getBonCommandeFournisseurs = createAsyncThunk(
  "materiels/getBonCommandeFournisseurs",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/bon-de-commande-interne", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const getBonCommandeFournisseur = createAsyncThunk(
  "materiels/getBonCommandeFournisseur",
  async (data: { id: string , args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/logistique/bon-de-commande-interne/${data.id}`, { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const updateBonCommandeFournisseur = createAsyncThunk(
  "BonFournisseur/updateBonFournisseur",
  async (data: { id: string; updateData: CommandeFournisseurItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/bon-de-commande-interne/${data.id}`,
        data.updateData
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "mis à jour avec succès",
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

export const BonCommandeFournisseurSlice = createSlice({
    name: "bocCommandeFournisseur",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.commandeFournisseur = {};
        },
    },
    extraReducers: {
        [getBonCommandeFournisseurs.pending.type]: (state) => {
            state.loading = true;
        },
        [getBonCommandeFournisseurs.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.commandeFournisseurs = action.payload;
        },
        [getBonCommandeFournisseurs.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        [getBonCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [getBonCommandeFournisseur.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.commandeFournisseur = action.payload;
        },
        [getBonCommandeFournisseur.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createBonCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },


        [createBonCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [createBonCommandeFournisseur.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createBonCommandeFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteBonCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteBonCommandeFournisseur.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteBonCommandeFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [ editBonCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [editBonCommandeFournisseur.fulfilled.type]: (state, action) => {
            state.commandeFournisseur = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editBonCommandeFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },

        // update bon commande fournisseur
        [updateBonCommandeFournisseur.pending.type]: (state) => {
          state.loading = true;
        },
        [updateBonCommandeFournisseur.fulfilled.type]: (state, action) => {
          state.loading = false;
          state.commandeFournisseur = {};
          state.isEditing = false;
        },
        [updateBonCommandeFournisseur.rejected.type]: (state, action) => {
          state.loading = false;
          state.error = action.error;
        },
    },
});

export const { cancelEdit } = BonCommandeFournisseurSlice.actions;