import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted Inventaire data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all Inventaire data
 */
export const getInventaireListe = createAsyncThunk(
    "inventaire/getInventaireListe",
    async (data: { args?: any }, thunkAPI) => {
        try {
        const params = JSON.stringify(data.args);
        const response = await axios.get(
            "/logistique/Inventaire",
            {
                params: { args: params },
            }
        );
        console.log(response.data)
        return response.data;
        } catch (error: any) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error);
        }
        throw error;
        }
    }
);
