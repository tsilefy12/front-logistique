import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UniteStockInitialState, uniteStockItem } from "./uniteStock.interface";
import { createUniteStock } from "./useCase/uniteStock/createUniteStock";
import { getUniteStocks } from "./useCase/uniteStock/getUniteStock";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";


const uniteStockInitialState: UniteStockInitialState = {
  uniteStocks: [],
  uniteStock: {},
  isEditing: false,
  loading: false,
  error: null,
};
export const editUniteDeStock = createAsyncThunk(
  "stock/editUniteDeStock",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/logistique/unite-stock/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const deleteUniteDeStock = createAsyncThunk(
  "stock/deleteUniteDeStock",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/logistique/unite-stock/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Unité de stock supprimé avec succès",
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

export const updateUniteStock= createAsyncThunk(
  "stock/updateUniteStock",
  async (data: { id: string; unite: uniteStockItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/unite-stock/${data.id}`,
        data.unite
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

export const UniteStockSLice = createSlice({
  name: "uniteStock",
  initialState: uniteStockInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.uniteStock = {};
    },
  },
  extraReducers: {
    // get uniteStock
    [getUniteStocks.pending.type]: (state) => {
      state.loading = true;
    },
    [getUniteStocks.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.uniteStocks = action.payload;
    },
    [getUniteStocks.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
    // create uniteStock
    [createUniteStock.pending.type]: (state) => {
      state.loading = true;
    },
    [createUniteStock.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.uniteStocks.push(action.payload);
    },
    [createUniteStock.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    
    [deleteUniteDeStock.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteUniteDeStock.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteUniteDeStock.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [editUniteDeStock.pending.type]: (state) => {
      state.loading = true;
    },
    [editUniteDeStock.fulfilled.type]: (state, action) => {
      state.uniteStock = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editUniteDeStock.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateUniteStock.pending.type]: (state) => {
      state.loading = true;
    },
    [updateUniteStock.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.uniteStock = {};
    },
    [updateUniteStock.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = UniteStockSLice.actions;
