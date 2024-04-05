import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categorieStockInitialState, categorieStockItem } from "./categorie.interface";
import { createCategorieStock } from "./useCase/categorie/createCategorie";
import { getCategories } from "./useCase/categorie/getCategories";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";


const categorieInitialState: categorieStockInitialState = {
  categorieStocks: [],
  categorieStock: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const editCategorie = createAsyncThunk(
  "categorie/editCategorie",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/logistique/categorie-stock/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const deleteCategorie = createAsyncThunk(
  "Categorie/deleteCategorie",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/categorie-stock/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "categorie supprimé avec succès",
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

export const updateCategorie= createAsyncThunk(
  "categorie/updateCategorie",
  async (data: { id: string; categorie: categorieStockItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/categorie-stock/${data.id}`,
        data.categorie
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
export const categorieStockSlice = createSlice({
  name: "categorieStock",
  initialState: categorieInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.categorieStock = {};
    },
  },
  extraReducers: {
    // get categorieStock
    
    [getCategories.pending.type]: (state) => {
      state.loading = true;
    },
    [getCategories.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.categorieStocks = action.payload;
    },
    [getCategories.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // create categorieStock
    [createCategorieStock.pending.type]: (state) => {
      state.loading = true;
    },
    [createCategorieStock.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.categorieStocks.push(action.payload);
    },
    [createCategorieStock.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteCategorie.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteCategorie.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteCategorie.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editCategorie.pending.type]: (state) => {
      state.loading = true;
    },
    [editCategorie.fulfilled.type]: (state, action) => {
      state.categorieStock = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editCategorie.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateCategorie.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCategorie.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.categorieStock = {};
    },
    [updateCategorie.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = categorieStockSlice.actions;
