import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Grid,
  Divider,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Check, Close, Save } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextField from "../../shared/input copy/OSTextField";
import OSSelectField from "../../shared/select/OSSelectField";
import { cancelEdit } from "../../../redux/features/transportation_equipment/transportationEquipmentSlice";
import { useRouter } from "next/router";
import {
  createTransportEquipment,
  updateTransportationEquipment,
} from "../../../redux/features/transportation_equipment";
import OSDatePicker from "../../shared/date/OSDatePicker";
import useFetchVendors from "../../vendor/hooks/useFetchVendors";


const MaterielTransportForm = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { vendors } = useAppSelector((state) => state.vendor);
  console.log("fournisseur ", vendors);
  const fetchVendor = useFetchVendors();
  useEffect(() => {
    fetchVendor();
  }, [route.query])

  const { isEditing, transportationEquipment } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const { linkedEmployee } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateTransportationEquipment({
            id: transportationEquipment.id!,
            transportationEquipment: values,
          })
        );
      } else {
        await dispatch(createTransportEquipment(values));
      }
      route.push("/materiel_de_transport");
    } catch (error) {
      console.log("error", error);
    }
  };

  const type = [
    { id: "Moto", name: "Moto" },
    { id: "Voiture", name: "Voiture" },
    { id: "Pirogue", name: "Pirogue" },
  ]
  const ListStatus = [
    { id: "Location", name: "Location" },
    { id: "Interne", name: "Interne" }
  ]
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize
        initialValues={{
          registration: isEditing ? transportationEquipment?.registration : "",
          type: isEditing ? transportationEquipment?.type : "",
          brand: isEditing ? transportationEquipment?.brand : "",
          otherInformation: isEditing
            ? transportationEquipment?.otherInformation
            : "",
          status: isEditing ? transportationEquipment.status : "",
          dateAcquisition: isEditing ? transportationEquipment.dateAcquisition : new Date(),
          kilometrageInitial: isEditing ? transportationEquipment.kilometrageInitial : "",
          reservoir: isEditing ? transportationEquipment.reservoir : "",
          consommation: isEditing ? transportationEquipment.consommation : "",
          fournisseur: isEditing ? transportationEquipment.fournisseur : "",
        }}
        validationSchema={Yup.object({
          registration: Yup.string().required(
            "Veuillez remplir le champ registration"
          ),
          type: Yup.string().required("Veuillez remplir le champ type"),
          brand: Yup.string().required("Veuillez remplir le champ brand"),
          otherInformation: Yup.string().required(
            "Veuillez remplir le champ otherInformation"
          ),
          status: Yup.string().required(
            "Veuillez remplir le champ status"
          ),
          dateAcquisition: Yup.string().required(
            "Veuillez remplir le champ date d'acquisition"
          ),
          kilometrageInitial: Yup.string().required(
            "Veuillez remplir le champ kilometrage initial"
          ),
          reservoir: Yup.string().required(
            "Veuillez remplir le champ reservoir"
          ),
          consommation: Yup.string().required(
            "Veuillez remplir le champ consommation"
          ),
          fournisseur: Yup.string().required(
            "Veuillez remplir le champ fournisseur"
          ),
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
                    <Link href="/materiel_de_transport">
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
                    {isEditing ? "Modifier" : "Ajouter"} Materiel de transport
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>

              <FormContainer spacing={2}>
                <Stack direction="row" spacing={3} margin={2}>
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="Immatriculation/Reference"
                    variant="outlined"
                    name="registration"
                  />
                  <OSSelectField
                    id="outlined-basic"
                    label="Type"
                    variant="outlined"
                    options={type}
                    dataKey="name"
                    valueKey="id"
                    name="type"
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Marque"
                    variant="outlined"
                    name="brand"
                  />
                </Stack>
                <Stack direction="row" spacing={2} margin={2}>
                  <OSSelectField
                    id="outlined-basic"
                    label="Status"
                    variant="outlined"
                    options={ListStatus}
                    dataKey="name"
                    valueKey="id"
                    name="status"
                  />
                  <OSDatePicker
                    id="outlined-basic"
                    label="Date d'acquisition"
                    variant="outlined"
                    value={formikProps.values.dateAcquisition}
                    onChange={(value: any) => formikProps.setFieldValue("dateAcquisition", value)}
                  />
                </Stack>
                <Stack direction="row" spacing={3} margin={2}>
                  <OSTextField
                    id="outlined-basic"
                    label="Kilometrage initial"
                    variant="outlined"
                    name="kilometrageInitial"
                    type="number"
                    min="0"
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Remplissage"
                    variant="outlined"
                    name="reservoir"
                    type="number"
                    min="0"
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Consommation au 100"
                    variant="outlined"
                    name="consommation"
                    type="number"
                    min="0"
                  />
                </Stack>
                <Stack direction="row" spacing={2} margin={2}>
                  <OSTextField
                    id="outlined-basic"
                    label="Autre information"
                    variant="outlined"
                    name="otherInformation"
                  />
                  <OSSelectField
                    id="outlined-basic"
                    label="Fournisseur"
                    variant="outlined"
                    options={vendors}
                    dataKey={["name"]}
                    valueKey="id"
                    name="fournisseur"
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
};

export default MaterielTransportForm;

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
