import {
  Container,
  styled,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import {  Formik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  createCarVoucher,
  editCarVoucher,
  updateCarVoucher,
} from "../../../../redux/features/car-voucher";
import useFetchCarVouchers from "../hooks/useFetchCarVoucher";
import FormBonVoiture from "./bonVoitureForm";
import { createActivity, editActivity, updateActivity } from "../../../../redux/features/activity/activitySlice";

const FormBonDeVoiture = () => {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const fetchCarVouchers = useFetchCarVouchers();
    const { id }: any = route.query;
    const [valuesArticle, setValuesArticle] = React.useState < any[]> ([])
    const [ idDelete,setIdDelete] = React.useState < any[]> ([])

    const { isEditing, carVoucher } = useAppSelector((state) => state.carVoucher);
    const { isEdit, activity } = useAppSelector((state) =>state.activity);
    const [valueActivity, setValueActivity] = React.useState < any[]> ([])
    const handleFech = async (id: any) => {
        try { 
            const Val = await dispatch(editCarVoucher({ id , args:{
                include:{
                    activity:true
                }
            }}));
            console.log(Val)
            setValueActivity((prev:any[])=>{
                console.log(prev)
                prev = Val.payload.activity
                return prev
            })
        } catch (error) {
            console.log("error", error);
        }
    }

    
    React.useEffect(() => {
        if (id) {
        handleFech(id);
        }
    }, [id]);
  
    const handleSubmit = async (values: any) => {
        try {
            const carVoucher = {
                materiel: values.materiel,
                date: new Date(values.date),
                montantTotal : valuesArticle.reduce((acc:any, curr:any) => acc + curr.montants, 0),
                reference: values.reference
            }
            if (isEditing) {
                const response = await dispatch(updateCarVoucher({id, carVoucher}))
                console.log("value article :", valuesArticle)
                if (valueActivity.length > 0) {
                    valueActivity?.forEach((item: any, index: any) =>{
                        const id = item.id
                        if (id) {
                            const activity = {
                                activite:item.activite,
                                nombre:item.nombre,
                                pu:item.pu,
                                montants:item.montants,
                                carVoucherId:response.payload.id
                            };
                            dispatch(updateActivity({id, activity}))
                        }
                    })
                }
            } else {
                const response = await dispatch(createCarVoucher(carVoucher));
                valuesArticle.forEach((element:any, index:any) => {
                    const newData = {
                        activite: element.activite,
                        nombre: element.nombre,
                        pu: element.pu,
                        montants:element.nombre * element.pu,
                        carVoucherId: response.payload.id
                    };
                    dispatch(createActivity(newData));
                });
            }
            fetchCarVouchers()
            route.push("/materiel_de_transport/bon_de_voiture");
        } catch (error) {
        console.log("error", error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
        <Formik
            enableReinitialize = {isEditing ? true : false}
            initialValues={{
                materiel: isEditing ? carVoucher?.materiel : "",
                date: isEditing ? carVoucher?.date : new Date(),
                reference: isEditing ? carVoucher?.reference: "",
                activite:isEdit ? activity?.activite: "",
                nombre:isEdit ? activity?.nombre :"",
                pu:isEdit ? activity?.pu:"",
                montants:isEdit ? activity?.montants: "",
                quantite:""

            }}
            validationSchema={Yup.object({
                materiel: Yup.string().required("Veuillez remplir le champ matériel"),
                date: Yup.string().required(
                    "Veuillez remplir le champ date"
                ),
                reference: Yup.string().required("Veuillez remplir le champ référence"),
            })}
            onSubmit={(value: any, action: any) => {
                handleSubmit(value);
                action.resetForm();
            }}
        >
            {(formikProps) => <FormBonVoiture setIdDelete={setIdDelete} formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle} />}
        </Formik>
        </Container>
    );
};

export default FormBonDeVoiture;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));
