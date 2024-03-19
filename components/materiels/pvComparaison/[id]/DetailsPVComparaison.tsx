import {
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { getPvComparaison } from "../../../../redux/features/pvComparaison/pvComparaisonSlice";
const DetailsPvComparaison = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { pvComparaison } = useAppSelector((state) => state.pvComparaison);

    useEffect(() => {
        getDetailsPVComparaison();
    }, [id]);

    const getDetailsPVComparaison = () => {
        dispatch(getPvComparaison({ id,args:{
        include:{
            TableComparaison:true
        }
        }}));
    };

    useEffect(()=> {
        console.log(pvComparaison)
    },[pvComparaison])
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
            <SectionNavigation
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Stack flexDirection={"row"}>
                    <Link href="/materiels/pv_comparaison">
                        <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
                            Retour
                        </Button>
                    </Link>
                </Stack>
                <Typography variant="h4" color="GrayText">
                    Details d'une bon de pv de comparaison d'offre
                </Typography>
            </SectionNavigation>
            <DetailsContainer>
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
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Reference
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {pvComparaison.ref}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Objet
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {pvComparaison.objet}
                                        </Typography>
                                    </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Materiel
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {pvComparaison.materiel}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                
                            </Grid>
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                           Programme
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {pvComparaison.programme}
                                        </Typography>
                                    </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Grant
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {pvComparaison.grant}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Ligne budgétaire
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {pvComparaison.ligneBudgetaire}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Offre retenu
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {pvComparaison.offreRetenu}
                                        </Typography>
                                    </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <InfoItems direction="row" spacing={2}>
                                            <Typography variant="body1" color="secondary">
                                                Justification
                                            </Typography>
                                            <Typography variant="body1" color="gray">
                                                {pvComparaison.justification}
                                            </Typography>
                                        </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <InfoItems direction="row" spacing={2}>
                                            <Typography variant="body1" color="secondary">
                                                Argument
                                            </Typography>
                                            <Typography variant="body1" color="gray">
                                                {pvComparaison.argument}
                                            </Typography>
                                        </InfoItems>
                                    </Grid>
                                </Grid>
                        </Stack>
                    </FormContainer>
                </Box>
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
                                    Liste des fournisseurs
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
                                        {pvComparaison.TableComparaison?.map((item:any , index:any) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{item.fournisseur}</TableCell>
                                                <TableCell align="left">{item.modePaie}</TableCell>
                                                <TableCell align="left">{item.offre}</TableCell>
                                                <TableCell align="left">{item.designation} Ar</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </FormContainer>
                </Box>
            </DetailsContainer>
        </Container>
    );
};

export default DetailsPvComparaison;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    borderRadius: 20,
    background: "#fff",
    marginBottom:30,
}));