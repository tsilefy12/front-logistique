import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { CarVoucherItem } from "../carVoucher.interface";

/**
 * Create a new carvoucher
 * @param CarVoucherItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new carvoucher
 */

 export const createCarVoucher = createAsyncThunk(
    "car-voucher/createCarVoucher",
    async (carVoucher: CarVoucherItem, thunkAPI) => {
        try {
            const response = await axios.post("/logistique/car-voucher", carVoucher);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: "Car voucher created successfully",
                    options: { variant: "success" },
                })
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                if(error.response.data.statusCode == 409){
                    thunkAPI.dispatch(
                        enqueueSnackbar({
                            message: "Cet bon de commande a déjà été enregistré",
                            options: { variant: "error" },
                        })
                    );
                }
                /*if(error.response.data.statusCode == 400){
                    thunkAPI.dispatch(
                        enqueueSnackbar({
                            message: "La quantity doit être supérieur à 0",
                            options: { variant: "error" },
                        })
                    );
                }*/
                return thunkAPI.rejectWithValue(error);
            }
            return error;
        }
    }
);