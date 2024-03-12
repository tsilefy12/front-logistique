import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { InventaireItem } from "../inventaire.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a inventaire
 * @param data : { id: string, inventaire: InventaireItem } : the id of the inventaire to update and the inventaire data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a inventaire
 */
export const updateInventaire = createAsyncThunk(
  "inventaire/updateInventaire",
  async (
    data: { id: string; inventaire: InventaireItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/logistique/inventaire/${data.id}`,
        data.inventaire
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Registre d'Inventaire updated successfully",
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
