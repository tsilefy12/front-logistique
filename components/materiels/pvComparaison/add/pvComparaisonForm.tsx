import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextField from "../../../shared/input copy/OSTextField";
import { cancelEdit } from "../../../../redux/features/vendor/vendorSlice";
import { rows } from "./constante";
import {
  createBonCommandeInterne,
} from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";

export default function PvComparaisonForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const { isEditing,bonCommandeInterne } = useAppSelector((state) => state.bonCommandeInterne);

    const status = [
        { id: "PENDING", value: "En attente" },
        { id: "APPROVED", value: "Approuvé" },
        { id: "REJECTED", value: "Refusé" },
    ];

    const handleSubmit = async (values: any) => {
        values.deliveryDate = new Date(values?.deliveryDate).toISOString();
        try {
        if (isEditing) {
            // await dispatch(
            //   updateConsumable({
            //     id: consumable.id!,
            //     consumable: values,
            //   })
            // );
        } else {
            await dispatch(createBonCommandeInterne(values));
        }
        route.push("/fournitures_et_consommables/commande");
        } catch (error) {
        console.log("error", error);
        }
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
                <Formik
                    enableReinitialize
                    initialValues={
                    isEditing
                        ? bonCommandeInterne
                        : {
                            programme: isEditing ? bonCommandeInterne?.programme : "",
                            grant: isEditing ? bonCommandeInterne?.grant : "",
                            ligneBudgetaire: isEditing ? bonCommandeInterne?.ligneBudgetaire : "",
                            numBon: isEditing ? bonCommandeInterne?.numBon : "",
                            demandeur: isEditing
                            ? bonCommandeInterne?.demandeur
                            : "",
                            dateBonCommande: isEditing ? bonCommandeInterne?.dateBonCommande : new Date(),
                            numBonCommande: isEditing ? bonCommandeInterne?.numBonCommande : "",
                            status: "PENDING",
                        }
                    }
                    validationSchema={Yup.object({
                    item: Yup.string().required("Champ obligatoire"),
                    applicantId: Yup.string().required("Champ obligatoire"),
                    requestedQuantity: Yup.number().required("Champ obligatoire"),
                    deliveredQuantity: Yup.number().required("champ obligatoire"),
                    deliveryDate: Yup.date().required(
                        "Veuillez choisir la date de livraison"
                    ),
                    status: Yup.string().required("Champ obligatoire"),
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
                                        <Link href="/materiels/commande">
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
                                    <Typography variant="h4">
                                        {isEditing ? "Modifier" : "Ajouter"} Pv de Comparaison Offre
                                    </Typography>
                                    </SectionNavigation>
                                    <Divider />
                                </NavigationContainer>
                                <FormContainer spacing={2}>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        spacing={2}
                                        >
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="designation"
                                                label="Objet"
                                                name="designation"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="designation"
                                                label="Ref BCI/BCE"
                                                name="designation"
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
                                            <OSTextField
                                                id="designation"
                                                label="Programme/Projet"
                                                name="designation"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="designation"
                                                label="Grant"
                                                name="designation"
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
                                            <OSTextField
                                            id="Demandeur"
                                            label="Ligne Budgétaire"
                                            name="Demandeur"
                                            type="number"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="Demandeur"
                                                label="Matériel"
                                                name="Demandeur"
                                                type="number"
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
                                        <OSTextField
                                        id="numberOfAuthorisedOffersPossible"
                                        label="Offres Retenu"
                                        name="ligneBudegetaire"
                                        type="text"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                    <OSTextField
                                        id="numberOfAuthorisedOffersPossible"
                                        label="Argument"
                                        name="ligneBudegetaire"
                                        type="text"
                                        />
                                    </FormControl>
                                    </Stack>
                                    <OSTextField
                                        id="numberOfAuthorisedOffersPossible"
                                        label="Justification"
                                        name="ligneBudegetaire"
                                        type="text"
                                    />
                                </FormContainer>
                            </Form>
                        );
                    }}
                </Formik>
            </Container>
            <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Field name="name" label="Name" as={TextField} />
          </div>
          <div>
            <Field name="email" label="Email" as={TextField} />
          </div>
          <FieldArray name="items">
            {({ push, remove }) => (
              <div>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Items</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Field name={`items.${index}`} as={TextField} />
                          </TableCell>
                          <TableCell>
                            <Button type="button" onClick={() => remove(index)}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button type="button" onClick={() => push('')}>Add Item</Button>
              </div>
            )}
          </FieldArray>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
            <FormContainer spacing={2}>
                <Stack
                    direction="row"
                    sx={{
                        flex: "1 1 100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    >
                    <Typography variant="h6" id="tableTitle" component="div">
                        Comparaison
                    </Typography>
                </Stack>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Fournisseur</TableCell>
                                <TableCell align="left">Mode de Paie</TableCell>
                                <TableCell align="left">Offres</TableCell>
                                <TableCell align="left">Désignation</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.numero}</TableCell>
                                    <TableCell align="left">{row.designation}</TableCell>
                                    <TableCell align="left">{row.date_acquisition}</TableCell>
                                    <TableCell align="left">{row.valeur_acquisition} Ar</TableCell>

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
                                        {/* <EditIcon color="primary" />
                                        <DeleteIcon color="warning" /> */}
                                    </Stack>
                                    </TableCell>
                                </TableRow>
                            ))} 
                        </TableBody>
                    </Table>
                </TableContainer>
            </FormContainer>
        </>
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