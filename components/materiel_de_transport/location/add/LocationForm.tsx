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
  React.useEffect(() => {
    fetchGrant();
    fetchVendors();
    fetchMateriels();
    fetchEmploye();
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
            {isEditing ? "Modifier" : "Ajouter"}
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
          options={employees}
          dataKey={"name"}
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
          <OSTextField
            id="outlined-basic"
            label="Référence budgetaire"
            name="referenceBudgetaire"
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
            label="prix unitaire"
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
            value={
              (formikProps.values.nombreJour ?? 0) *
              (formikProps.values.pu ?? 0)
            }
            name="montant"
            type="number"
            min="0"
            disabled
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} margin={2}>
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
          label="Ligne budgetaire"
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
