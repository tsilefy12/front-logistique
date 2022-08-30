import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data : { id: string } : the id of the detenteur to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one detenteur
 * 
 */

 export const getDetenteur = createAsyncThunk(
    "logistique/getDetenteur",
    async (data: { id: string; args?: any }, thunkAPI) => {
      try {
        const params = {
          args: JSON.stringify(data.args),
        };
        const response = await axios.get(`/rh/employee/${data.id}`, {
          params,
        });
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
  );