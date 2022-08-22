import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { ConsumptionInvoiceItem } from "../consumptionInvoice.interface";


/**
 * Create a new consumptionInvoice
 * @param ConsumptionInvoiceItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new consumptionInvoice
 */

 export const createConsumptionInvoice = createAsyncThunk(
    "consumption-invoice/createTransportEquipment",
    async (consumptionInvoice: ConsumptionInvoiceItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/consumption-invoice", consumptionInvoice);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Facture de consommation created successfully",
                    options: { variant: "success" },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                if(error.response.data.statusCode == 409){
                    thunkAPI.dispatch(
                        enqueueSnackbar({
                            message: "Facture de consommation a été déja créer",
                            options: { variant: "error" },
                        })
                    );
                }
                return thunkAPI.rejectWithValue(error);
            }
            return error;
        }
    }
);