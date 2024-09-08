import {
  Button,
  styled,
  Typography,
  FormControl,
  Stack,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import { Form, FormikProps } from "formik";
import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { cancelEdit } from "../../../../redux/features/location/locationSlice";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import useFetchGrant from "../../suivi_carburant/hooks/useFetchGrant";
import OSSelectField from "../../../shared/select/OSSelectField";
import useFetchVendors from "../../../vendor/hooks/useFetchVendors";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";
import useFetchEmployes from "../../../Order-Supply-And-Consumable/hooks/useFetchEmployees";
import useFetchPrestataire from "../../../materiels/bon_commande_externe/hooks/getPrestataire";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";
import useFetchLigneBudget from "../hooks/useFetchLigneBudget";

const LocationForm = ({ formikProps }: { formikProps: FormikProps<any> }) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { isEditing } = useAppSelector((state) => state.locationDeTransport);
  const fetchGrant = useFetchGrant();
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const { vendors } = useAppSelector((state) => state.vendor);
  const fetchVendors = useFetchVendors();
  const fetchMateriels = useFetchTransportationEquipments();
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const fetchEmploye = useFetchEmployes();
  const { employees } = useAppSelector((state) => state.employe);
  const { interns } = useAppSelector((state) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector((state) => state.prestataire);
  const fetchLigneBudget = useFetchLigneBudget();
  const { lineBudgetList } = useAppSelector((state) => state.ligneBudget);
  React.useEffect(() => {
    fetchGrant();
    fetchVendors();
    fetchMateriels();
    fetchEmploye();
    dispatch(getInterns({}));
    fetchPrestataire();
    fetchLigneBudget();
  }, []);
  const listMateriel: { id: string; name: string }[] = [];

  if (transportationEquipments.length > 0) {
    transportationEquipments.forEach((element: any) => {
      if (element["status"] === "Location externe") {
        listMateriel.push({ id: element.id, name: element.registration });
      }
    });
  } else {
    listMateriel.push({ id: "", name: "" });
  }

  React.useEffect(() => {
    if (formikProps.values.grant != 0) {
      dispatch(
        getBudgetLineList({
          args: {
            where: {
              grantId: formikProps.values.grant,
            },
          },
        })
      );
    }
  }, [formikProps.values.grant]);
  const total = [
    ...employees.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "employe",
      };
    }),
    ...interns.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "intern",
      };
    }),
    ...prestataireListe.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "prestataire",
      };
    }),
  ];
  React.useEffect(() => {
    const prix = transportationEquipments.find(
      (e) => e.id === formikProps.values.materiel
    )?.typeEquipment?.unitPrice;
    if (
      typeof formikProps.values.kilometrageFinale === "number" &&
      typeof prix === "number" &&
      transportationEquipments.find((e) => e.id === formikProps.values.materiel)
    ) {
      const newValue =
        (formikProps.values.kilometrageFinale -
          transportationEquipments.find(
            (e) => e.id === formikProps.values.materiel
          )!.kilometrageActuel!) *
          prix ?? 0;

      if (newValue < 0) {
        formikProps.setFieldValue(
          "montant",
          formikProps.values.pu * formikProps.values.nombreJour
        );
      } else {
        formikProps.setFieldValue(
          "montant",
          newValue + formikProps.values.pu * formikProps.values.nombreJour
        );
      }
    }
  }, [formikProps.values]);
  return (
    <Form>
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Button
              color="info"
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => {
                formikProps.resetForm();
                dispatch(cancelEdit());
                route.back();
              }}
            >
              Retour
            </Button>
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
            {isEditing ? "Modifier" : "Nouveau"} location externe
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
        <OSSelectField
          fullWidth
          id="outlined-basic"
          label="Matériel"
          variant="outlined"
          options={listMateriel}
          dataKey="name"
          valueKey="id"
          name="materiel"
        />
        {/* <OSTextField
          fullWidth
          id="outlined-basic"
          label="Responsable"
          variant="outlined"
          name="responsable"
        /> */}
        <OSSelectField
          fullWidth
          id="outlined-basic"
          label="Responsable"
          variant="outlined"
          name="responsable"
          options={total}
          dataKey={["name", "surname"]}
          valueKey="id"
          inputProps={{ autoComplete: "off" }}
        />
      </Stack>
      <Stack direction="row" spacing={2} margin={2}>
        <FormControl fullWidth>
          <OSDatePicker
            id="outlined-basic"
            label="Date"
            variant="outlined"
            value={formikProps.values.date}
            onChange={(value: any) => formikProps.setFieldValue("date", value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSSelectField
            id="outlined-basic"
            label="Référence budgétaire"
            name="referenceBudgetaire"
            options={lineBudgetList}
            dataKey={"name"}
            valueKey="id"
            inputProps={{ autoComplete: "off" }}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={3} margin={2}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <OSTextField
            id="outlined-basic"
            label="Kilométrage final"
            name="kilometrageFinale"
            type="number"
            inputProps={{ autoComplete: "off", min: 0 }}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Nombre de jour"
            name="nombreJour"
            type="number"
            min="0"
            inputProps={{ autoComplete: "off", min: 0 }}
            value={formikProps.values.nombreJour}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Prix unitaire"
            variant="outlined"
            name="pu"
            type="number"
            min="0"
            inputProps={{ autoComplete: "off", min: 0 }}
            value={formikProps.values.pu}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Montant"
            variant="outlined"
            value={formikProps.values.montant}
            name="montant"
            type="number"
            min="0"
            onChange={(event: any) =>
              formikProps.setFieldValue("montant", parseInt(event.target.value))
            }
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} margin={2}>
        <OSTextField
          id="outlined-basic"
          label="Motif"
          variant="outlined"
          name="motif"
          type="text"
          inputProps={{ autoComplete: "off" }}
        />
        <OSSelectField
          id="outlined-basic"
          label="Fournisseur"
          variant="outlined"
          options={vendors}
          dataKey={["name"]}
          valueKey="id"
          name="fournisseur"
        />
      </Stack>
      <Stack direction="row" spacing={3} margin={2}>
        <OSSelectField
          id="outlined-basic"
          label="Grant"
          variant="outlined"
          options={grantList}
          dataKey={["code"]}
          valueKey="id"
          name="grant"
        />
        <OSSelectField
          id="outlined-basic"
          label="Ligne budgétaire"
          variant="outlined"
          options={budgetLineList}
          dataKey={["code"]}
          valueKey="id"
          name="ligneBudgetaire"
          type="text"
        />
        <OSTextField
          id="outlined-basic"
          label="Itinéraire"
          variant="outlined"
          name="itineraire"
          type="text"
          inputProps={{ autoComplete: "off" }}
        />
      </Stack>
    </Form>
  );
};

export default LocationForm;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
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
