import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { axios } from "../../../lib/axios";

import {
    ArticleCommandeInitialState,ArticleCommandeItem
} from "./articleCommande.interface";

const initialState: ArticleCommandeInitialState = {
    articleCommandeInternes: [],
    articleCommandeInterne: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editArticleCommandeInterne = createAsyncThunk(
    "fourniture_consommable/editArticleCommandeInterne",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/article-commande/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createArticleCommandeInterne = createAsyncThunk(
    "fourniture_consommable/createArticleCommandeInterne",
    async (data: ArticleCommandeItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/article-commande", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Article BCI créé avec succès",
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
  
export const deleteArticleCommandeInterne = createAsyncThunk(
    "fourniture_consommable/deleteArticleCommandeInterne",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/logistique/article-commande/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Article BCI supprimé avec succès",
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

export const getArticleCommandeInternes = createAsyncThunk(
  "fourniture_consommable/getArticleCommandeInternes",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/logistique/article-commande/", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const ArticleCommandeInterneSlice = createSlice({
    name: "employe",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
        state.isEditing = false;
        state.employe = {};
        },
    },
    extraReducers: {
        [getArticleCommandeInternes.pending.type]: (state) => {
            state.loading = true;
        },
        [getArticleCommandeInternes.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articleCommandeInternes = action.payload;
        },
        [getArticleCommandeInternes.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [createArticleCommandeInterne.pending.type]: (state) => {
            state.loading = true;
        },
        [createArticleCommandeInterne.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createArticleCommandeInterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [deleteArticleCommandeInterne.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteArticleCommandeInterne.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteArticleCommandeInterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
        [editArticleCommandeInterne.pending.type]: (state) => {
            state.loading = true;
        },
        [editArticleCommandeInterne.fulfilled.type]: (state, action) => {
            state.articleCommandeInterne = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editArticleCommandeInterne.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },
    },
});

export const { cancelEdit } = ArticleCommandeInterneSlice.actions;