import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close, Save } from "@mui/icons-material";
import { Form, Formik } from "formik";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import OSTimePicker from "../../../shared/time/OSTimePicker";
import useFetchTypeEquipment from "../hooks/useFetchTypeEquipment";
import {
  createEquipment,
  updateEquipment,
} from "../../../../redux/features/equipment";
import { useRouter } from "next/router";
import useFetchEquipment from "../hooks/useFetchEquipment";
import useFetchEmployes from "../hooks/useFetchEmployees";
const AddArticleForm = () => {
  const fetchTypeEquipment = useFetchTypeEquipment();
  const fetchEmployes = useFetchEmployes();
  const dispatch = useAppDispatch();
  const etat = [
    { name: "GOOD",french:"Bon etat" },
    { name: "BAD",french:"Moyen" },
    { name: "BROKEN",french:"Mauvais" },
  ];
  const route = useRouter();
  const { typeequipment, employees, isEditing, equipment } =
    useAppSelector((state) => state.equipment);
  console.log(employees);
  React.useEffect(() => {
    fetchTypeEquipment();
  }, []);
  React.useEffect(() => {
    fetchEmployes();
  }, []);

  const handleSubmit = async (values: any) => {
    values.acquisitionDate = new Date(
      values?.acquisitionDate
    ).toISOString();

    try {
      if (isEditing) {
        await dispatch(
          updateEquipment({
            id: equipment.id!,
            equipment: values,
          })
        );
      } else {
        await dispatch(createEquipment(values));
      }
      // route.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize
        initialValues={{
          numOptim: isEditing ? equipment?.numOptim : "",
          additionalInformation: isEditing
            ? equipment?.additionalInformation
            : "",
          acquisitionDate: isEditing
            ? equipment?.acquisitionDate
            : new Date(),
          acquisitionValue: isEditing
            ? equipment?.acquisitionValue
            : "",
          imageUrl: isEditing ? equipment?.imageUrl : "",
          designation: isEditing ? equipment?.designation : "",
          status: isEditing ? equipment?.status : "",
          ownerId: isEditing ? equipment?.ownerId : "",
          typeEquipmentId: isEditing
            ? equipment?.typeEquipmentId
            : "",
        }}
        validationSchema={Yup.object({
          numOptim: Yup.string().required(
            "Veuillez sélectionner un numOptim"
          ),
          additionalInformation: Yup.string(),
          acquisitionDate: Yup.date(),
          acquisitionValue: Yup.number(),
          designation: Yup.string().required(
            "Veuillez remplir le champ designation"
          ),
          status: Yup.string().required(
            "Veuillez sélectionner un status"
          ),
          typeEquipmentId: Yup.string().required(
            "Veuillez sélectionner un type"
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
                    <Link href="/materiels/informatiques">
                      <Button
                        color="info"
                        variant="text"
                        startIcon={<ArrowBack />}
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
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h4">
                    {isEditing ? "Modifier" : "Ajouter"} materiel
                    informatique
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>
              <FormContainer spacing={2}>
                <CustomStack
                  direction={{
                    xs: "column",
                    sm: "column",
                    md: "row",
                  }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSTextField
                    fullWidth
                    id="outlined-basic"
                    label="N° OPTIM"
                    variant="outlined"
                    name="numOptim"
                  />
                  <FormControl fullWidth>
                    <OSSelectField
                      id="workplaceId"
                      label="Type"
                      name="typeEquipmentId"
                      options={typeequipment}
                      dataKey="type"
                      valueKey="id"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <OSSelectField
                      id="workplaceId"
                      label="Etat"
                      name="status"
                      options={etat}
                      dataKey="french"
                      valueKey="name"
                    />
                  </FormControl>
                </CustomStack>
                <FormControl fullWidth>
                  <OSSelectField
                    label="Employé utilisateur"
                    name="ownerId"
                    options={employees}
                    dataKey="name"
                    valueKey="id"
                  />
                </FormControl>
                <CustomStack
                  direction={{
                    xs: "column",
                    sm: "column",
                    md: "row",
                  }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSDatePicker
                    fullWidth
                    label="Date d'acquisition"
                    value={formikProps.values.acquisitionDate}
                    onChange={(value: any) =>
                      formikProps.setFieldValue(
                        "acquisitionDate",
                        value
                      )
                    }
                  />
                  <OSTextField
                    name="acquisitionValue"
                    fullWidth
                    id="outlined-basic"
                    label="Valeur d'acquisition"
                    variant="outlined"
                    type="number"
                  />
                </CustomStack>
                <OSTextField
                  name="additionalInformation"
                  fullWidth
                  id="outlined-basic"
                  label="Information suplémentaire"
                  variant="outlined"
                />
                <OSTextField
                  name="designation"
                  fullWidth
                  id="outlined-basic"
                  label="Déscription"
                  variant="outlined"
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default AddArticleForm;

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
