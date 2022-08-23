import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { EquipmentItem } from "../equipment.interface";
import { getEmployee } from "./getEmployee";
import { getTypeEquipment } from "./getTypeEquipment";
import { getTypeEquipments } from "./getTypeEquipments";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted timesheet data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all timesheet data
 */
export const getEquipments = createAsyncThunk(
  "materiel/getEquipments",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/logistique/equipment", {
        params: { args: params },
      });
      let newData:any = [];
      if (response.data.length > 0 ) {
        await Promise.all(
          response.data.map(async (cons: EquipmentItem) => {
            const employeeId = cons.ownerId;
            const typ= cons.typeEquipmentId;
            const detailEmployee = await thunkAPI
              .dispatch(getEmployee({ employeeId }))
              .unwrap();
            // const typeEq = await thunkAPI
            //   .dispatch(getTypeEquipment({ typ }))
            //   .unwrap();
            const oneCons = {
              id: cons.id,
              numOptim: cons.numOptim,
              designation: cons.designation,
              additionalInformation: cons.additionalInformation,
              status: cons.status,
              ownerId: cons.ownerId,
              acquisitionDate: cons.acquisitionDate,
              acquisitionValue: cons.acquisitionValue,
              imageUrl: cons.imageUrl,
              type: cons.type,
              applicant: detailEmployee,
            };
            newData.push(oneCons);
          })
        );
		return newData; 
  }
  else {
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
