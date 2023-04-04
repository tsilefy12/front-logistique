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

const DetailsSuplyAndConsumable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { suplyAndConsumable } = useAppSelector(
    (state) => state.suplyAndConsumable
  );

  useEffect(() => {
    getDetailSuplyAndConsumable();
  }, [id]);

  const getDetailSuplyAndConsumable = () => {
    const args: any = {
      include: {
        designation: true,
        quantity: true,
        unitPrice: true,
        SKU: true,
      },
    };
    dispatch(getSuplyAndConsumable({ id, args }));
  };

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
                Unité de Gestion de Stock :
              </Typography>
              <Typography variant="body1" color="gray">
                {suplyAndConsumable.SKU}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
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
