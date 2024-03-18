import {
  Button,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { getBonCommandeInterne } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import Moment from "react-moment";

const DetailsConsumable = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { bonCommandeInterne } = useAppSelector((state) => state.bonCommandeInterne);

    useEffect(() => {
        getDetailsBCI();
    }, [id]);

    const getDetailsBCI = () => {
        dispatch(getBonCommandeInterne({ id,args:{
        include:{
            ArticleCommande:true
        }
        }}));
    };

    useEffect(()=> {
        console.log(bonCommandeInterne)
    },[bonCommandeInterne])
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
            <SectionNavigation
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Link href="/fournitures_et_consommables/commande">
                <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
                    Retour
                </Button>
                </Link>
                <Typography variant="h4" color="GrayText">
                    Details d'une bon de commande interne
                </Typography>
            </SectionNavigation>
            <DetailsContainer>
                <Grid container spacing={4} my={1}>
                    <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                            <Typography variant="body1" color="secondary">
                                N° Bon de commande
                            </Typography>
                            <Typography variant="body1" color="gray">
                            {bonCommandeInterne.numBon}
                            </Typography>
                        </InfoItems>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                            <Typography variant="body1" color="secondary">
                                Demandeur
                            </Typography>
                            <Typography variant="body1" color="gray">
                            {bonCommandeInterne.demandeur}
                            </Typography>
                        </InfoItems>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                            <Typography variant="body1" color="secondary">
                                Montant total
                            </Typography>
                            <Typography variant="body1" color="gray">
                                {bonCommandeInterne.montantTotal}
                            </Typography>
                        </InfoItems>
                    </Grid>
                </Grid>
                <Typography variant="h4" color="GrayText">
                    Liste des articl
                </Typography>
                <Stack
                    direction="row"
                    sx={{
                        flex: "1 1 100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    >
                    {bonCommandeInterne.ArticleCommande?.map((item:any) =>{
                        return(
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                         Designation :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {item.designation}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                         Caractéristique :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {item.caracteristik}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                         Designation :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {item.caracteristik}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                         Quantité :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {item.quantite}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                         Prix unitaire :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {item.pu} ariary
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Stack>
            </DetailsContainer>
        </Container>
    );
};

export default DetailsConsumable;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
