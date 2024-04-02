import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { EquipmentItem } from "../equipment.interface";
import { getEmployee } from "./getEmployee";

export const getEquipments = createAsyncThunk(
  "materiel/getEquipments",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/logistique/equipment", {
        params: { args: params },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
