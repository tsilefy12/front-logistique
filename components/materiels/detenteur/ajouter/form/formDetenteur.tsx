import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { Form, FormikProps } from "formik";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import OSSelectField from "../../../../shared/select/OSSelectField";
import OSTextField from "../../../../shared/input copy/OSTextField";
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { getEquipment } from "../../../../../redux/features/equipment/useCases/getEquipment";
import {
  getEmployees,
  getEquipments,
} from "../../../../../redux/features/equipment";
import { getInterns } from "../../../../../redux/features/employeStagiaire/stagiaireSlice";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { getPrograms } from "../../../../../redux/features/program/programSlice";
import useFetchPrestataire from "../../../bon_commande_externe/hooks/getPrestataire";
import useFetchWorkPlace from "../../../bon_commande_externe/hooks/useFetchWorkPlace";

const FormDetenteur = ({
  formikProps,
  valuesArticle,
  setValuesArticle,
}: {
  formikProps: FormikProps<any>;
  valuesArticle: any;
  setValuesArticle: any;
}) => {
  const route = useRouter();
  const { isEditing, holder } = useAppSelector((state) => state.holder);
  const { programs } = useAppSelector((state) => state.program);

  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employe);
  const { interns } = useAppSelector((state) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const { workplaces } = useAppSelector((state) => state.workplace);
  const fetchWorkPlace = useFetchWorkPlace();
  const total = [
    ...employees.map((i: any) => {
      return {
        id: i.id,
        matricule: i.matricule,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "employe",
        contact: i.phone,
        lieuTravail: i.workplaceId,
      };
    }),
    ...interns.map((i: any) => {
      return {
        id: i.id,
        matricule: i.matricule,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "intern",
        contact: i.phone,
        lieuTravail: i.workplaceId,
      };
    }),
    ...prestataireListe.map((i: any) => {
      return {
        id: i.id,
        matricule: i.matricule,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "prestataire",
        contact: i.phone,
        lieuTravail: i.workplaceId,
      };
    }),
  ];

  const { equipments } = useAppSelector((state) => state.equipment);

  const fetchUtilsData = () => {
    dispatch(getEquipments({}));
    dispatch(getEmployees({}));
    dispatch(getInterns({}));
    dispatch(getPrograms({}));
    fetchPrestataire();
    fetchWorkPlace();
  };

  useEffect(() => {
    fetchUtilsData();
  }, []);

  const handleChange = async (id: string) => {
    const response: any = await dispatch(getEquipment({ id }));
    setValuesArticle((prev: any[]) => {
      let temp = [...prev];
      temp.push({
        equipmentId: response.payload.id,
        numOptim: response.payload.numOptim,
        designation: response.payload.designation,
        acquisitionValue: response.payload.acquisitionValue,
        acquisitionDate: response.payload.acquisitionDate,
      });
      return temp;
    });
  };

  useEffect(() => {
    if (formikProps.values.numOptim) {
      handleChange(formikProps.values.numOptim);
    }
  }, [formikProps.values.numOptim]);

  useEffect(() => {
    if (formikProps.values.name) {
      const Val: any = total.find((e: any) => e.id === formikProps.values.name);
      formikProps.setFieldValue("type", Val?.type);
      formikProps.setFieldValue("matricule", Val?.matricule);
      formikProps.setFieldValue("contact", Val?.contact);
    }
  }, [formikProps.values.name]);

  useEffect(() => {
    const name = total.find(
      (e: any) => e.id === formikProps.values.name
    )?.lieuTravail;
    if (name) {
      const lieuTravail = workplaces.find((e: any) => e.id === name)?.name;
      let referenceTana = "DEM/TNR-001";
      let referenceDiego = "DEM/DS-001";
      let referenceAmbatondrazaka = "BCI/AZK-001";
      let referenceMoramanga = "DEM/MRG-001";
      let referenceMorondava = "DEM/MRD-001";
      if (lieuTravail === "Antananarivo" || lieuTravail === "Tana") {
        formikProps.setFieldValue("reference", referenceTana);
      } else if (lieuTravail === "Diego Garcia") {
        formikProps.setFieldValue("reference", referenceDiego);
      } else if (lieuTravail === "Ambatondrazaka") {
        formikProps.setFieldValue("reference", referenceAmbatondrazaka);
      } else if (lieuTravail === "Morondava") {
        formikProps.setFieldValue("reference", referenceMorondava);
      } else if (lieuTravail === "Mormanga") {
        formikProps.setFieldValue("reference", referenceMoramanga);
      } else {
        formikProps.setFieldValue(
          "reference",
          `DEM/${lieuTravail!.slice(0, 3)}-001`
        );
      }
    }
  }, [formikProps.values.name, total, workplaces]);

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
                route.back();
                formikProps.resetForm();
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
            >
              Annuler
            </Button>
          </Stack>
          <Typography variant="h4">
            {isEditing ? "Modifier" : "Ajouter"} détenteur de materiels
          </Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <FormContainer spacing={2}>
        <OSTextField
          id="outlined-basic"
          label="Réference"
          name="reference"
          variant="outlined"
        />

        <Typography variant="h6">Detenteur</Typography>

        <Stack spacing={2} direction="row">
          <OSSelectField
            id="outlined-basic"
            label="Nom et Prénom"
            options={total}
            name="name"
            variant="outlined"
            valueKey={"id"}
            dataKey={"name"}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <OSTextField
            id="outlined-basic"
            label="Matricule"
            name="matricule"
            variant="outlined"
          />
          <OSTextField
            id="outlined-basic"
            label="Contact"
            name="contact"
            variant="outlined"
          />
          <OSSelectField
            id="outlined-basic"
            label="Programme"
            name="function"
            options={programs}
            dataKey="name"
            valueKey="name"
          />
        </Stack>
      </FormContainer>
      <Box>
        <MyTableContainer>
          <Stack
            direction="row"
            sx={{
              flex: "1 1 100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" id="tableTitle" component="div">
              Matériel
            </Typography>
            <Stack direction="row" spacing={2}>
              <OSSelectField
                id="contracType"
                name="numOptim"
                label="Choisir un code"
                options={equipments}
                dataKey="numOptim"
                sx={{ width: "100%" }}
                valueKey="id"
              />
            </Stack>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell align="left">Désignation</TableCell>
                  <TableCell align="left">Date acquisition</TableCell>
                  <TableCell align="left">Valeur acquisition</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesArticle.map((row: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.numOptim}
                    </TableCell>
                    <TableCell align="left">{row.designation}</TableCell>
                    <TableCell align="left">
                      <Moment format="DD/MM/YYYY">{row.acquisitionDate}</Moment>
                    </TableCell>
                    <TableCell align="left">{row.acquisitionValue}</TableCell>
                    <TableCell
                      align="center"
                      sx={{ width: 150, background: "#F5F5F5" }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <EditIcon color="primary" />
                        <IconButton
                          color="warning"
                          aria-label="Supprimer"
                          component="span"
                          size="small"
                          onClick={() => {
                            setValuesArticle((prev: any[]) => {
                              let temp = [...prev];
                              temp.splice(index, 1);
                              return temp;
                            });
                          }}
                        >
                          <DeleteIcon color="warning" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MyTableContainer>
      </Box>
    </Form>
  );
};
export default FormDetenteur;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
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

const MyTableContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  width: "100%",
  marginBottom: theme.spacing(10),
}));
