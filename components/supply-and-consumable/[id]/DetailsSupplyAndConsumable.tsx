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
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { getSuplyAndConsumable } from "../../../redux/features/supply-and-consumable";
import useFetchUniteStockList from "../../configurations/unite_de_stock/hooks/useFetchUniteStock";

const DetailsSuplyAndConsumable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { suplyAndConsumable } = useAppSelector(
    (state) => state.suplyAndConsumable
  );
  const fetchUniteStock = useFetchUniteStockList();
  const { grantList } = useAppSelector((state) => state.grant);
  useEffect(() => {
    getDetailSuplyAndConsumable();
    fetchUniteStock();
  }, [id]);

  const getDetailSuplyAndConsumable = () => {
    const args: any = {
      include: {
        uniteStock: true,
        vendor: true,
        categorieStocks: true,
      },
    };
    dispatch(getSuplyAndConsumable({ id, args }));
  };
  console.log("result :", suplyAndConsumable)
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/fournitures_et_consommables/fiche_de_stock">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details Fiche de Stock
        </Typography>
      </SectionNavigation>
      <DetailsContainer>
        <Stack direction="row" spacing={65} marginLeft={4} marginRight={4} marginTop={-4}>
          <Stack direction="column">
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Désignation :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.designation}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Quantite :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.quantity}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Prix Unitaire :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.unitPrice}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Montant :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.montant}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Seuil :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.seuil}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
          </Stack>
          <Stack direction="column">
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Unité de Gestion de Stock :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.uniteStock?.uniteStock}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
         
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Mois de provision :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.moisPrevision}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Founisseur :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.vendor?.name}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Categorie de stock :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {suplyAndConsumable.categorieStocks?.categorieStock}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Grant :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {grantList.find((e: any) => e.id === suplyAndConsumable?.grant)?.code}

                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </DetailsContainer>
    </Container>
  );
};

export default DetailsSuplyAndConsumable;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
