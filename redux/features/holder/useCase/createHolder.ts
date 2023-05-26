import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { HolderItem } from "../holder.interface";

/**
 * create a new holder
 * @param vendorItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new holder
 */

export const createHolder = createAsyncThunk(
  "holder/createHolder",
  async (holder: HolderItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/holder", holder);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Detenteur created successfully",
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
