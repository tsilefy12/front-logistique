import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close, Save } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { cancelEdit } from "../../../../redux/features/orderEquipment/orderEquipmentSlice";
import { createOrderEquipment } from "../../../../redux/features/orderEquipment";
import { updateOrderEquipment } from "../../../../redux/features/orderEquipment";
import useFetchOrderEquipement from "../hooks/useFetchOrderEquipment";
import useFetchEmployes from "../hooks/useFetchEmployees";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import OSTextField from "../../../shared/input/OSTextField";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { useRouter } from "next/router";
import { editOrderEquipment } from "../../../../redux/features/orderEquipment";
// import { cancelEdit } from "../../../../redux/features/orderEquipment/orderEquipmentSlice";

const FormCommande = () => {
  const [demandeur, setDemandeur] = React.useState("");
  const router = useRouter();
  const id: any = router.query.commandId;
  // const { id }: any = router.query;
  const handleChange = (event: SelectChangeEvent) => {
    setDemandeur(event.target.value as string);
  };
  const [grant, setgrant] = React.useState("");
  const status = [
    { id: "PENDING", value: "En attente" },
    { id: "APPROVED", value: "Approuvé" },
    { id: "REJECTED", value: "Refusé" },
  ];

  const ifChange = (event: SelectChangeEvent) => {
    setgrant(event.target.value as string);
  };

  const { isEditing, orderEquipment, employeList } = useAppSelector(
    (state) => state.orderEquipment
  );
  const dispatch = useAppDispatch();
  const fetchOrderEquipementList = useFetchOrderEquipement();
  const fetchEmployeList = useFetchEmployes();

  useEffect(() => {
    fetchEmployeList();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(editOrderEquipment({ id }));
    }
  }, [id]);

  const handleSubmint = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateOrderEquipment({
            id: orderEquipment.id!,
            orderEquipment: values,
          })
        );
      } else {
        await dispatch(createOrderEquipment(values));
      }
      fetchOrderEquipementList();
      router.push("/materiels/commande");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? orderEquipment
            : {
                designation: isEditing ? orderEquipment?.designation : "",
                reason: isEditing ? orderEquipment?.reason : "",
                deadlineOfReception: isEditing
                  ? orderEquipment?.deadlineOfReception
                  : new Date(),
                numberOfAuthorisedOffersPossible: isEditing
                  ? orderEquipment?.numberOfAuthorisedOffersPossible
                  : "",
                applicantId: isEditing ? orderEquipment?.applicantId : "",
                status: isEditing ? orderEquipment?.status : "En_attent",
              }
        }
        validationSchema={Yup.object({
          designation: Yup.string().required("Champ obligatoire"),
          reason: Yup.string().required("Champ obligatoire"),
          applicantId: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (value: any, action) => {
          await handleSubmint(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <NavigationContainer>
                <SectionNavigation>
                  <Stack flexDirection={"row"}>
                    <Link href="/materiels/commande">
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
                      type="reset"
                      startIcon={<Close />}
                      onClick={() => {
                        formikProps.resetForm();
                        dispatch(cancelEdit());
                      }}
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h4">Créer(modifier) commande</Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>
              <FormContainer spacing={2}>
                <OSTextField
                  id="designation"
                  label="Designation"
                  name="designation"
                />
                <OSTextField id="reason" label="Raison" name="reason" />
                <OSDatePicker
                  fullWidth
                  label="Deadline de réceptionate"
                  value={formikProps.values.deadlineOfReception}
                  onChange={(value: any) =>
                    formikProps.setFieldValue("deadlineOfReception", value)
                  }
                />
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <FormControl fullWidth>
                    <OSTextField
                      id="numberOfAuthorisedOffersPossible"
                      label="Nombre d'offres autorisé possible pour une commande"
                      name="numberOfAuthorisedOffersPossible"
                      type="number"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <OSSelectField
                      id="status"
                      label="Status"
                      name="status"
                      options={status}
                      dataKey={"value"}
                      valueKey="id"
                    />
                  </FormControl>
                </Stack>
                <OSSelectField
                  id="applicantId"
                  label="Demandeur"
                  name="applicantId"
                  options={employeList}
                  dataKey={"name"}
                  valueKey="id"
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default FormCommande;

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
