import { createSlice } from "@reduxjs/toolkit";
import { ArticlInitialState } from "./articl.interface";
import { createArticl } from "./useCase/createArticl";
import { deleteArticl } from "./useCase/deleteArticl";
import { getArticl } from "./useCase/getArticl";
import { getArticls } from "./useCase/getArticls";
import { updateArticl } from "./useCase/updateArticl";


const articlInitialState: ArticlInitialState = {
    articls: [],
    articl: {},
    isEditing: false,
    loading: false,
    error: null,
}
 export const articlSlice = createSlice({
    name: "article",
    initialState: articlInitialState,
    reducers: {
        cancelEdit: (state) => {
            state.isEditing = false;
            state.articl = {};
        },
    },
    extraReducers: {
        // get article 
        [getArticl.pending.type]: (state) => {
            state.loading = true;
        },
        [getArticl.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articl = action.payload;
        },
        [getArticl.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // get articles
        [getArticls.pending.type]: (state) => {
            state.loading = true;
        },
        [getArticls.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articls = action.payload;
        },
        [getArticls.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // create article
        [createArticl.pending.type]: (state) => {
            state.loading = true;
        },
        [createArticl.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articls.push(action.payload);
        },
        [createArticl.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // update article
        [updateArticl.pending.type]: (state) => {
            state.loading = true;
        },
        [updateArticl.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.articl = {};
            state.isEditing = false;
        },
        [updateArticl.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // delete article 
        [deleteArticl.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteArticl.fulfilled.type]: (state) => {
            state.loading = false;
        },
        [deleteArticl.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    },
});

export const { cancelEdit } = articlSlice.actions;