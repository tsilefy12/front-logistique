import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { TransportationEquipmentItem } from "../transportationEquipment.interface";

/**
 * Create a new transportationEquipment
 * @param TransportationEquipmentItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new transportationEquipment
 */

 export const createTransportEquipment = createAsyncThunk(
    "transportation-equipment/createTransportEquipment",
    async (transportationEquipment: TransportationEquipmentItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/transportation-equipment", transportationEquipment);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Transportation Equipment created successfully",
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