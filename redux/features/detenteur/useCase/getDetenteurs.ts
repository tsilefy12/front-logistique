import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted detenteur data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all detenteur data
 */

 export const getDetenteurs = createAsyncThunk(
    "logistique/getDetenteurs",
    async (data: { args?: any }, thunkAPI) => {
      try {
        const params = {
          args: JSON.stringify(data.args),
        };
        console.log(params);
        const response = await axios.get("/rh/employee", { params });
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
  );