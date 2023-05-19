import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { EquipmentItem } from "../equipment.interface";
import { axios } from "../../../../lib/axios";

export const updateEquipment = createAsyncThunk(
  "Equipment/updateEquipment",
  async (data: { id: string; equipment: EquipmentItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/equipment/${data.id}`,
        data.equipment
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Equipment updated successfully",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Equipment not updated",
            options: { variant: "error" },
          })
        );
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
