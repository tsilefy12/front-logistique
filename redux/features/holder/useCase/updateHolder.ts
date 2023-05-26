import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { HolderItem } from "../holder.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a holder
 * @param data : { id: string, holder: HolderItem } : the id of the holder to update and the holder data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a holder
 */
export const updateHolder = createAsyncThunk(
  "holder/updateHolder",
  async (data: { id: string; holder: HolderItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/holder/${data.id}`,
        data.holder
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Detenteur updated successfully",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
