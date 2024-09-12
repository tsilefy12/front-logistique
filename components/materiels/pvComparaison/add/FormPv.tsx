import Delete from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Form, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSTextField from "../../../shared/input/OSTextField";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  getBonCommandeInterne,
  getBonCommandeInternes,
} from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import {
  getBonCommandeExterne,
  getBonCommandeExternes,
} from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";
import { getEquipments } from "../../../../redux/features/equipment";
import { getFournisseurList } from "../../../../redux/features/fournisseur";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { cancelEdit } from "../../../../redux/features/pvComparaison/pvComparaisonSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getPrograms } from "../../../../redux/features/program/programSlice";
import { enqueueSnackbar } from "../../../../redux/features/notification/notificationSlice";
import useFetchModePaiementList from "../../../configurations/mode-paiement/hooks/useFetchUniteStock";

const FormPv = ({
  formikProps,
  valuesArticle,
  setValuesArticle,
}: {
  formikProps: FormikProps<any>;
  valuesArticle: any;
  setValuesArticle: any;
}) => {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const [idValues, setIdValues] = useState<any>({});
  const [materiel, setMateriel] = useState<any[]>([]);
  const { fournisseurList } = useAppSelector((state) => state.fournisseur);
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const { bonCommandeExternes } = useAppSelector(
    (state) => state.bonCommendeExterne
  );
  const { bonCommandeInternes } = useAppSelector(
    (state) => state.bonCommandeInterne
  );
  const { programs } = useAppSelector((state) => state.program);
  const { isEditing } = useAppSelector(
    (state) => state.pvComparaisonFournisseurs
  );
  const fetchModePaiementList = useFetchModePaiementList();
  const { modePaiements } = useAppSelector((state) => state.modePaiement);

  const total = [
    ...bonCommandeExternes.map((i: any) => {
      return {
        id: i.id,
        name: i.ref,
        type: "BCE",
      };
    }),
    ...bonCommandeInternes.map((i: any) => {
      return {
        id: i.id,
        name: i.reference,
        type: "BCI",
      };
    }),
  ];

  const fetchUtilsData = () => {
    dispatch(getBonCommandeInternes({}));
    dispatch(getBonCommandeExternes({}));
    dispatch(getEquipments({}));
    dispatch(getFournisseurList({}));
    dispatch(getGrantList({}));
    dispatch(getPrograms({}));
    fetchModePaiementList();
  };

  const optionsOffres = valuesArticle.map((item: any, index: any) => ({
    index: index,
    value: item.fournisseur,
    label: `Offre N°${index + 1} : ${item.fournisseurName}`,
  }));

  useEffect(() => {
    fetchUtilsData();
  }, []);

  const handleFech = async (id: any) => {
    try {
      const response: any = total.find((e: any) => e.id === id);
      formikProps.setFieldValue("type", response?.type);
      if (response?.type === "BCE") {
        const Val = await dispatch(
          getBonCommandeExterne({
            id,
            args: {
              include: {
                articleCommandeBce: true,
              },
            },
          })
        );
        setMateriel(() => Val.payload.articleCommandeBce);
      } else {
        const Val = await dispatch(
          getBonCommandeInterne({
            id,
            args: {
              include: {
                ArticleCommande: true,
              },
            },
          })
        );
        setMateriel(() => Val.payload.ArticleCommande);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const id = formikProps.values.ref;
    if (id) {
      handleFech(id);
    }
  }, [formikProps.values.ref]);

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

  const [selectedMateriels, setSelectedMateriels] = useState<any[]>([]);

  return (
    <Form>
      <Stack flexDirection={"row"}>
        <Button
          color="info"
          variant="text"
          startIcon={<ArrowBack />}
          onClick={() => {
            route.back();
            formikProps.resetForm();
            dispatch(cancelEdit());
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
          type="reset"
          startIcon={<Close />}
          onClick={() => {
            formikProps.resetForm();
            dispatch(cancelEdit());
          }}
        >
          Annuler
        </Button>
      </Stack>
      <Divider />
      <Box>
        <Stack
          direction="row"
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">PV de comparaison d'offre</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <FormControl fullWidth>
            <OSTextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              label="Objet"
              name="objet"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Ref BCI/BCE"
              name="ref"
              options={total}
              dataKey={["name", "type"]}
              valueKey="id"
              type="text"
            />
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Programme"
              name="programme"
              options={programs}
              dataKey="name"
              valueKey="id"
              type="text"
            />
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Grant"
              name="grant"
              options={grantList}
              dataKey="code"
              valueKey="id"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Ligne Budgétaire"
              name="ligneBudgetaire"
              options={budgetLineList}
              dataKey="code"
              valueKey="id"
            />
          </FormControl>
        </Stack>
      </Box>
      <Box>
        <Stack
          direction="row"
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Comparaison d'offres</Typography>
        </Stack>
        <Autocomplete
          multiple
          id="tags-standard"
          options={materiel}
          getOptionLabel={(option: any) => option.nom}
          onChange={(event, value) => setSelectedMateriels(value)}
          value={selectedMateriels}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Matériel" />
          )}
        />
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Article</TableCell>
                <TableCell>Offre 1</TableCell>
                <TableCell>Offre 2</TableCell>
                <TableCell>Offre 3</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materiel.map((materielItem, index) => (
                <TableRow key={index}>
                  <TableCell>{materielItem.nom}</TableCell>
                  {optionsOffres.map((offre: any) => (
                    <TableCell key={offre.index}>
                      <Checkbox
                        checked={selectedMateriels.includes(
                          `${materielItem.nom}-${offre.value}`
                        )}
                        onChange={(e) => {
                          const value = `${materielItem.nom}-${offre.value}`;
                          setSelectedMateriels((prev) =>
                            e.target.checked
                              ? [...prev, value]
                              : prev.filter((item) => item !== value)
                          );
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Form>
  );
};

export default FormPv;
