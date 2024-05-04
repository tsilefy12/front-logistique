import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../../lib/axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";
import { uniteStockItem } from "../../uniteStock.interface";

/**
 * Create a new timesheet
 * @param createUniteStock
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new timesheet
 */
export const createUniteStock = createAsyncThunk(
    "typeProduit/createTypeProduit",
    async (uniteStockItem: uniteStockItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/unite-stock", uniteStockItem);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "unité de stock créer avec succès",
                    options: { variant: "success" },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                thunkAPI.dispatch(
                    enqueueSnackbar({
                        message: "unité de stock non créer",
                        options: { variant: "error" },
                    })
                );
                return thunkAPI.rejectWithValue(error);
               
            }
            return error;
        }
    }
);
