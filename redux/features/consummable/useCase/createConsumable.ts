import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { ConsumableItem } from "../consumable.interface";

/**
 * create a new Consumable
 * @param consumableItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new consumable
 */

export const createConsumable = createAsyncThunk(
  "consumable/createConsumable",
  async (consumable: ConsumableItem, thunkAPI) => {
    try {
      const response = await axios.post("/logistique/order-supply-and-consumable", consumable);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "commande créé avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if(error.response.data.statusCode== 409) {
          thunkAPI.dispatch(
            enqueueSnackbar({
              message: "Cet commande a déjà été enregistré",
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
