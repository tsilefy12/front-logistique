import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
   articleTransfertInitialState,articleTransfertItem
} from "./articleTransfert.interface";

const initialState: articleTransfertInitialState = {
    articleTransferts: [],
    articleTransfert: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editArticleTransfert = createAsyncThunk(
    "fourniture_consommable/editArticleTransfert",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/article-transfert/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createArticleTransfert = createAsyncThunk(
    "fourniture_consommable/createArticleTransfert",
    async (data: articleTransfertItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/article-transfert", data);
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
);
  
export const deleteArticleTransfert = createAsyncThunk(
    "fourniture_consommable/deleteArticleTransfert",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/article-transfert/${data.id}`);
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
);

export const getArticleTransferts = createAsyncThunk(
  "fourniture_consommable/getArticleTransferts",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/article-transfert", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const updateArticleTransfert = createAsyncThunk(
  "ArticleTransfert/updateArticleTransfert",
  async (data: { id: string; updateData: articleTransfertItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/article-transfert/${data.id}`,
        data.updateData
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

export const ArticleTransfertSlice = createSlice({
    name: "articleTransfert",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
          state.isEditing = false;
          state.articleTransfert = {};
        },
    },
    extraReducers: {
        [getArticleTransferts.pending.type]: (state) => {
            state.loading = true;
        },
        [getArticleTransferts.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articleTransfert = action.payload;
        },
        [getArticleTransferts.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createArticleTransfert.pending.type]: (state) => {
            state.loading = true;
        },
        [createArticleTransfert.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createArticleTransfert.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteArticleTransfert.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteArticleTransfert.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteArticleTransfert.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editArticleTransfert.pending.type]: (state) => {
            state.loading = true;
        },
        [editArticleTransfert.fulfilled.type]: (state, action) => {
            state.articleTransferts = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editArticleTransfert.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },

        // update article de bon de transfert
        [updateArticleTransfert.pending.type]: (state) => {
          state.loading = true;
        },
        [updateArticleTransfert.fulfilled.type]: (state, action) => {
          state.loading = false;
          state.articleTransfert = {};
          state.isEditing = false;
        },
        [updateArticleTransfert.rejected.type]: (state, action) => {
          state.loading = false;
          state.error = action.error;
        },
    },
});

export const { cancelEdit } = ArticleTransfertSlice.actions;