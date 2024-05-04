import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../../lib/axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";
import { typeProduitItem } from "../../typeProduit.interface";

/**
 * Create a new timesheet
 * @param sategorieStockItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new timesheet
 */
export const createTypeProduit = createAsyncThunk(
    "typeProduit/createTypeProduit",
    async (typeProduit: typeProduitItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/type-produit", typeProduit);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "typeProduit créer avec succès",
                    options: { variant: "success" },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                thunkAPI.dispatch(
                    enqueueSnackbar({
                        message: "typeProduit non créer",
                        options: { variant: "error" },
                    })
                );
                return thunkAPI.rejectWithValue(error);
               
            }
            return error;
        }
    }
);
