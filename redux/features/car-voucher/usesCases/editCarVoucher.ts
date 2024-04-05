import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to get carvoucher data
 */
export const editCarVoucher = createAsyncThunk(
    "car-voucher/editCarVoucher",
    async (data: { id: string, args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
              };
            const response = await axios.get(`/logistique/car-voucher/${data.id}`, {params});
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error);
            }
            throw error;
        }
    }
);