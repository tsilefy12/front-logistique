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
import {
  createOrderEquipmentItem,
  updateOrderEquipmentItem,
} from "../../../redux/features/OrderEquipmentItem";
import { cancelEdit } from "../../../redux/features/OrderEquipmentItem/orderEquipmentItemSlice";
import OSSelectField from "../../shared/select/OSSelectField";
import useFetchOrderEquipement from "../../materiels/commandes/hooks/useFetchOrderEquipment";

export default function OrderEquipmentItemForm() {
  const route = useRouter();

  const dispatch = useAppDispatch();

  const { isEditing, orderEquipmentItem } = useAppSelector(
    (state) => state.orderEquipmentItem
  );
  const fetchOrderEquipmentList = useFetchOrderEquipement();
  const { orderEquipmentList } = useAppSelector(
    (state) => state.orderEquipment
  );

  useEffect(() => {
    fetchOrderEquipmentList();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateOrderEquipmentItem({
            id: orderEquipmentItem.id!,
            orderEquipmentItem: values,
          })
        );
      } else {
        await dispatch(createOrderEquipmentItem(values));
      }
      route.push("/materiels/mes_commandes");
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
            ? orderEquipmentItem
            : {
                designation: isEditing ? orderEquipmentItem?.designation : "",
                quantity: isEditing ? orderEquipmentItem?.quantity : "",
                orderEquipmentId: isEditing
                  ? orderEquipmentItem?.orderEquipmentId
                  : "",
              }
        }
        validationSchema={Yup.object({
          designation: Yup.string().required("Champ obligatoire"),
          quantity: Yup.string().required("Champ obligatoire"),
          orderEquipmentId: Yup.string().required("champ obligatoire"),
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
                    <Link href="/materiels/mes_commandes">
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
                    {isEditing ? "Modifier" : "Ajouter"} Mes Commande
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
                  label="Quantité"
                  name="quantity"
                />
                <OSSelectField
                  id="orderEquipmentId"
                  label="Raison de commande"
                  name="orderEquipmentId"
                  options={orderEquipmentList}
                  dataKey={"reason"}
                  valueKey="id"
                />
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
