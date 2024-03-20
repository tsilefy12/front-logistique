import { Box, Button, Divider, Link, Stack, Table, TableBody, TableCell, TableContainer ,TableHead,TableRow,Typography,styled} from '@mui/material';
import { Form } from 'formik';
import React, {  useEffect } from 'react'
import Paper from "@mui/material/Paper";
import OSSelectField from '../../../../shared/select/OSSelectField';
import OSTextField from '../../../../shared/input copy/OSTextField';
import Close from '@mui/icons-material/Close';
import Check from '@mui/icons-material/Check';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import { getEquipment } from '../../../../../redux/features/equipment/useCases/getEquipment';
import { getEmployees, getEquipments } from '../../../../../redux/features/equipment';
import { getInterns } from '../../../../../redux/features/employeStagiaire/stagiaireSlice';

const FormDetenteur = (props:any) =>{
    const { formikProps,isEditing } = props

    const valuesMateriel:any = []
    
    const dispatch = useAppDispatch();
    const { employees } = useAppSelector((state) => state.employe);
    const { interns } = useAppSelector((state) => state.stagiaire);
    const total = [...employees.map((i:any)=>{
        return {
        id : i.id, name: i.name +" "+ i.surname, type: "employe"
        }
    }),...interns.map((i:any)=>{
        return {
        id : i.id, name: i.name +" "+ i.surname, type: "intern"
        }
    })]

    const fonctionListe = [
        { id: "COMMUNAUTE_ET_CONSERVATION", name: "COMMUNAUTE_ET_CONSERVATION" },
        { id: "ESPECE_ET_CONSERVATION", name: "ESPECE_ET_CONSERVATION" },
        { id: "ADMINISTRATION", name: "ADMINISTRATION" },
        { id: "SUIVI_ET_EVALUATION", name: "SUIVI_ET_EVALUATION" },
        { id: "RH", name: "RH" },
        { id: "PRESTATAIRE", name: "PRESTATAIRE" },
        { id: "STAGIAIRE", name: "STAGIAIRE" },
        { id: "AUTRES", name: "AUTRES" },
    ];

    const { equipments} = useAppSelector((state) => state.equipment);

    const fetchUtilsData = () => {
        dispatch(getEquipments({}));
        dispatch(getEmployees({}));
        dispatch(getInterns({}));
    };
    
    useEffect(() => {
        fetchUtilsData();
    }, []);
    
    const handleChange =  async (id: string) => {
        const response:any = await dispatch(getEquipment({ id }));
        const newVal = {
            numOptim : response.payload.numOptim,
            designation: response.payload.designation,
            acquisitionValue:response.payload.acquisitionValue,
            acquisitionDate:response.payload.acquisitionDate
        }
        valuesMateriel.push(newVal)
        console.log(valuesMateriel)
    };

    useEffect(() => {
        handleChange(formikProps.values.numOptim)
    }, [formikProps.values.numOptim]);
    return (
        <Form>
            <NavigationContainer>
                <SectionNavigation>
                <Stack flexDirection={"row"}>
                    <Link href="/materiels/detenteur">
                    <Button
                        color="info"
                        variant="text"
                        startIcon={<ArrowBack />}
                        onClick={() => {
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
                    label="Fonction"
                    name="function"
                    options={fonctionListe}
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
                                {valuesMateriel.map((row:any) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.numOptim}</TableCell>
                                        <TableCell align="left">{row.designation}</TableCell>
                                        <TableCell align="left">{row.acquisitionValue}</TableCell>
                                        <TableCell align="left">{row.acquisitionDate}</TableCell>
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
                                            <DeleteIcon color="warning" />
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
    )
}
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