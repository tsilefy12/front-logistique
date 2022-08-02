import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { TypeEquipmentItem } from "../typeEquipmentSlice.interface";

export const updateTypeEquipment = createAsyncThunk(
  "typeEquipment/updateTypeEquipment",
  async (data: { id: string; typeEquipment: TypeEquipmentItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/type-equipment/${data.id}`,
        data.typeEquipment
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Type equipement mis à jour avec succès",
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
