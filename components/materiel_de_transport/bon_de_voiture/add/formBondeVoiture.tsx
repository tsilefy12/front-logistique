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
import { createActivity, editActivity } from "../../../../redux/features/activity/activitySlice";

const FormBonDeVoiture = () => {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const fetchCarVouchers = useFetchCarVouchers();
    const { id }: any = route.query;
    const [valuesArticle, setValuesArticle] = React.useState < any[]> ([])
    const [ idDelete,setIdDelete] = React.useState < any[]> ([])

    const { isEditing, carVoucher } = useAppSelector((state) => state.carVoucher);
    React.useEffect(() => {
        if (id) {
            dispatch(editCarVoucher({ id }));
            dispatch(editActivity({ id }));
        }
    }, [id]);
  
    const handleSubmit = async (values: any) => {
        try {
            const data = {
                materiel: values.materiel,
                date: new Date(values.date),
                montantTotal : valuesArticle.reduce((acc:any, curr:any) => acc + curr.montants, 0),
                reference: values.reference
            }
            if (isEditing) {
                await dispatch(
                updateCarVoucher({
                    id: carVoucher.id!,
                    carVoucher: values,
                })
                );
            } else {
                const response = await dispatch(createCarVoucher(data));
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
                date: isEditing && carVoucher?.date ? new Date(carVoucher?.date) : new Date(),
                reference: isEditing ? carVoucher?.reference: "",
                activite: "",
                nombre:"",
                pu:"",
                montants:"",
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
