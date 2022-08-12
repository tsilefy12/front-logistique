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
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { getArticl } from "../../../redux/features/artikel";

const DetailsArticl = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { articl } = useAppSelector((state) => state.articl);

  useEffect(() => {
    getDetailsArticl();
  }, [id]);

  const getDetailsArticl = () => {
    const args: any = {
      include: {
        designation: true,
        quantity: true,
        unitPrice: true,
        SKU: true,
      },
    };
    dispatch(getArticl({ id, args }));
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/fournitures_et_consommables/article">
          <Button
            color="info"
            variant="text"
            startIcon={<ArrowBackIcon />}
          >
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details d'articles
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
                {articl.designation}
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
                {articl.quantity}
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
                {articl.unitPrice}
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
                {articl.SKU}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DetailsArticl;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
