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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  styled,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextField from "../../shared/input copy/OSTextField";
import { createVendor, updateVendor } from "../../../redux/features/vendor";
import { cancelEdit } from "../../../redux/features/vendor/vendorSlice";
import OSSelectField from "../../shared/select/OSSelectField";
import { getTypeProduits } from "../../../redux/features/configuration";

export default function VendorForm() {
  const route = useRouter();

  const dispatch = useAppDispatch();

  const { isEditing, vendor } = useAppSelector((state) => state.vendor);
  const [open, setOpen] = React.useState(false);
  const [getValue, setGetVaue] = React.useState("");

  const handleSubmit = async (values: any) => {
    // console.log(values.website.length);
    if (values.nif.length < 10) {
      setGetVaue("NIF");
      return setOpen(true);
    } else if (values.website.length < 15) {
      setGetVaue("STAT");
      return setOpen(true);
    }
    try {
      if (isEditing) {
        await dispatch(
          updateVendor({
            id: vendor.id!,
            vendor: values,
          })
        );
      } else {
        await dispatch(createVendor(values));
      }
      route.push("/fournisseurs");
    } catch (error) {
      console.log("error", error);
    }
  };

  const { typeProduits } = useAppSelector((state) => state.typeProduit);

  const fetchUtilsData = () => {
    dispatch(getTypeProduits({}));
  };

  useEffect(() => {
    fetchUtilsData();
  }, []);

  const CategoryitList = [
    { id: "Bien", name: "Bien" },
    { id: "Service", name: "Service" },
    { id: "Don", name: "Don" },
  ];
  const EvaluationList = [
    { id: "Fidèle", name: "Fidèle" },
    { id: "Croissance", name: "Croissance" },
    { id: "Dilemme", name: "Dilemme" },
    { id: "Disqualifier", name: "Disqualifier" },
  ];

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? vendor
            : {
                name: isEditing ? vendor?.name : "",
                address: isEditing ? vendor?.address : "",
                phone: isEditing ? vendor?.address : "",
                email: isEditing ? vendor?.email : "",
                website: isEditing ? vendor?.website : "",
                nif: isEditing ? vendor?.nif : "",
                typeProduit: isEditing ? vendor?.typeProduit : "",
                categorieFournisseur: isEditing
                  ? vendor?.categorieFournisseur
                  : "",
                evaluation: isEditing ? vendor?.evaluation : "",
                rib: isEditing ? vendor?.rib : 0,
                agence: isEditing ? vendor?.agence : "",
              }
        }
        validationSchema={Yup.object({
          name: Yup.string().required("Champ obligatoire"),
          email: Yup.string().email("Email invalide"),
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
                    <Link href="/fournisseurs">
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
                    {isEditing ? "Modifier" : "Ajouter"} fournisseurs
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>

              <FormContainer spacing={2}>
                <Stack direction="row" spacing={3}>
                  <OSTextField
                    id="outlined-basic"
                    label="Fournisseur"
                    name="name"
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Téléphone"
                    name="phone"
                  />
                  <OSTextField id="outlined-basic" label="Email" name="email" />
                </Stack>
                <OSTextField
                  id="outlined-basic"
                  label="Adresse"
                  name="address"
                />
                <Stack direction="row" spacing={3}>
                  <OSTextField
                    id="outlined-basic-nif"
                    label="Nif"
                    name="nif"
                    inputProps={{ maxLength: 10 }}
                    fullWidth
                    margin="normal"
                  />
                  <OSTextField
                    id="outlined-basic-stat"
                    label="Stat"
                    name="website"
                    inputProps={{ maxLength: 15 }}
                    fullWidth
                    margin="normal"
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <OSSelectField
                    id="outlined-basic"
                    label="Type de produit"
                    name="typeProduit"
                    options={typeProduits}
                    dataKey="typeProduct"
                    valueKey="id"
                  />
                  <OSSelectField
                    id="outlined-basic"
                    label="Catégorie"
                    name="categorieFournisseur"
                    options={CategoryitList}
                    dataKey="name"
                    valueKey="name"
                  />
                  <OSSelectField
                    id="outlined-basic"
                    label="Evaluation"
                    name="evaluation"
                    options={EvaluationList}
                    dataKey="name"
                    valueKey="name"
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <OSTextField
                    id="outlined-basic"
                    label="RIB"
                    name="rib"
                    type="number"
                    min="0"
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Agence"
                    name="agence"
                  />
                </Stack>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
      <Dialog open={open}>
        <DialogTitle color={"red"}>Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`La valeur de ${getValue} doit contenir des ${
              getValue == "NIF" ? 10 : 15
            } caractères`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            <Check color="primary" />
          </Button>
        </DialogActions>
      </Dialog>
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
