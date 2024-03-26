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
  editCarVoucher,
  updateCarVoucher,
} from "../../../../redux/features/car-voucher";
import { cancelEdit } from "../../../../redux/features/car-voucher/carVoucherSlice";
import useFetchCarVouchers from "../hooks/useFetchCarVoucher";

const FormBonDeVoiture = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const fetchCarVouchers = useFetchCarVouchers();
  const { id }: any = route.query;
  const { isEditing, carVoucher } = useAppSelector((state) => state.carVoucher);
  React.useEffect(() => {
    if (id) {
      dispatch(editCarVoucher({ id }));
    }
  }, [id]);
  const handleSubmit = async (values: any) => {
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
      fetchCarVouchers()
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
          materiel: isEditing ? carVoucher?.materiel : "",
          date: isEditing ? carVoucher?.date : new Date(),
          montantTotal: isEditing ? carVoucher?.montantTotal : "",
        }}
        validationSchema={Yup.object({
          materiel: Yup.string().required("Veuillez remplir le champ matériel"),
          date: Yup.string().required(
            "Veuillez remplir le champ date"
          ),
          //montantTotal: Yup.string().required("Veuillez remplir le champ montant total"),
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
                    {isEditing ? "Modifier" : "Ajouter"} Entretien
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
                    label="matériel"
                    variant="outlined"
                    name="materiel"
                  />
                  <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date"
                    variant="outlined"
                    value = {formikProps.values.date}
                    onChange = {(value: any) =>formikProps.setFieldValue("date", value)}
                  />
                </Stack>
              <FormControl fullWidth sx={{display: "none"}}>
                  <OSTextField
                    id="outlined-basic"
                    label="Montant total"
                    variant="outlined"
                    name="montantTotal"
                    type="number"
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
