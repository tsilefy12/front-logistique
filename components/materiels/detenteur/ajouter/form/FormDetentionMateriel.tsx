import {
  Container,
  styled,
  Stack
} from "@mui/material";
import React, {  useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import {
  createHolder,
  updateHolder,
} from "../../../../../redux/features/holder";
import { Formik } from "formik";
import { cancelEdit } from "../../../../../redux/features/holder/holderSlice";
import FormDetenteur from "./formDetenteur";
import { createHolderEquipement } from "../../../../../redux/features/holder/holderEquipementSlice";
import { updateEquipment } from "../../../../../redux/features/equipment";

const FormDetentionMateriel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isEditing, holder } = useAppSelector((state) => state.holder);
    const [valuesArticle, setValuesArticle] = useState < any[]> ([])

    const handleSubmit = async (values: any) => {
        try {
        if (isEditing) {
          const response =  await dispatch(updateHolder({id: holder.id!,holder: values,}));
          if (valuesArticle.length > 0) {
            valuesArticle?.forEach((item: any, index: any) =>{
                const id = item.id
                console.log("id :", id)
                if (id) {
                    const equipment = {
                        numOptim:item.numOptim,
                        designation:item.designation,
                        acquisitionDate:item.acquisitionDate,
                        acquisitionValue:item.acquisitionValue,
                        holderId: response.payload.id!
                    };
                    dispatch(updateEquipment({id, equipment}))
                }
            })
        }
        } else {
            const newDataHolder = {
                reference: values.reference,
                contact: values.contact,
                name:values.name,
                type:values.type,
                matricule: values.matricule,
                function: values.function,
            }
            const response = await dispatch(createHolder(newDataHolder));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    equipmentId: element.equipmentId,
                    holderId: response.payload.id
                };
                dispatch(createHolderEquipement(newData))
            })
        }
        router.push("/materiels/detenteur");
        } catch (error) {
        console.log("error", error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
            <Formik
                enableReinitialize = { isEditing ? true :false }
                initialValues={
                    {
                        numOptim:  isEditing ? holder?.id: "",
                        contact: isEditing ? holder?.contact: "",
                        reference: isEditing ? holder?.reference: "",
                        name: isEditing ? holder?.name:"",
                        matricule: isEditing ? holder?.matricule :"",
                        function: isEditing ? holder?.function : "",
                        type:isEditing ? holder?.type : "",
                    }
                }
                validationSchema={Yup.object({
                    contact: Yup.string().required("Champ obligatoire"),
                    reference: Yup.string().required("Champ obligatoire"),
                    name: Yup.string().required("champ obligatoire"),
                    matricule: Yup.string().required("Champ obligatoire"),
                    function: Yup.string().required("Champ obligatoire"),
                })}
                onSubmit={(value: any, action: any) => {
                    handleSubmit(value);
                    action.resetForm();
                }}
            >
                {(formikProps) => <FormDetenteur formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle}/>}
            </Formik>
        </Container>
    );
};

export default FormDetentionMateriel;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));


  