import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";

/**
 * @param data : { id: string } : the id of the consumptionInvoice to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one consumptionInvoice
 */
export const getConsumptionInvoice = createAsyncThunk(
    "consumption-invoice/getConsumptionInvoice",
    async (data: { id: string; args?: any }, thunkAPI) => {
        try {
            const params = {
                args: JSON.stringify(data.args),
            };
            const response = await axios.get(`/logistique/consumption-invoice/${data.id}`,{
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