import { Form, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { Box, Button, Divider, FormControl, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import OSTextField from '../../../shared/input/OSTextField';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import { ArrowBack } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import OSDatePicker from '../../../shared/date/OSDatePicker';
import useFetchTransportationEquipments from '../../hooks/useFetchTransportationEquipments';
import OSSelectField from '../../../shared/select/OSSelectField';

const FormBonVoiture = ({ formikProps, valuesArticle, setValuesArticle, setIdDelete }: { formikProps: FormikProps<any>, valuesArticle: any, setValuesArticle: any, setIdDelete: any }) => {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const [idValues, setIdValues] = useState<any>()

    const { isEditing } = useAppSelector((state) => state.carVoucher);
    const fetchTransportEquipment = useFetchTransportationEquipments()
    const { transportationEquipments } = useAppSelector((state) => state.transportationEquipment)

    const listMateriel: { id: string, name: string }[] = [];

    if (transportationEquipments.length > 0) {
        transportationEquipments.forEach((element: any) => {
            if (element["status"] === "Location interne") {
                listMateriel.push({ id: element.id, name: element.registration });
            }
        });
    } else {
        console.log("Rien")
    }
    useEffect(()=>{
        fetchTransportEquipment()
    },[])
    
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
                                route.back()
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
                            {isEditing ? "Modifier" : "Enregistrer"}
                        </Button>
                        <Button
                            variant="text"
                            color="warning"
                            size="small"
                            type="reset"
                            startIcon={<Close />}
                            onClick={() => {
                                formikProps.resetForm();
                            }}
                        >
                            Annuler
                        </Button>
                    </Stack>
                    <Typography variant="h4">
                        {isEditing ? "Modifier" : "Ajouter"} Entretien
                    </Typography>
                </SectionNavigation>
                <Divider />
            </NavigationContainer>
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
                        Entretien
                    </Typography>
                </Stack>
                <FormContainer spacing={2}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <OSSelectField
                            fullWidth
                            id="outlined-basic"
                            label="matériel"
                            variant="outlined"
                            options={listMateriel}
                            dataKey={["name"]}
                            valueKey="id"
                            name="materiel"
                        />
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label="Référence"
                            variant="outlined"
                            name="reference"
                        />
                        <OSDatePicker
                            fullWidth
                            id="outlined-basic"
                            label="Date"
                            variant="outlined"
                            value={formikProps.values.date}
                            onChange={(value: any) => formikProps.setFieldValue("date", value)}
                        />

                    </Stack>
                </FormContainer>
            </FormContainer>
            <Box>
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
                            Activités
                        </Typography>
                    </Stack>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Activité</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell align="left">Prix unitaire</TableCell>
                                    <TableCell align="left">Montant</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {valuesArticle.map((item: any, index: any) => (
                                    <TableRow
                                        key={index}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{item.activite}</TableCell>
                                        <TableCell align="left">{item.nombre}</TableCell>
                                        <TableCell align="left">{item.pu}  Ar</TableCell>
                                        <TableCell align="left">{item.montants}</TableCell>
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
                                                <IconButton
                                                    color="warning"
                                                    aria-label="Supprimer"
                                                    component="span"
                                                    size="small"
                                                    onClick={() => {
                                                        formikProps.setFieldValue('activite', item.activite);
                                                        formikProps.setFieldValue('nombre', item.nombre);
                                                        formikProps.setFieldValue('pu', item.pu);
                                                        formikProps.setFieldValue('montants', item.nombre * item.pu);
                                                        setIdValues(item.id)
                                                    }}
                                                >
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                                <IconButton
                                                    color="warning"
                                                    aria-label="Supprimer"
                                                    component="span"
                                                    size="small"
                                                    onClick={() => {
                                                        setIdDelete((prev: any[]) => {
                                                            let temp = [...prev]
                                                            temp.push({
                                                                id: item.id
                                                            })
                                                            return temp
                                                        })
                                                        setValuesArticle((prev: any[]) => {
                                                            let temp = [...prev]
                                                            temp.splice(index, 1)
                                                            return temp
                                                        })
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow
                                    key="index"
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="activite"
                                                label="Activité"
                                                name="activite"
                                                type="text"
                                            />
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="nombre"
                                                label="Nombre"
                                                name="nombre"
                                                type="number"
                                                min="0"
                                            />
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="pu"
                                                label="PU"
                                                name="pu"
                                                type="number"
                                                min="0"
                                            />
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="montant"
                                                label="Montant"
                                                value={formikProps.values.nombre * formikProps.values.pu}
                                                onChange={(value: any) =>formikProps.setFieldValue("montants", value)}
                                                name="montants"
                                                type="number"
                                                min="0"
                                            />
                                        </FormControl>
                                    </TableCell>
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
                                            <IconButton
                                                type="button"
                                                onClick={() => {
                                                    const activite = formikProps.values.activite;
                                                    const nombre = formikProps.values.nombre;
                                                    const pu = formikProps.values.pu;
                                                    const montants = formikProps.values.nombre * formikProps.values.pu;

                                                    if (activite.trim() !== '') {
                                                        if (idValues) {
                                                            setValuesArticle((prev: any[]) => {
                                                                let temp = [...prev.map((ValId) => {
                                                                    if (ValId.id === idValues) {
                                                                        return {
                                                                            id: idValues,
                                                                            activite,
                                                                            pu,
                                                                            nombre,
                                                                            montants
                                                                        }
                                                                    }
                                                                    return ValId
                                                                })]
                                                                return temp
                                                            })
                                                        } else {
                                                            setValuesArticle((prev: any[]) => {
                                                                let temp = [...prev]
                                                                temp.push({
                                                                    activite,
                                                                    nombre,
                                                                    pu,
                                                                    montants
                                                                })
                                                                return temp
                                                            })
                                                        }
                                                        formikProps.setFieldValue('activite', '');
                                                        formikProps.setFieldValue('nombre', 0);
                                                        formikProps.setFieldValue('pu', 0);
                                                        formikProps.setFieldValue('montants', 0);
                                                    }

                                                }}
                                            >
                                                <Check color="primary" />
                                            </IconButton>
                                            <IconButton
                                                type="button"
                                                onClick={() => {
                                                    formikProps.setFieldValue('activite', '');
                                                    formikProps.setFieldValue('nombre', 0);
                                                    formikProps.setFieldValue('pu', 0);
                                                    formikProps.setFieldValue('montants', 0);
                                                }}
                                            >
                                                <Close />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormContainer>
            </Box>
        </Form>
    )
}

export default FormBonVoiture;

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    borderRadius: 20,
    background: "#fff",
    marginBottom: 30,
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