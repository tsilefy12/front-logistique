import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../lib/axios";
import { OrderEquipmentItem } from "../orderEquipmentSlice.interface";
import { getEmployee } from "./getEmployee";


/**
 * @param data: { args?: any } : PRISMA arguments to filter getted orderEquipement data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all orderEquipement data
 */
export const getOrderEquipmentList = createAsyncThunk(
	"orderEquipment/getOrderEquipmentList",
	async (data: { args?: any }, thunkAPI) => {
		try {
			const params = JSON.stringify(data.args);
			const response = await axios.get("/logistique/order-equipment", {
				params: { args: params },
			});
			let newData:any = [];
      if (response.data.length > 0 ) {
        await Promise.all(
          response.data.map(async (cons: OrderEquipmentItem) => {
            const employeeId = cons.applicantId;
            const detailEmployee = await thunkAPI
              .dispatch(getEmployee({ employeeId }))
              .unwrap();
            const oneCons = {
              id: cons.id,
              designation: cons.designation,
              applicantId: cons.applicantId,
              reason: cons.reason,
              deadlineOfReception: cons.deadlineOfReception,
              numberOfAuthorisedOffersPossible: cons.numberOfAuthorisedOffersPossible,
              status: cons.status,
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
