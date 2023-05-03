import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { getEmployee } from "./getEmployee";
import { ConsumableItem } from "../OrderSupplyAndConsumable.interface";
import { getSuplyAndConsumable } from "./getSupplyAndConsumable";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted consumable data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all Consumable data
 */
export const getConsumables = createAsyncThunk(
  "consumable/getConsumables",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get(
        "/logistique/order-supply-and-consumable",
        {
          params: { args: params },
        }
      );
      let newData: any = [];
      if (response.data.length > 0) {
        await Promise.all(
          response.data.map(async (cons: ConsumableItem) => {
            const employeeId = cons.applicantId;
            const detailEmployee = await thunkAPI
              .dispatch(getEmployee({ employeeId }))
              .unwrap();
            const oneCons = {
              id: cons.id,
              item: cons.item,
              applicantId: cons.requestedQuantity,
              requestedQuantity: cons.requestedQuantity,
              deliveredQuantity: cons.deliveredQuantity,
              deliveryDate: cons.deliveryDate,
              status: cons.status,
              applicant: detailEmployee,
            };
            newData.push(oneCons);
          })
        );
        return newData;
      } else {
        return response.data;
      }
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
