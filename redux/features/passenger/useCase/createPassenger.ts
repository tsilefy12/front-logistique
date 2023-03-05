import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { PassengerItem } from "../passengerSlice.interface";

export const createPassenger = createAsyncThunk(
  "passenger/createPassenger",
  async (data: PassengerItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/passenger", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Etat materiel créé avec succès",
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
