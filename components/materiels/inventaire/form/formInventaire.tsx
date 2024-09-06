import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close, Save } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { createInventaire } from "../../../../redux/features/inventaire";
import { useRouter } from "next/router";
import { cancelEdit } from "../../../../redux/features/equipment/equipmentSlice";
import useFetchEquipment from "../../informatique/hooks/useFetchEquipment";

const AddInventaireForm = () => {
  const dispatch: any = useAppDispatch();

  const route = useRouter();
  const { id } = route.query;
  const { isEditing, equipment, equipments } = useAppSelector(
    (state) => state.equipment
  );
  const fetchEquipment = useFetchEquipment();
  const [etat, setEtat] = useState<any>("");

  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    setEtat(equipments.find((e: any) => e.id == id)?.status);
  }, [equipments]);
  const dureAmortissement =
    isEditing && equipment?.type ? equipment.type.dureAmortissement : null;
  const acquisitionValue = isEditing ? equipment?.acquisitionValue : null;
  const handleSubmit = async (values: any) => {
    values.etatMateriel = etat;
    try {
      if (isEditing) {
        values.valeurInventaire =
          dureAmortissement && acquisitionValue
            ? values.dureDeVie > dureAmortissement
              ? null
              : Math.round(
                  acquisitionValue -
                    (values.dureDeVie * acquisitionValue) / dureAmortissement
                )
            : 0;
        await dispatch(createInventaire(values));
        route.push(`/materiels/inventaire/${values.equipmentId}`);
      }
      route.push(`/materiels/inventaire/${values.equipmentId}`);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize
        initialValues={{
          equipmentId: isEditing ? equipment?.id : "",
          dateInventaire: new Date(),
          datePreciation: new Date(),
          etatMateriel: "",
          dureDeVie: 0,
          valeurInventaire: 0,
        }}
        validationSchema={Yup.object({
          dateInventaire: Yup.date().required("Veuillez saisir une date"),
          datePreciation: Yup.date().required("Veuillez saisir une date"),
          dureDeVie: Yup.number().required("Veuillez remplir le durée de vie"),
          valeurInventaire: Yup.number().required("Veuillez remplir le valeur"),
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
                    <Link href="/materiels/informatiques">
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
                  <Typography variant="h4">Ajouter inventaire</Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>
              <FormContainer spacing={2}>
                <input
                  name="equipmentId"
                  value={formikProps.values.equipmentId}
                  type="text"
                  hidden
                />
                <Typography variant="h6" id="materiel" component="div">
                  Inventaire{" "}
                  {isEditing
                    ? equipment?.designation + " " + equipment?.numOptim
                    : ""}
                </Typography>
                <OSDatePicker
                  fullWidth
                  label="Date inventaire"
                  name="dateInventaire"
                  value={formikProps.values.dateInventaire}
                  onChange={(value: any) => {
                    formikProps.setFieldValue("dateInventaire", value);
                    const date1 = new Date(
                      formikProps.values.dateInventaire
                    ).getTime();
                    const date2 = new Date(
                      formikProps.values.datePreciation
                    ).getTime();
                    const calculDure = Math.ceil((date1 - date2) / 86400000);
                    formikProps.setFieldValue("dureDeVie", calculDure);
                  }}
                />
                <OSDatePicker
                  fullWidth
                  name="datePreciation"
                  label="Date dépréciation"
                  value={formikProps.values.datePreciation}
                  onChange={(value: any) => {
                    formikProps.setFieldValue("datePreciation", value);
                    const date1 = new Date(
                      formikProps.values.dateInventaire
                    ).getTime();
                    const date2 = new Date(
                      formikProps.values.datePreciation
                    ).getTime();
                    const calculDure = Math.ceil((date1 - date2) / 86400000);
                    formikProps.setFieldValue("dureDeVie", calculDure);
                  }}
                />
                <OSTextField
                  name="dureDeVie"
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  label="Durée de vie"
                  type="number"
                  min="0"
                  value={Math.ceil(
                    (formikProps.values.dateInventaire.getTime() -
                      new Date(formikProps.values.datePreciation).getTime()) /
                      86400000
                  )}
                  onChange={(value: any) =>
                    formikProps.setFieldValue("dureDeVie", value)
                  }
                />
                <OSTextField
                  name="valeurInventaire"
                  fullWidth
                  value={
                    dureAmortissement && acquisitionValue
                      ? formikProps.values.dureDeVie > dureAmortissement
                        ? 0
                        : Math.round(
                            acquisitionValue -
                              (formikProps.values.dureDeVie *
                                acquisitionValue) /
                                dureAmortissement
                          )
                      : 0
                  }
                  onChange={(value: any) =>
                    formikProps.setFieldValue("valeurInventaire", value)
                  }
                  id="outlined-basic"
                  label="Valeur"
                  variant="outlined"
                  type="number"
                  min="0"
                />
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Etat matériel"
                    name="etatMateriel"
                    value={
                      etat == "GOOD"
                        ? "Bon etat"
                        : etat == "BAD"
                        ? "Mauvais"
                        : "Inutilisable"
                    }
                    onChange={(e: any) =>
                      formikProps.setFieldValue("etatMateriel", e.target.value)
                    }
                  />
                </FormControl>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddInventaireForm;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  // border: "1px solid #E0E0E0",
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
