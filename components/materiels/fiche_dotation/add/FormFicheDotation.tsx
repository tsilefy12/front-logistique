import { Form, FormikProps } from 'formik';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { useRouter } from 'next/router';
import { getEmployees } from '../../../../redux/features/employeStagiaire/employeeSlice';
import { getInterns } from '../../../../redux/features/employeStagiaire/stagiaireSlice';
import {  Button, Divider, FormControl, Link, Stack, Typography, styled } from '@mui/material';
import OSTextField from '../../../shared/input/OSTextField';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import OSSelectField from '../../../shared/select/OSSelectField';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { getGrantList } from '../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice';
import { getBudgetLineList } from '../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice';
import OSDatePicker from '../../../shared/date/OSDatePicker';
import OSFileUpload from '../../../shared/input/OSFileUpload';

const FormFicheDotation = ({formikProps}: {formikProps: FormikProps<any>}) => {
    const dispatch = useAppDispatch();

    const { isEditing } = useAppSelector((state) => state.ficheDotation);
    const route = useRouter();
    
    // const { employees } = useAppSelector((state) => state.employe);
    // const { interns } = useAppSelector((state) => state.stagiaire);
    const { grantList } = useAppSelector( (state) => state.grant);
    const { budgetLineList } = useAppSelector( (state) => state.lineBugetaire);

    // const total = [...employees.map((i:any)=>{
    //     return {
    //     id : i.id, name: i.name +" "+ i.surname, type: "employe"
    //     }
    // }),...interns.map((i:any)=>{
    //     return {
    //         id : i.id, name: i.name +" "+ i.surname, type: "intern"
    //     }
    // })]
    const fetchUtilsData = () => {
        dispatch(getEmployees({}));
        dispatch(getInterns({}));
        dispatch(getGrantList({}));
        dispatch(getBudgetLineList({}));
    };

    useEffect(() => {
        fetchUtilsData();
    }, []);

    // useEffect(() => {
    //     const Val:any = total.find((e:any)=> e.id === formikProps.values.destination)
    //     formikProps.setFieldValue("type", Val?.type)
    //     console.log(formikProps.values.type)
    // }, [formikProps.values.destination]);

    return (
        <Form>
            <NavigationContainer>
                <SectionNavigation>
                <Stack flexDirection={"row"}>
                    <Link href="/materiels/bon_transfert">
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
                    }}
                    >
                    Annuler
                    </Button>
                </Stack>
                <Typography variant="h4">
                    {isEditing ? "Modifier" : "Ajouter"} Fiche de dotation
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
                        Fiche de dotation
                    </Typography>
                </Stack>
                <FormControl fullWidth>
                    <OSDatePicker
                        fullWidth
                        id="outlined-basic"
                        label="Date"
                        variant="outlined"
                        value = {formikProps.values.date}
                        onChange = {(value: any) =>formikProps.setFieldValue("date", value)}
                    />
                </FormControl>
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
                            label="Réference"
                            name="reference"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Région"
                            name="region"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="District"
                            name="district"
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
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Commune"
                            name="commune"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Fokotany"
                            name="fokontany"
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
                            dataKey={["code"]}
                            valueKey="id"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            label="Ligne budgétaire"
                            name="ligneBudgetaire"
                            options={budgetLineList}
                            dataKey={["code"]}
                            valueKey="id"
                        />
                    </FormControl>
                </Stack>
                { isEditing ? (
                    <FormControl fullWidth>
                        <OSFileUpload label="Pièce jointe" name="pieceJointe" />
                    </FormControl>
                ):(
                    <></>
                )}
            </FormContainer>
        </Form>
    )
}

export default FormFicheDotation
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