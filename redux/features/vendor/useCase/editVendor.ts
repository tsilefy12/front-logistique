import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to get vendor data
 */
export const editVendor = createAsyncThunk(
    "vendor/editVendor",
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/vendor/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);
