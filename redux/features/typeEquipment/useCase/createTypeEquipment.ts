import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { TypeEquipmentItem } from "../typeEquipmentSlice.interface";

export const createTypeEquipment = createAsyncThunk(
  "typeEquipment/createTypeEquipment",
  async (data: TypeEquipmentItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/type-equipment", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Type equipement créé avec succès",
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
