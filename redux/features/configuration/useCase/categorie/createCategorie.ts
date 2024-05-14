import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../../lib/axios";
import { enqueueSnackbar } from "../../../notification/notificationSlice";
import { categorieStockItem } from "../../categorie.interface";

/**
 * Create a new timesheet
 * @param sategorieStockItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new timesheet
 */
export const createCategorieStock = createAsyncThunk(
    "categorie/createCategorie",
    async (categorie: categorieStockItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/categorie-stock", categorie);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "categorie stock créer avec succès",
                    options: { variant: "success" },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                thunkAPI.dispatch(
                    enqueueSnackbar({
                        message: "categorie non créer",
                        options: { variant: "error" },
                    })
                );
                return thunkAPI.rejectWithValue(error);
               
            }
            return error;
        }
    }
);
