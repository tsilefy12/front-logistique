import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransportationEquipmentItem } from "../transportationEquipment.interface";
import { axios } from "../../../../../lib/axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";

/**
 * update a transportationEquipment
 * @param data : { id: string, transportationEquipment: TransportationEquipmentItem } : the id of the timesheet to update and the timesheet data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a transportationEquipment
 */

export const updateTransportationEquipment = createAsyncThunk(
  "transportation-equipment/updateTransportationEquipment",
  async (
    data: { id: string; transportationEquipment: TransportationEquipmentItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/transportation-equipment/${data.id}`,
        data.transportationEquipment
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Transportation Equipment updated successfully",
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
