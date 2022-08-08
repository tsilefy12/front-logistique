import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { EquipementItem } from "../equipment.interface";

/**
 * Create a new timesheet
 * @param EquipementItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new timesheet
 */
export const createEquipment = createAsyncThunk(
    "equipment/createEquipment",
    async (equipment: EquipementItem, thunkAPI) => {
        try {
            console.log(equipment);
            const response = await axios.post("/logistique/equipment", equipment);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Timesheet created successfully",
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
