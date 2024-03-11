import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { Stack, styled } from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextField from "../../shared/input copy/OSTextField";

import {
  createSuplyAndConsumable,
  updateSuplyAndConsumable,
} from "../../../redux/features/supply-and-consumable";
import { cancelEdit } from "../../../redux/features/supply-and-consumable/supply-and-consumable";
import OSSelectField from "../../shared/select/OSSelectField";

export default function SuplyAndConsumableForm() {
  const route = useRouter();

  const dispatch = useAppDispatch();

  const { isEditing, suplyAndConsumable } = useAppSelector(
    (state) => state.suplyAndConsumable
  );

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateSuplyAndConsumable({
            id: suplyAndConsumable.id!,
            suplyAndConsumable: values,
          })
        );
      } else {
        await dispatch(createSuplyAndConsumable(values));
      }
      route.push("/fournitures_et_consommables/fiche_de_stock");
    } catch (error) {
      console.log("error", error);
    }
  };
  const GrantList = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" }
  ];
  const FounisseurList = [
    { id: "1", name: "1"},
    { id: "2", name: "2"},
    { id: "3", name: "3"},
    { id: "4", name: "4"}
  ];

  const UniteList = [
    { id: "1", name: "1"},
    { id: "2", name: "2"},
    { id: "3", name: "3"},
    { id: "4", name: "4"},
    { id: "5", name: "5"}
  ];
 const CategoryList = [
    { id: "1", name: "1"},
    { id: "2", name: "2"},
    { id: "3", name: "3"},
    { id: "4", name: "4"},
    { id: "5", name: "5"},
    { id: "6", name: "6"}
 ];
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? suplyAndConsumable
            : {
              designation: isEditing ? suplyAndConsumable?.designation : "",
              quantity: isEditing ? suplyAndConsumable?.quantity : "",
              unitPrice: isEditing ? suplyAndConsumable?.unitPrice : "",
              SKU: isEditing ? suplyAndConsumable?.SKU : "",
            }
        }
        validationSchema={Yup.object({
          designation: Yup.string().required("Champ obligatoire"),
          unitPrice: Yup.number().required("champ obligatoire"),
          quantity: Yup.number().required("Champ obligatoire"),
          SKU: Yup.string(),
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
                    <Link href="/fournitures_et_consommables/fiche_de_stock">
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
                      sx={{ marginInline: 2 }}
                      type="submit"
                    >
                      Enregistrer
                    </Button>

                    <Button
                      variant="text"
                      color="warning"
                      size="small"
                      startIcon={<Close />}
                      onClick={() => {
                        formikProps.resetForm();
                        dispatch(cancelEdit());
                      }}
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h4">
                    {isEditing ? "Modifier" : "Ajouter"} Fiche de Stock
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>

              <FormContainer spacing={2}>
                <OSTextField
                  id="outlined-basic"
                  label="Désignation"
                  name="designation"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Quantite"
                  name="quantity"
                  type="number"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Prix Unitaire"
                  name="unitPrice"
                  type="number"
                />
                <OSSelectField
                  id="outlined-basic"
                  label="Unité de stock"
                  name="unite"
                  options={UniteList}
                  dataKey="name"
                  valueKey="name"
                  type="text"
                />
                <Stack direction="row" spacing={3}>
                <OSTextField
                    id="outlined-basic"
                    label="Montant"
                    name="montant"
                    type="number"
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Seuil"
                    name="seuil"
                    type="number"
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Mois de prevision"
                    name="moisPrevision"
                    type="text"
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <OSSelectField
                    id="outlined-basic"
                    label="Fournisseur"
                    name="fournisseur"
                    options={FounisseurList}
                    dataKey="name"
                    valueKey="name"
                    type="text"
                  />
                     <OSSelectField
                    id="outlined-basic"
                    label="Catégorie"
                    name="categorie"
                    options={CategoryList}
                    dataKey="name"
                    valueKey="name"
                    type="text"
                  />
                     <OSSelectField
                    id="outlined-basic"
                    label="Grant"
                    name="grant"
                    options={GrantList}
                    dataKey="name"
                    valueKey="name"
                    type="text"
                  />
                </Stack>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

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
