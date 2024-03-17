import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { InventaireItem } from "../inventaire.interface";

/**
 * create a new inventaire
 * @param InventaireItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new inventaire
 */

export const createInventaire = createAsyncThunk(
    "inventaire/createInventaire",
    async (inventaire: InventaireItem, thunkAPI) => {
        try {
        const response = await axios.post(
            "/logistique/Inventaire",
            inventaire
        );
        thunkAPI.dispatch(
            enqueueSnackbar({
            message: "Registre d'inventaire créé avec succès",
            options: { variant: "success" },
            })
        );
        return response.data;
        } catch (error: any) {
        if (error.response) {
            if (error.response.data.statusCode == 409) {
            thunkAPI.dispatch(
                enqueueSnackbar({
                message: "Cet Registre d'inventaire a déjà été enregistré",
                options: { variant: "error" },
                })
            );
            }
            return thunkAPI.rejectWithValue(error);
        }
        return;
        }
    }
);
