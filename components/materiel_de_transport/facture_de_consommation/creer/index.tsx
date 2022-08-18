import React from "react";
import Link from "next/link";
import  TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchCarVouchers from "../hooks/useFetchCarVouchers";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSTextField from "../../../shared/input copy/OSTextField";
import { createConsumptionInvoice, updateConsumptionInvoice } from "../../../../redux/features/consumption_invoice";
import { cancelEdit } from "../../../../redux/features/consumption_invoice/consumptionInvoiceSlice";


const FormFactureConsommation = () => {
    const route = useRouter();
	const dispatch = useAppDispatch();
    const fetchCarVouchers = useFetchCarVouchers();

    const { carvouchers, isEditing, consumptionInvoice } = useAppSelector(
		(state) => state.consumptionInvoice
	);

    React.useEffect(() => {
		fetchCarVouchers();
	}, []);


    const handleSubmit = async (values: any) => {
		try {
			if (isEditing) {
				await dispatch(
					updateConsumptionInvoice({
						id: consumptionInvoice.id!,
						consumptionInvoice: values,
					})
				);
			} else {
				await dispatch(createConsumptionInvoice(values));
			}
			route.push("/materiel_de_transport/facture_de_consommation");
		} catch (error) {
			console.log("error", error);
		}
	};

  return (
    <Container maxWidth="xl">
        <Formik
             enableReinitialize
             initialValues={{
                 carVoucherId: isEditing ? consumptionInvoice?.carVoucherId : "",
                 invoiceNumber: isEditing ? consumptionInvoice?.invoiceNumber : "",
                 reason: isEditing ? consumptionInvoice?.reason : "",
                 DepartureKilometrage: isEditing ? consumptionInvoice?.DepartureKilometrage : 0,
                 arrivalKilometrage: isEditing ? consumptionInvoice?.arrivalKilometrage : 0,
                 consommation: isEditing ? consumptionInvoice?.consommation : 0,
                 SKU: isEditing ? consumptionInvoice?.SKU : "",
                 unitPrice: isEditing ? consumptionInvoice?.unitPrice : 0,
                 amount: isEditing ? consumptionInvoice?.amount : 0,
             }}
             validationSchema={Yup.object({
                 carVoucherId: Yup.string().required("Veuillez sélectionner un Numéro BV"),
                 invoiceNumber: Yup.string().required("Veuillez remplir le champ le numéro facture"),
                 reason: Yup.string().required("Veuillez remplir le champ le motif de la course"),
                 DepartureKilometrage: Yup.number().required("Veuillez remplir le champ KM de départ"),
                 arrivalKilometrage: Yup.number().required("Veuillez remplir le champ KM d'arrivé"),
                 consommation: Yup.number().required("Veuillez remplir le champ KM Consommation"),
                 SKU: Yup.string().required("Veuillez remplir le champ KM unité"),
                 unitPrice: Yup.number().required("Veuillez remplir le champ prix unitaire"),
                 amount: Yup.number().required("Veuillez remplir le champ montant"),
             })}
             onSubmit={(value: any, action: any) => {
                 handleSubmit(value);
                 action.resetForm();
             }}
        >
        {(formikProps) => {
            return (
                <Form>
                    <NavigationContainer>
                        <SectionNavigation>
                            <Stack flexDirection={"row"}>
                                <Link href="/materiel_de_transport/facture_de_consommation">
                                <Button 
                                    color="info" 
                                    variant="text" 
                                    startIcon={<ArrowBack />}
                                    onClick={() => {
                                        formikProps.resetForm();
                                        dispatch(cancelEdit());
                                    }}
                                >
                                    Retour
                                </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<Check />}
                                    sx={{ marginInline: 3 }}
                                    type="submit"
                                >
                                    Enregistrer
                                </Button>
                                <Button
                                    variant="text"
                                    color="warning"
                                    size="small"
                                    startIcon={<Close />}
                                    sx={{ marginInline: 3 }}
                                    onClick={() => {
                                        formikProps.resetForm();
                                        dispatch(cancelEdit());
                                    }}
                                >
                                    Annuler
                                </Button>
                            </Stack>
                            <Typography variant="h4">{isEditing ?  "Modifier" : "Ajouter"} facture de consommation</Typography>
                        </SectionNavigation>
                         <Divider />
                    </NavigationContainer>
                    <FormContainer spacing={2}>
                        <CustomStack
                            direction={{ xs: "column", sm: "column", md: "row" }}
                            spacing={{ xs: 2, sm: 2, md: 1 }}
                        >
                            <OSSelectField
                                id="carVoucherId"
                                label="Numéro BV"
                                name="carVoucherId"
                                options={carvouchers}
                                dataKey="number"
                                valueKey="id"
                            />
                             <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Numéro facture"
                                variant="outlined"
                                name="invoiceNumber"
                            />
                        </CustomStack>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label="Motif de la course"
                            variant="outlined"
                            name="reason"
                        />
                        <CustomStack
                            direction={{ xs: "column", sm: "column", md: "row" }}
                            spacing={{ xs: 2, sm: 2, md: 1 }}
                        >
                            <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Kimomètre de départ"
                                variant="outlined"
                                name="DepartureKilometrage"
                                type="number"
                            />
                            <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Kimomètre d'arrivé"
                                variant="outlined"
                                name="arrivalKilometrage"
                                type="number"
                            />
                        </CustomStack>
                        <CustomStack
                            direction={{ xs: "column", sm: "column", md: "row" }}
                            spacing={{ xs: 2, sm: 2, md: 1 }}
                        >
                            <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Consommation"
                                variant="outlined"
                                name="consommation"
                                type="number"
                            />
                            <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Unité"
                                variant="outlined"
                                name="SKU"
                            />
                        </CustomStack>
                        <CustomStack
                            direction={{ xs: "column", sm: "column", md: "row" }}
                            spacing={{ xs: 2, sm: 2, md: 1 }}
                        >
                            <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Prix unitaire"
                                variant="outlined"
                                name="unitPrice"
                                type="number"
                            />
                            <OSTextField
                                fullWidth
                                id="outlined-basic"
                                label="Montant"
                                variant="outlined"
                                name="amount"
                                type="number"
                            />
                        </CustomStack>
                    </FormContainer>
                </Form>
            );
        }}
            
        </Formik>
       
    </Container>
  );
};

export default FormFactureConsommation;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
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
