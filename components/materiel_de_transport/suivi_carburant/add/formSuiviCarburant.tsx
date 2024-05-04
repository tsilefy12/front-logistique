import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  Stack,
  Divider,
  TextField,
  MenuItem,
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

import { cancelEdit } from "../../../../redux/features/car-voucher/carVoucherSlice";
import { createSuiviCarburant, editSuiviCarburant, updateSuiviCarburant } from "../../../../redux/features/suivi_carburant/suiviCarburantSlice";
import useFetchSuiviCarburants from "../hooks/useFetchSuiviCarburant";
import useFetchGrant from "../hooks/useFetchGrant";
import OSSelectField from "../../../shared/select/OSSelectField";
import useFetchLigneBudgetaire from "../hooks/useFetchLigneBudgetaire";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import {  updateTransportationEquipment } from "../../../../redux/features/transportation_equipment";

const FormSuiviCarburant = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = route.query;
  const fetchSuiviCarburant = useFetchSuiviCarburants()
  const { isEditing, suiviCarburant } = useAppSelector((state) => state.suiviCarburant);

  const fetchGrant = useFetchGrant();
  const fetchLigneBudgetaire = useFetchLigneBudgetaire()
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire)
  const fetchMateriels = useFetchTransportationEquipments();
  const { transportationEquipment, transportationEquipments } = useAppSelector((state) => state.transportationEquipment)

  React.useEffect(() => {
    fetchLigneBudgetaire();
    fetchGrant();
    fetchMateriels();
    if (id) {
      dispatch(editSuiviCarburant({ id }));
    }
  }, [id]);

  const ListMateriel: { id: string, name: string ,unitPrice:number}[] = [];
  let kilometrageInit: number = 0;
  let reserve: number = 0;
  let resteCarburant: number = 0;

  // let [selectMateriel, setSelectMateriel] = React.useState('');
  const [materiel, setMateriel] = React.useState("");

  if (transportationEquipments.length > 0) {
    transportationEquipments.forEach((element: any) => {
      if (element.id === materiel) {
        kilometrageInit = element["kilometrageActuel"];
        reserve = element["reservoir"];
        resteCarburant = element["reste"];
      }
      if (element["status"] === "Location interne") {
        ListMateriel.push({ id: element.id, name: element.registration ,unitPrice: element.typeEquipment.unitPrice});
      }
    });
  } else {
    console.log("Rien")
  }
  // console.log("kilometrage initial :", kilometrageInit)
  // console.log("reservoir :", reserve);

  const handleSubmit = async (values: any) => {

    try {
      if (isEditing) {
        await dispatch(
          updateSuiviCarburant({
            id: suiviCarburant.id!,
            suiviCarburant: values,
          })
        );
      } else {
        await dispatch(createSuiviCarburant(values));
        updateTransport(values);
      }
      // console.log("valeur KF :", values.kilometrageFinal)

      fetchSuiviCarburant()
      route.push("/materiel_de_transport/suivi_carburant");
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateTransport = async (values: any) => {
    // console.log("materiel id :", values.materiel)
    try {
      if (values.materiel != "") {
        const updatedReste = calculateUpdatedReste(values);

        await dispatch(
          updateTransportationEquipment({
            id: values.materiel!,
            transportationEquipment: {
              ...transportationEquipment,
              reste: updatedReste,
              kilometrageActuel: values.kilometrageFinal
            },
          })
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const calculateUpdatedReste = (values: any) => {

    const calcul1 = values.kilometrageFinal - kilometrageInit;

    if (calcul1 >= 0) {
      const calcul2 = (calcul1 * reserve) / kilometrageInit;

      if (resteCarburant !== undefined) {
        if (calcul2 > 0) {
          
          resteCarburant = parseInt((reserve - calcul2).toFixed(1));

          console.log("calcul2 :", calcul2)

          return resteCarburant;
        }
      } else {
        return resteCarburant !== undefined ? resteCarburant : 0;
      }
    } else {
      const calcul3 = (calcul1 * reserve) / kilometrageInit;
      resteCarburant = calcul3;
      return resteCarburant;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
      <Formik
        enableReinitialize
        initialValues={{
          materiel: isEditing ? suiviCarburant?.materiel : materiel,
          date: isEditing ? suiviCarburant?.date : new Date(),
          itineraire: isEditing ? suiviCarburant?.itineraire : "",
          personnelTransporte: isEditing ? suiviCarburant?.personnelTransporte : "",
          kilometrageFinal: isEditing ? suiviCarburant?.kilometrageFinal : 0,
          montant: isEditing ? suiviCarburant?.montant : 0,
          grant: isEditing ? suiviCarburant?.grant : "",
          pu: isEditing ? suiviCarburant?.pu : ListMateriel.find((e:any) => e.id === materiel)?.unitPrice,
          ligneBudgetaire: isEditing ? suiviCarburant?.ligneBudgetaire : "",
          modePaiement: isEditing ? suiviCarburant?.modePaiement : "",
        }}
        validationSchema={Yup.object({
          materiel: Yup.string().required("Veuillez remplir le champ matériel"),
          date: Yup.string().required("Veuillez remplir le champ date"),
          itineraire: Yup.string().required(
            "Veuillez remplir le champ itineraire"
          ),
          personnelTransporte: Yup.string().required("Veuillez remplir le champ personne transporté"),
          kilometrageFinal: Yup.number().required("Veuillez remplir le champ kilometrage final"),
          montant: Yup.string().required(
            "Veuillez remplir le champ montant"
          ),
          pu: Yup.number().required("Veuillez remplir le champ prix unitaire"),
          grant: Yup.string().required(
            "Veuillez remplir le champ grant"
          ),
          ligneBudgetaire: Yup.string().required(
            "Veuillez choisir ligne budgetaire"
          ),
          modePaiement: Yup.string().required(
            "Veuillez remplir le champ mode paiement"
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
                    <Link href="/materiel_de_transport/suivi_carburant/">
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
                      {isEditing ? "Modifier" : "Ajouter"}
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
                    {isEditing ? "Modifier" : "Ajouter"} suivi carburant
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                margin={2}
              >
                <TextField
                  select
                  fullWidth
                  id="outlined-basic"
                  label="Matériel"
                  variant="outlined"
                  value = {materiel}
                  onChange={(e) => setMateriel(e.target.value)}
                >
                  {[...ListMateriel].map((element: any) => (
                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                  ))}
                </TextField>
                <OSDatePicker
                  fullWidth
                  id="outlined-basic"
                  label="Date"
                  variant="outlined"
                  value={formikProps.values.date}
                  onChange={(value: any) => formikProps.setFieldValue("date", value)}
                />
              </Stack>
              <Stack direction="row" spacing={2} margin={2}>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Itineraire"
                    variant="outlined"
                    name="itineraire"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Personne transporté"
                    name="personnelTransporte"
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2} margin={2}>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="kilometrage final"
                    name="kilometrageFinal"
                    type="number"
                    min="0"
                    value={formikProps.values.kilometrageFinal}
                    onChange={(event: any) => {
                      const newValue = parseInt(event.target.value);
                      formikProps.setFieldValue("kilometrageFinal", newValue);
                      const newMontant = ((formikProps.values.kilometrageFinal! - kilometrageInit)*formikProps.values.pu!).toFixed(0);
                      formikProps.setFieldValue("montant", parseInt(newMontant));
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Prix unitaire"
                    variant="outlined"
                    name="pu"
                    type="number"
                    value={ListMateriel.find((e:any) => e.id === materiel)?.unitPrice}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Montant"
                    variant="outlined"
                    name="montant"
                    type="number"
                    min="0"
                    value={parseInt(((formikProps.values.kilometrageFinal! - kilometrageInit)* formikProps.values.pu!).toFixed(0))}
                  />
                </FormControl>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                margin={2}
              >
                <FormControl fullWidth>
                  <OSSelectField
                    id="outlined-basic"
                    label="Grant"
                    variant="outlined"
                    options={grantList}
                    dataKey={["code"]}
                    valueKey="id"
                    name="grant"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <OSSelectField
                    id="outlined-basic"
                    label="Ligne budgetaire"
                    variant="outlined"
                    options={budgetLineList}
                    dataKey={["code"]}
                    valueKey="id"
                    name="ligneBudgetaire"
                    type="text"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <OSTextField
                    id="outlined-basic"
                    label="Mode paiement"
                    variant="outlined"
                    name="modePaiement"
                    type="text"
                  />
                </FormControl>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default FormSuiviCarburant;

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
