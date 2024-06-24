import {
  Button,
  Container,
  styled,
  Typography,
  FormControl,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { Form, Formik, FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { getEmployees } from "../../../../redux/features/equipment";
import { useRouter } from "next/router";
import { cancelEdit } from "../../../../redux/features/equipment/equipmentSlice";
import { getFournisseurList } from "../../../../redux/features/fournisseur/useCase/getFournisseurListe";
import { getTypeEquipmentList } from "../../../../redux/features/typeEquipment";
import { getBonCommandeInternes } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";

const FormArticle = ({ formikProps }: { formikProps: FormikProps<any> }) => {
  const dispatch = useAppDispatch();
  const etat = [
    { name: "GOOD", french: "Bon etat" },
    { name: "BAD", french: "Mauvais" },
    { name: "BROKEN", french: "inutilisable" },
  ];
  const route = useRouter();

  const { employees, isEditing, equipment } = useAppSelector(
    (state) => state.equipment
  );
  const { fournisseurList } = useAppSelector((state) => state.fournisseur);
  const { typeEquipmentList } = useAppSelector((state) => state.typeEquipment);
  const { bonCommandeInternes } = useAppSelector(
    (state) => state.bonCommandeInterne
  );
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);

  const fetchUtilsData = () => {
    dispatch(getFournisseurList({}));
    dispatch(getEmployees({}));
    dispatch(getTypeEquipmentList({}));
    dispatch(getBonCommandeInternes({}));
    dispatch(getGrantList({}));
  };

  useEffect(() => {
    fetchUtilsData();
  }, []);

  useEffect(() => {
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
            <Link href="/materiels/informatiques">
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
            {isEditing ? "Modifier" : "Ajouter"} materiels
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
            label="code"
            variant="outlined"
            name="numOptim"
          />
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Catégorie"
              name="typeEquipmentId"
              options={typeEquipmentList.map((e: any) => ({
                ...e,
                prefix: " - " + e.prefix,
              }))}
              dataKey={["type", "prefix"]}
              valueKey="id"
              type="text"
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
        <CustomStack
          direction={{
            xs: "column",
            sm: "column",
            md: "row",
          }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Employé utilisateur"
              name="ownerId"
              options={employees}
              dataKey={["matricule", "name", "surname"]}
              valueKey="id"
              type="text"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              name="fournisseur"
              label="Fournisseur"
              options={fournisseurList}
              dataKey={["name"]}
              valueKey="id"
              type="text"
            />
          </FormControl>
        </CustomStack>
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
            name="acquisitionDate"
            value={formikProps.values.acquisitionDate}
            onChange={(value: any) =>
              formikProps.setFieldValue("acquisitionDate", value)
            }
          />
          <OSTextField
            name="acquisitionValue"
            fullWidth
            id="outlined-basic"
            label="Valeur d'acquisition"
            variant="outlined"
            type="number"
            min="0"
          />
          <OSSelectField
            id="outlined-basic"
            label="BCI"
            name="bci"
            options={bonCommandeInternes}
            dataKey={["reference"]}
            valueKey="id"
            type="text"
          />
          {/* <OSTextField
                name="additionalInformation"
                fullWidth
                id="outlined-basic"
                label="Information suplémentaire"
                variant="outlined"
            /> */}
        </CustomStack>
        <Stack direction="row" spacing={3}>
          <OSTextField
            name="designation"
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <OSTextField
            name="dureAmortissement"
            fullWidth
            id="outlined-basic"
            label="Durée d'amortissement"
            variant="outlined"
            type="number"
            min="0"
          />
          <OSDatePicker
            name="dateAmortissement"
            fullWidth
            id="outlined-basic"
            label="Date d'amortissement"
            variant="outlined"
            value={formikProps.values.dateAmortissement}
            onChange={(value: any) =>
              formikProps.setFieldValue("dateAmortissement", value)
            }
          />
        </Stack>
        <Stack direction="row" spacing={3}>
          <OSSelectField
            id="outlined-basic"
            name="grant"
            label="Grant"
            options={grantList}
            dataKey={["code"]}
            valueKey="id"
            type="text"
          />
          <OSSelectField
            id="outlined-basic"
            name="ligneBudgetaire"
            label="Ligne budgétaire"
            options={budgetLineList}
            dataKey={["code"]}
            valueKey="id"
            type="text"
          />
          {/* <OSSelectField
                    id="outlined-basic"
                    name="categorieMateriel"
                    label="Catégorie Matériel"
                    options={categorie}
                    dataKey={["name"]}
                    valueKey="id"
                    type="text"
                /> */}
        </Stack>
      </FormContainer>
    </Form>
  );
};

export default FormArticle;

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
