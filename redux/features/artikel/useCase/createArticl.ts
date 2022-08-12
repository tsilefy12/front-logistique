import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { ArticlItem } from "../articl.interface";

/**
 * create a new article
 * @param articlItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new article
 */

export const createArticl = createAsyncThunk(
  "articl/createArticl",
  async (articl: ArticlItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/supply-and-consumable", articl);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "article créé avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if(error.response.data.statusCode== 409) {
          thunkAPI.dispatch(
            enqueueSnackbar({
              message: "Cet article a déjà été enregistré",
              options: { variant: "error" },
            })
          );
        }
        return thunkAPI.rejectWithValue(error);
      }
      return;
    }
  }
);
