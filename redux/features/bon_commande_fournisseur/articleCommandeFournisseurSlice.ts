import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../../lib/axios";
import { enqueueSnackbar } from "../notification/notificationSlice";
import { ArticleCommandeFournisseurInitialState, ArticleCommandeFournisseurItem } from "./articleCommandeFournisseur.interfae";

const initialState: ArticleCommandeFournisseurInitialState = {
    articleCommandeVendors: [],
    articleCommandeVendor: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const editArticleCommandeFournisseur = createAsyncThunk(
    "materiels/editArticleCommandeFournisseur",
    async (data: { id: string , args?: any }, thunkAPI) => {
        try {
          
            const params = {
              args: JSON.stringify(data.args),
            };

            const response = await axios.get(`/logistique/article-fournisseur${data.id}`, { params });
            return response.data;
        } catch (error: any) {
            if (error.response) {
            return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);

export const createArticleCommandeFournisseur = createAsyncThunk(
    "materiels/createArticleCommandeFournisseur",
    async (data: ArticleCommandeFournisseurItem, thunkAPI) => {
      try {
        const response = await axios.post("/logistique/article-fournisseur", data);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Article de commande fournisseur créé avec succès",
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
  
export const deleteArticleCommandeFournisseur = createAsyncThunk(
    "materiels/deleteArticleCommandeFournisseur",
    async (data: { id: string }, thunkAPI) => {
      console.log("data.id" + data.id)
      try {
        const response = await axios.delete(`/logistique/article-fournisseur/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Artcile de commande fournisseur supprimé avec succès",
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

export const getArticleCommandeFournisseurs = createAsyncThunk(
  "materiels/getArticleCommandeFournisseurs",
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

export const getArticleCommandeFournisseur = createAsyncThunk(
  "materiels/getArticleCommandeFournisseur",
  async (data: { id: string , args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/logistique/article-fournisseur${data.id}`, { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const updateArticleCommandeFournisseur = createAsyncThunk(
  "BonFournisseur/updateArticleCommandeFournisseur",
  async (data: { id: string; updateData: ArticleCommandeFournisseurItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/article-fournisseur${data.id}`,
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

export const ArticleCommandeFournisseurSlice = createSlice({
    name: "articleCommandeFournisseur",
    initialState: initialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.articleCommandeVendor = {};
        },
    },
    extraReducers: {
        [getArticleCommandeFournisseurs.pending.type]: (state) => {
            state.loading = true;
        },
        [getArticleCommandeFournisseurs.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articleCommandeVendors = action.payload;
        },
        [getArticleCommandeFournisseurs.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        [getArticleCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [getArticleCommandeFournisseur.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articleCommandeVendor = action.payload;
        },
        [getArticleCommandeFournisseur.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

       
        [createArticleCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [createArticleCommandeFournisseur.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [createArticleCommandeFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },

        [deleteArticleCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteArticleCommandeFournisseur.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteArticleCommandeFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },

        [ editArticleCommandeFournisseur.pending.type]: (state) => {
            state.loading = true;
        },
        [editArticleCommandeFournisseur.fulfilled.type]: (state, action) => {
            state.articleCommandeVendor = action.payload;
            state.loading = false;
            state.isEditing = true;
        },
        [editArticleCommandeFournisseur.rejected.type]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        },

        // update article commande fournisseur
        [updateArticleCommandeFournisseur.pending.type]: (state) => {
          state.loading = true;
        },
        [updateArticleCommandeFournisseur.fulfilled.type]: (state, action) => {
          state.loading = false;
          state.articleCommandeVendor = {};
          state.isEditing = false;
        },
        [updateArticleCommandeFournisseur.rejected.type]: (state, action) => {
          state.loading = false;
          state.error = action.error;
        },
    },
});

export const { cancelEdit } = ArticleCommandeFournisseurSlice.actions;