import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data : { id: string } : the id of the carvoucher to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one carvoucher
 */
export const getCarVoucher = createAsyncThunk(
    "car-voucher/getCarVoucher",
    async (data: { id: string; args?: any }, thunkAPI) => {
        try {
            const response = await axios.get(`/logistique/car-voucher/${data.id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);