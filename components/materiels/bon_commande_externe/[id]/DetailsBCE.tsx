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
import { getBonCommandeExterne } from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";

const DetailsBCE = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { bonCommandeExterne } = useAppSelector((state) => state.bonCommendeExterne);

    useEffect(() => {
        getDetailsBCE();
    }, [id]);
  
    const getDetailsBCE = () => {
        dispatch(getBonCommandeExterne({ id , args:{
            include:{
                ArticleCommandeBce:true
            }
        }}));
    };

    useEffect(()=> {
        console.log(bonCommandeExterne)
    },[bonCommandeExterne])
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
            <SectionNavigation
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Stack flexDirection={"row"}>
                    <Link href="/materiels/bon_commande_externe">
                        <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
                            Retour
                        </Button>
                    </Link>
                </Stack>
                <Typography variant="h4" color="GrayText">
                    Details d'une bon de commande externe
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
                                        Réference
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {bonCommandeExterne.ref}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                <InfoItems direction="row" spacing={2}>
                                    <Typography variant="body1" color="secondary">
                                        Fournisseur
                                    </Typography>
                                    <Typography variant="body1" color="gray">
                                    {bonCommandeExterne.fournisseur}
                                    </Typography>
                                </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Condition de livraison
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonCommandeExterne.conditionLivraison}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} my={1}>
                                    <Grid item xs={12} md={12}>
                                        <InfoItems direction="row" spacing={2}>
                                            <Typography variant="body1" color="secondary">
                                                N° bon de commande interne
                                            </Typography>
                                            <Typography variant="body1" color="gray">
                                            {bonCommandeExterne.bci}
                                            </Typography>
                                        </InfoItems>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                        <InfoItems direction="row" spacing={2}>
                                            <Typography variant="body1" color="secondary">
                                                Date commande 
                                            </Typography>
                                            <Typography variant="body1" color="gray">
                                            <Moment format="DD/MM/YYYY">
                                                {bonCommandeExterne.dateCommande}
                                            </Moment>
                                            </Typography>
                                        </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <InfoItems direction="row" spacing={2}>
                                            <Typography variant="body1" color="secondary">
                                                Date de livraison
                                            </Typography>
                                            <Typography variant="body1" color="gray">
                                            <Moment format="DD/MM/YYYY">
                                                {bonCommandeExterne.dateLivraison}
                                            </Moment>
                                            </Typography>
                                        </InfoItems>
                                    </Grid>
                            </Grid>
                                <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Mode de paiement
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonCommandeExterne.modePaiement}
                                        </Typography>
                                    </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Date de la commande
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            <Moment format="DD/MM/YYYY">
                                                {bonCommandeExterne.dateCommande}
                                            </Moment>
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
                                    Liste des articles
                                </Typography>
                            </Stack>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Designation</TableCell>
                                            <TableCell align="left">Caractéristique</TableCell>
                                            <TableCell align="left">PU</TableCell>
                                            <TableCell align="left">Quantité</TableCell>
                                            <TableCell align="left">Valeur</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bonCommandeExterne.ArticleCommandeBce?.map((item:any , index:any) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{item.designation}</TableCell>
                                                <TableCell align="left">{item.caracteristik}</TableCell>
                                                <TableCell align="left">{item.pu}Ar</TableCell>
                                                <TableCell align="left">{item.quantite} </TableCell>
                                                <TableCell align="left">{item.valeur} Ar</TableCell>
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
  
export default DetailsBCE;

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