import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { PassengerItem } from "../passengerSlice.interface";

export const updatePassenger = createAsyncThunk(
  "passenger/updatePassenger",
  async (data: { id: string; passenger: PassengerItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/logistique/passenger/${data.id}`,
        data.passenger
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Etat materiel mis à jour avec succès",
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
