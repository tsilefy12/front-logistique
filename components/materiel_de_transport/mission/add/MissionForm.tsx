import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  Stack,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, FormikProps } from "formik";
import * as Yup from "yup";
import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import OSTextField from "../../../shared/input copy/OSTextField";

import {
  cancelEdit,
  editMissionDeTransport,
} from "../../../../redux/features/mission_transport/missionTransportSlice";
import useFetchMissionTransport from "../hooks/useFectMission";
import useFetchGrant from "../../suivi_carburant/hooks/useFetchGrant";
import useFetchLigneBudgetaire from "../../suivi_carburant/hooks/useFetchLigneBudgetaire";
import OSSelectField from "../../../shared/select/OSSelectField";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";

const MissionForm = ({ formikProps }: { formikProps: FormikProps<any> }) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = route.query;
  const { isEditing } = useAppSelector((state) => state.missionDeTransport);
  const fetchMissionTransport = useFetchMissionTransport();
  const fetchGrant = useFetchGrant();
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const fetchMateriels = useFetchTransportationEquipments();
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );

  React.useEffect(() => {
    fetchGrant();
    fetchMissionTransport();
    fetchMateriels();
    if (id) {
      dispatch(editMissionDeTransport({ id }));
    }
  }, [id]);
  const ListMateriel: { id: string; name: string }[] = [];

  if (transportationEquipments.length > 0) {
    transportationEquipments.forEach((element: any) => {
      if (element["status"] === "Location interne") {
        ListMateriel.push({ id: element.id, name: element.registration });
      }
    });
  } else {
    ListMateriel.push({ id: "aucun", name: "aucun" });
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

  return (
    <Form>
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Link href="/materiel_de_transport/mission/">
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
            {isEditing ? "Modifier" : "Nouveau"} location interne
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
          options={ListMateriel}
          dataKey="name"
          valueKey="id"
          name="materiel"
        />
        <OSTextField
          fullWidth
          id="outlined-basic"
          label="Référence budgétaire"
          variant="outlined"
          name="pj"
          inputProps={{ autoComplete: "off" }}
        />
      </Stack>
      <Stack direction="row" spacing={3} margin={2}>
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
          <OSTextField
            id="outlined-basic"
            label="Libellé"
            name="libelle"
            inputProps={{ autoComplete: "off" }}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Utilisateur"
            name="utilisateur"
            type="text"
            inputProps={{ autoComplete: "off" }}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={3} margin={2}>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Nombre de jour"
            name="nombreJour"
            type="number"
            min="0"
            inputProps={{ autoComplete: "off", min: 0 }}
            value={formikProps.values.nombreJour}
            onChange={(event: any) => {
              const newValue = parseInt(event.target.value);
              formikProps.setFieldValue("nombreJour", newValue);
              const newMontant = newValue * (formikProps.values.pu ?? 0);
              formikProps.setFieldValue("montant", newMontant);
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
            min="0"
            inputProps={{ autoComplete: "off", min: 0 }}
            value={formikProps.values.pu}
            onChange={(event: any) => {
              const newValue = parseInt(event.target.value);
              formikProps.setFieldValue("pu", newValue);
              const newMontant =
                (formikProps.values.nombreJour ?? 0) * newValue;
              formikProps.setFieldValue("montant", newMontant);
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <OSTextField
            id="outlined-basic"
            label="Montant"
            variant="outlined"
            name="montant"
            value={
              (formikProps.values.nombreJour ?? 0) *
              (formikProps.values.pu ?? 0)
            }
            type="number"
            min="0"
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
      </Stack>
    </Form>
  );
};
export default MissionForm;

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
