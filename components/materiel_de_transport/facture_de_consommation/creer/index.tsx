import React, { useEffect, useState } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
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
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSTextField from "../../../shared/input copy/OSTextField";
import {
  createConsumptionInvoice,
  updateConsumptionInvoice,
} from "../../../../redux/features/consumption_invoice";
import { cancelEdit } from "../../../../redux/features/consumption_invoice/consumptionInvoiceSlice";

const FormFactureConsommation = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const fetchCarVouchers = useFetchCarVouchers();

  const { carvouchers, isEditing, consumptionInvoice } = useAppSelector(
    (state) => state.consumptionInvoice
  );

  const calculateAmount = (values: any) => {
    const { DepartureKilometrage, consommation } = values;
    const amount = DepartureKilometrage * consommation;
    return amount;
  };
  const CalculatedField = (props: any) => {
    const { values }: any = useFormikContext();
    const amount = calculateAmount(values);

    return <OSTextField {...props} value={amount} disabled />;
  };

  React.useEffect(() => {
    fetchCarVouchers();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const amount = values.DepartureKilometrage * values.consommation;
      if (isEditing) {
        await dispatch(
          updateConsumptionInvoice({
            id: consumptionInvoice.id!,
            consumptionInvoice: values,
          })
        );
      } else {
        await dispatch(createConsumptionInvoice({ ...values, amount }));
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
          invoiceNumber: isEditing ? consumptionInvoice?.invoiceNumber : "",
          reason: isEditing ? consumptionInvoice?.reason : "",
          DepartureKilometrage: isEditing
            ? consumptionInvoice?.DepartureKilometrage
            : 0,
          arrivalKilometrage: isEditing
            ? consumptionInvoice?.arrivalKilometrage
            : 0,
          consommation: isEditing ? consumptionInvoice?.consommation : 0,
          SKU: isEditing ? consumptionInvoice?.SKU : "",
          unitPrice: isEditing ? consumptionInvoice?.unitPrice : 0,
          carVoucherId: isEditing ? consumptionInvoice?.carVoucherId : "",
          // amount: isEditing ? consumptionInvoice?.amount : 0,
          amount: isEditing
            ? consumptionInvoice?.amount
            : calculateAmount({
                DepartureKilometrage: isEditing
                  ? consumptionInvoice?.DepartureKilometrage
                  : 0,
                consommation: isEditing ? consumptionInvoice?.consommation : 0,
              }),
        }}
        validationSchema={Yup.object({
          invoiceNumber: Yup.string().required(
            "Veuillez remplir le champ le numéro facture"
          ),
          carVoucherId: Yup.string().required(
            "Veuillez sélectionner un Numéro BV"
          ),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          console.log("valeur", value);
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
                  <Typography variant="h4">
                    {isEditing ? "Modifier" : "Ajouter"} facture de consommation
                  </Typography>
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
                    label="Kilométrage  départ/Arrivé "
                    variant="outlined"
                    name="DepartureKilometrage"
                    type="number"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Kilométrage Consommé"
                    variant="outlined"
                    name="consommation"
                    type="number"
                  />
                </CustomStack>
                {/* <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                > */}
                {/* <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Consommation"
                    variant="outlined"
                    name="consommation"
                    type="number"
                  /> */}
                {/* </CustomStack> */}
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Unité"
                    variant="outlined"
                    name="SKU"
                  />
                  {/* <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Prix unitaire"
                    variant="outlined"
                    name="unitPrice"
                    type="number"
                  /> */}
                  {/* <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Montant"
                    variant="outlined"
                    name="amount"
                    value={amount}
                    type="number"
                  /> */}
                  <CalculatedField
                    fullWidth
                    id="outlined-basic"
                    label="Montant"
                    variant="outlined"
                    name="amount"
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
