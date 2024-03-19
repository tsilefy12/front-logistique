import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
    ArticleBCEInitialState,ArticleBCEItem
} from "./articleBCE.interface";

const initialState: ArticleBCEInitialState = {
    articleBCEs: [],
    articleBCE: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editArticleCommandeExterne = createAsyncThunk(
    "fourniture_consommable/editArticleCommandeExterne",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/article-commande-bce/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createArticleCommandeExterne = createAsyncThunk(
    "fourniture_consommable/createArticleCommandeExterne",
    async (data: ArticleBCEItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/article-commande-bce", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Article BCE créé avec succès",
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
  
export const deleteArticleCommandeExterne = createAsyncThunk(
    "fourniture_consommable/deleteArticleCommandeExterne",
    async (data: { id: string }, thunkAPI) => {
        try {
          const response = await axios.delete(`/logistique/article-commande-bce/${data.id}`);
          thunkAPI.dispatch(
            enqueueSnackbar({
              message: "Article BCE supprimé avec succès",
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

export const getArticleCommandeExternes = createAsyncThunk(
  "fourniture_consommable/getArticleCommandeExternes",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/article-commande-bce/", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const ArticleCommandeExterneSlice = createSlice({
    name: "bce",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.employe = {};
        },
    },
    extraReducers: {
        [getArticleCommandeExternes.pending.type]: (state) => {
            state.loading = true;
        },
        [getArticleCommandeExternes.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articleBCEs = action.payload;
        },
        [getArticleCommandeExternes.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createArticleCommandeExterne.pending.type]: (state) => {
            state.loading = true;
        },
        [createArticleCommandeExterne.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createArticleCommandeExterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteArticleCommandeExterne.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteArticleCommandeExterne.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteArticleCommandeExterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editArticleCommandeExterne.pending.type]: (state) => {
            state.loading = true;
        },
        [editArticleCommandeExterne.fulfilled.type]: (state, action) => {
            state.articleBCE = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editArticleCommandeExterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = ArticleCommandeExterneSlice.actions;