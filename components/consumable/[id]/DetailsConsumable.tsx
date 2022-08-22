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
import { getConsumable } from "../../../redux/features/consummable";
import Moment from "react-moment";

const DetailsConsumable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { consumable } = useAppSelector((state) => state.consumable);

  useEffect(() => {
    getDetailsConsumable();
  }, [id]);

  const getDetailsConsumable = () => {
    const args: any = {
      include: {
        item: true,
        applicantId: true,
        requestedQuantity: true,
        deliveredQuantity: true,
        deliveryDate: true,
      },
    };
    dispatch(getConsumable({ id, args }));
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/fournitures_et_consommables/commande">
          <Button
            color="info"
            variant="text"
            startIcon={<ArrowBackIcon />}
          >
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details d'une Commande
        </Typography>
      </SectionNavigation>
      <DetailsContainer>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
              Article :
              </Typography>
              <Typography variant="body1" color="gray">
                {consumable.item}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
              Demandeur :
              </Typography>
              <Typography variant="body1" color="gray">
                {consumable.applicant?.name}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
              Quantité démandée :
              </Typography>
              <Typography variant="body1" color="gray">
                {consumable.requestedQuantity}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
              Quantité livrée :
              </Typography>
              <Typography variant="body1" color="gray">
                {consumable.deliveredQuantity}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
              Date de livraison :
              </Typography>
              <Typography variant="body1" color="gray">
                <Moment format="DD/MM/YYYY">
                {consumable.deliveryDate}
                </Moment>
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
              Statut :
              </Typography>
              <Typography variant="body1" color="gray">
                {consumable.status}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
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
