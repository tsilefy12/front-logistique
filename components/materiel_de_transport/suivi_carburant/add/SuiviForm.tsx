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
import { Form, FormikProps } from "formik";
import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import OSTextField from "../../../shared/input copy/OSTextField";

import { cancelEdit } from "../../../../redux/features/car-voucher/carVoucherSlice";
import useFetchGrant from "../hooks/useFetchGrant";
import OSSelectField from "../../../shared/select/OSSelectField";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";
import useFetchModePaiementList from "../../../configurations/mode-paiement/hooks/useFetchUniteStock";

const SuiviForm = ({ formikProps }: { formikProps: FormikProps<any> }) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { isEditing } = useAppSelector((state) => state.suiviCarburant);

  const fetchGrant = useFetchGrant();
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const fetchMateriels = useFetchTransportationEquipments();
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const fetchModePaiementList = useFetchModePaiementList();
  const { modePaiements } = useAppSelector((state) => state.modePaiement);
  React.useEffect(() => {
    fetchGrant();
    fetchMateriels();
    fetchModePaiementList();
  }, []);

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

  React.useEffect(() => {
    formikProps.setFieldValue(
      "pu",
      transportationEquipments.find((e) => e.id === formikProps.values.materiel)
        ?.typeEquipment?.unitPrice
    );
    if (
      typeof formikProps.values.kilometrageFinal === "number" &&
      typeof formikProps.values.pu === "number" &&
      transportationEquipments.find((e) => e.id === formikProps.values.materiel)
    ) {
      const newValue =
        (formikProps.values.kilometrageFinal -
          transportationEquipments.find(
            (e) => e.id === formikProps.values.materiel
          )!.kilometrageActuel!) *
        formikProps.values.pu;
      if (newValue < 0) {
        formikProps.setFieldValue("montant", 0);
      } else {
        formikProps.setFieldValue("montant", newValue);
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
        <OSSelectField
          name="materiel"
          options={transportationEquipments}
          dataKey={"registration"}
          valueKey="id"
          label="Matériel"
        />
        <OSDatePicker
          fullWidth
          id="outlined-basic"
          label="Date"
          variant="outlined"
          value={formikProps.values.date}
          onChange={(value: any) => formikProps.setFieldValue("date", value)}
          name="date"
        />
      </Stack>
      <Stack direction="row" spacing={2} margin={2}>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Itinéraire"
            variant="outlined"
            name="itineraire"
            inputProps={{ autoComplete: "off" }}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Personne transporté"
            name="personnelTransporte"
            inputProps={{ autoComplete: "off" }}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} margin={2}>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Kilométrage final"
            name="kilometrageFinal"
            type="number"
            inputProps={{ autoComplete: "off", min: 0 }}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Prix unitaire"
            variant="outlined"
            name="pu"
            type="number"
            disabled
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Montant"
            variant="outlined"
            name="montant"
            disabled
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
            label="Ligne budgétaire"
            variant="outlined"
            options={budgetLineList}
            dataKey={["code"]}
            valueKey="id"
            name="ligneBudgetaire"
            type="text"
          />
        </FormControl>
        <FormControl fullWidth>
          <OSSelectField
            id="outlined-basic"
            label="Mode paiement"
            variant="outlined"
            name="modePaiement"
            type="text"
            options={modePaiements}
            dataKey={"modePaiementMV"}
            valueKey="modePaiementMV"
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={3}>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Motif"
            variant="outlined"
            name="motif"
            inputProps={{ autoComplete: "off" }}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Localisation"
            variant="outlined"
            name="localisation"
            inputProps={{ autoComplete: "off" }}
          />
        </FormControl>
      </Stack>
    </Form>
  );
};

export default SuiviForm;

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
