import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { VendorItem } from "../vendor.interface";

/**
 * create a new vendor 
 * @param vendorItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new vendor
 */

export const createVendor = createAsyncThunk(
    "vendor/createVendor",
    async (vendor: VendorItem, thunkAPI) => {
        console.log(vendor);
        try {
            const response = await axios.post("/logistique/vendor", vendor);
            thunkAPI.dispatch(
                enqueueSnackbar({
                    message: 'Vendor created successfully',
                    options: { variant: "succes" },
                })
            );
            return response.data;
        }
        catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error)
            }
            return
        }
    }
);
