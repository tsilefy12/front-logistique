import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data : { id: string } : the id of the article to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one article
 */
export const getArticl = createAsyncThunk(
    "articl/getArticl",
    async (data: { id: string; args?: any }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/supply-and-consumable/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);
