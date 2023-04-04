import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { styled } from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextField from "../../shared/input copy/OSTextField";
import OSSelectField from "../../shared/select/OSSelectField";
import OSDatePicker from "../../shared/date/OSDatePicker";
import { cancelEdit } from "../../../redux/features/vendor/vendorSlice";
import {
  createConsumable,
  updateConsumable,
} from "../../../redux/features/order-supply-and-consumable";
import useFetchEmployes from "../hooks/useFetchEmployees";
import useFetchConsumables from "../hooks/useFetchOrderSupplyAndConsumables";
// import useFetchSuplysAndConsumableList from "../hooks/useFetchSuplyAndConsumableList";
// import useFetchSuplyAndConsumableList from "../../supply-and-consumable/hooks/useFetchSupplyAndConsumables";

export default function ConsumableForm() {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const fetchConsumables = useFetchConsumables();
  const fetchEmployees = useFetchEmployes();
  // const { suplyAndConsumableList } = useAppSelector(
  //   (state) => state.suplyAndConsumable
  // );
  // const fetchSuplyAndConsumable = useFetchSuplysAndConsumableList();

  useEffect(() => {
    fetchEmployees();
    fetchConsumables();
    // fetchSuplyAndConsumable();
  }, []);

  // const listStatus = [
  //   { id: "PENDING", name: "PENDING" },
  //   { id: "APPROVEDBYMANAGER", name: "APPROVEDBYMANAGER" },
  //   { id: "APPROVED", name: "APPROVED" },
  //   { id: "CANCELLED", name: "CANCELLED" },
  //   { id: "REJECTED", name: "REJECTED" },
  // ];
  // const seuil = [
  //   { id: "1", name: "1" },
  //   { id: "2", name: "2" },
  //   { id: "3", name: "3" },
  //   { id: "4", name: "4" },
  //   { id: "5", name: "5" },
  //   { id: "10", name: "10" },
  //   { id: "20", name: "20" },
  //   { id: "30", name: "30" },
  //   { id: "50", name: "50" },
  // ];

  const {
    isEditing,
    consumable,
    employeeList,
    //  suplyAndConsumableList
  } = useAppSelector((state) => state.consumable);

  // const { linkedEmployee } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: any) => {
    values.deliveryDate = new Date(values?.deliveryDate).toISOString();
    try {
      if (isEditing) {
        await dispatch(
          updateConsumable({
            id: consumable.id!,
            consumable: values,
          })
        );
      } else {
        await dispatch(createConsumable(values));
      }
      route.push("/fournitures_et_consommables/commande");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? consumable
            : {
                // employeeId: linkedEmployee?.id,
                item: isEditing ? consumable?.item : "",
                applicantId: isEditing ? consumable?.applicantId : "",
                requestedQuantity: isEditing
                  ? consumable?.requestedQuantity
                  : "",
                deliveredQuantity: isEditing
                  ? consumable?.deliveredQuantity
                  : "",
                deliveryDate: isEditing ? consumable?.deliveryDate : new Date(),
                status: isEditing ? consumable?.status : "PENDING",
              }
        }
        validationSchema={Yup.object({
          item: Yup.string().required("Champ obligatoire"),
          applicantId: Yup.string().required("Champ obligatoire"),
          requestedQuantity: Yup.number().required("Champ obligatoire"),
          deliveredQuantity: Yup.number().required("champ obligatoire"),
          deliveryDate: Yup.date().required(
            "Veuillez choisir la date de livraison"
          ),
          status: Yup.string().required("Champ obligatoire"),
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
                    <Link href="/fournitures_et_consommables/commande">
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
                    {isEditing ? "Modifier" : "Ajouter"} Commande
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>

              <FormContainer spacing={2}>
                <OSTextField id="outlined-basic" label="Article" name="item" />
                {/* <OSSelectField
                  id="outlined-basic"
                  label="Fiche de Stock"
                  name="item"
                  options={suplyAndConsumableList}
                  dataKey="designation"
                  valueKey="id"
                /> */}
                <OSSelectField
                  id="outlined-basic"
                  label="Demandeur"
                  name="applicantId"
                  options={employeeList}
                  dataKey="name"
                  valueKey="id"
                  // type="string"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Quantité démandée"
                  name="requestedQuantity"
                  type="number"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Quantité livrée"
                  name="deliveredQuantity"
                  type="number"
                />
                <OSDatePicker
                  fullWidth
                  label="Date de livraison"
                  value={formikProps.values.deliveryDate}
                  onChange={(value: any) =>
                    formikProps.setFieldValue("deliveryDate", value)
                  }
                />
                <OSTextField id="outlined-basic" label="Statut" name="status" />
                {/* <OSSelectField
                  id="outlined-basic"
                  label="Seuil"
                  name="status"
                  options={seuil}
                  dataKey="name"
                  valueKey="id"
                  // type="string"
                /> */}
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
