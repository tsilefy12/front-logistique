import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  Stack,
  Divider,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSTimePicker from "../../../shared/time/OSTimePicker";
import {
  createCarVoucher,
  updateCarVoucher,
} from "../../../../redux/features/car-voucher";
import { cancelEdit } from "../../../../redux/features/car-voucher/carVoucherSlice";

const FormBonDeVoiture = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const { isEditing, carVoucher } = useAppSelector((state) => state.carVoucher);

  const handleSubmit = async (values: any) => {
    values.departureDate = new Date(values?.departureDate).toISOString();
    values.departureTime = new Date(values?.departureTime).toISOString();
    values.arrivalDate = new Date(values?.arrivalDate).toISOString();
    values.arrivalTime = new Date(values?.arrivalTime).toISOString();
    try {
      if (isEditing) {
        await dispatch(
          updateCarVoucher({
            id: carVoucher.id!,
            carVoucher: values,
          })
        );
      } else {
        await dispatch(createCarVoucher(values));
      }
      route.push("/materiel_de_transport/bon_de_voiture");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
      <Formik
        enableReinitialize
        initialValues={{
          number: isEditing ? carVoucher?.number : "",
          registration: isEditing ? carVoucher?.registration : "",
          type: isEditing ? carVoucher?.type : "",
          reason: isEditing ? carVoucher?.reason : "",
          argument: isEditing ? carVoucher?.argument : "",
          itinerary: isEditing ? carVoucher?.itinerary : "",
          departureDate: isEditing ? carVoucher?.departureDate : new Date(),
          departureTime: isEditing ? carVoucher?.departureTime : new Date(),
          arrivalDate: isEditing ? carVoucher?.arrivalDate : new Date(),
          arrivalTime: isEditing ? carVoucher?.arrivalTime : new Date(),
          quantity: isEditing ? carVoucher?.quantity : 0,
        }}
        validationSchema={Yup.object({
          number: Yup.string().required("Veuillez remplir le champ NumeroBV"),
          registration: Yup.string().required(
            "Veuillez remplir le champ Immatriculation"
          ),
          type: Yup.string().required("Veuillez remplir le champ Type"),
          reason: Yup.string().required("Veuillez remplir le champ Motif"),
          argument: Yup.string().required(
            "Veuillez remplir le champ Argumentaire"
          ),
          itinerary: Yup.string().required(
            "Veuillez remplir le champ Itinéraire"
          ),
          departureDate: Yup.string().required(
            "Veuillez choisir le date de départ"
          ),
          departureTime: Yup.string().required(
            "Veuillez choisir heure de départ"
          ),
          arrivalDate: Yup.string().required(
            "Veuillez choisir le date de retour"
          ),
          arrivalTime: Yup.string().required(
            "Veuillez choisir heure de retour"
          ),
          quantity: Yup.number()
            .positive("Quantité doit être positive")
            .required("Veuillez remplir le champ Quantité"),
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
                    <Link href="/materiel_de_transport/bon_de_voiture/">
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
                    {isEditing ? "Modifier" : "Ajouter"} Bon de voiture
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>
              <FormContainer spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="NumeroBV"
                    variant="outlined"
                    name="number"
                  />
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Immatriculation"
                    variant="outlined"
                    name="registration"
                  />
                </Stack>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Type"
                    variant="outlined"
                    name="type"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Motif"
                    rows={4}
                    multiline
                    name="reason"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Argumentaire"
                    rows={4}
                    multiline
                    name="argument"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Itineraire"
                    variant="outlined"
                    name="itinerary"
                  />
                </FormControl>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControl fullWidth>
                    <OSDatePicker
                      fullWidth
                      label="Date départ"
                      value={formikProps.values.departureDate}
                      onChange={(value: any) =>
                        formikProps.setFieldValue("departureDate", value)
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <OSTimePicker
                      label="Heure de départ"
                      value={formikProps.values.departureTime}
                      onChange={(value: any) =>
                        formikProps.setFieldValue("departureTime", value)
                      }
                    />
                  </FormControl>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControl fullWidth>
                    <OSDatePicker
                      fullWidth
                      label="Date retour"
                      value={formikProps.values.arrivalDate}
                      onChange={(value: any) =>
                        formikProps.setFieldValue("arrivalDate", value)
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <OSTimePicker
                      label="Heure de retour"
                      value={formikProps.values.arrivalTime}
                      onChange={(value: any) =>
                        formikProps.setFieldValue("arrivalTime", value)
                      }
                    />
                  </FormControl>
                </Stack>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="QuAntité"
                    variant="outlined"
                    type="number"
                    name="quantity"
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
