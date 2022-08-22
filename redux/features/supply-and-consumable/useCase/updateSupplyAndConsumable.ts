import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { ArticlItem } from "../supply-and-consumable.interface";
import { axios } from "../../../../lib/axios";

/**
 * update a vendor 
 * @param data : { id: string, article: ArticleItem } : the id of the article to update and the article data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a article
 */
export const updateArticl = createAsyncThunk(
	"articl/updateArticl",
	async (data: { id: string; articl: ArticlItem }, thunkAPI) => {
		try {
			const response = await axios.patch(
				`/logistique/supply-and-consumable/${data.id}`,
				data.articl
			);
			thunkAPI.dispatch(
				enqueueSnackbar({
					message: "Article updated successfully",
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
