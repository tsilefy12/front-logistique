import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { EquipmentItem } from "../equipment.interface";

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
    async (equipment: EquipmentItem, thunkAPI) => {
        try {
            console.log(equipment);
            const response = await axios.post("/logistique/equipment", equipment);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Equipment created successfully",
                    options: { variant: "success" },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.log(error.response)
                thunkAPI.dispatch(
                    enqueueSnackbar({
                        message: "Equipment not created",
                        options: { variant: "error" },
                    })
                );
                return thunkAPI.rejectWithValue(error);
               
            }
            return error;
        }
    }
);
