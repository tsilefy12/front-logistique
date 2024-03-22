import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { Form, FormikProps } from 'formik';
import { Box, Button, Divider, FormControl, IconButton, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import OSTextField from '../../../shared/input/OSTextField';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { cancelEdit } from '../../../../redux/features/bon_reception/bonReceptionSlice';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import OSSelectField from '../../../shared/select/OSSelectField';
import OSDatePicker from '../../../shared/date/OSDatePicker';
import { getBonCommandeExterne, getBonCommandeExternes } from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";

const FormBonReception = ({formikProps,valuesArticle}: {formikProps: FormikProps<any>,valuesArticle:any}) => {
    const dispatch = useAppDispatch();
    const { isEditing } = useAppSelector((state) => state.bonReceptions);
    const { bonCommandeExternes } = useAppSelector((state) => state.bonCommendeExterne);
    const fetchUtilsData = () => {
        dispatch(getBonCommandeExternes({}));
    };
    
    useEffect(() => {
        fetchUtilsData();
    }, []);
    useEffect(() => {
        const id = formikProps.values.bce
        const Val:any = dispatch(getBonCommandeExterne({ id , args:{
            include:{
                articleCommandeBce:true
            }
        }}));
        Val.articleCommandeBce?.forEach((element:any, index:any) => {
            const newData = {
                designation: element.designation,
                quantite:element.quantite,
            };
            valuesArticle.push(newData)
        });
    }, [formikProps.values.bce]);
    
    return (
        <Form>
            <NavigationContainer>
                <SectionNavigation>
                <Stack flexDirection={"row"}>
                    <Link href="/materiels/bon_reception">
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
                    {isEditing ? "Modifier" : "Ajouter"} Bon de reception
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
                        Bon de reception
                    </Typography>
                </Stack>
                <FormControl fullWidth>
                    <OSSelectField
                        id="outlined-basic"
                        label="BCE"
                        name="bce"
                        options={bonCommandeExternes}
                        dataKey={["ref"]}
                        valueKey="id"
                        type="text"
                    />
                </FormControl>
                <FormControl fullWidth>
                <OSDatePicker
                    fullWidth
                    label="Date bon de reception"
                    value={formikProps.values.dateReception}
                    onChange={(value: any) =>
                        formikProps.setFieldValue("dateBonCommande", value)
                    }
                />
                </FormControl>
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
                                Produit reçu
                            </Typography>
                        </Stack>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Designation</TableCell>
                                        <TableCell align="left">Quantité</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {valuesArticle.map((item:any , index:any) => (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{item.designation}</TableCell>
                                            <TableCell align="left">{item.quantite}</TableCell>
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
                                                            valuesArticle.splice(index, 1)
                                                        }}
                                                    >
                                                    <Delete />
                                                </IconButton>
                                                {/* <EditIcon color="primary" />
                                                <DeleteIcon color="warning" /> */}
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
                                                        id="designation"
                                                        label="Désignation"
                                                        name="designation"
                                                        type="text"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    <OSTextField
                                                        id="designation"
                                                        label="Quantité"
                                                        name="quantite"
                                                        type="number"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    
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
                                                            const designation = formikProps.values.designation;
                                                            const quantite = formikProps.values.quantite;
                                                                // Vérifier si les champs sont vides
                                                                if (designation.trim() !== '') {
                                                                valuesArticle.push({
                                                                    designation: designation,
                                                                    quantite: quantite
                                                                });
                                                                formikProps.setFieldValue('designation', '')
                                                                formikProps.setFieldValue('quantite', '');
                                                            }
                                                            
                                                        }}
                                                    >
                                                        <Check color="primary"/>
                                                    </IconButton>
                                                    <IconButton
                                                        type="button"
                                                        onClick={() => {
                                                            formikProps.setFieldValue('designation', '');
                                                                formikProps.setFieldValue('caracteristique', '');
                                                                formikProps.setFieldValue('pu', 0);
                                                                formikProps.setFieldValue('quantite', 0)
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
export default FormBonReception;

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    borderRadius: 20,
    background: "#fff",
    marginBottom:30,
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