import {
    Button,
    Container,
    Grid,
    Stack,
    styled,
    Typography,
    Divider,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import Link from "next/link";
  import Moment from "react-moment";
//   import {
//     useAppDispatch,
//     useAppSelector,
//   } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks";
import { getCarVoucher } from "../../../../../redux/features/car-voucher";
//   import { getTransportationEquipment } from "../../../../redux/features/transportation_equipment";
  
  const DetailBonDeVoiture = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { carVoucher } = useAppSelector(
      (state) => state.carVoucher
    );
    console.log(id);
    const getDetailCarVoucher = () => {
      const args: any = {
        include: {
          registration: true,
          type: true,
          brand: true,
          otherInformation: true,
        },
      };
      dispatch(getCarVoucher({ id, args }));
    };
  
    useEffect(() => {
        getDetailCarVoucher();
    }, [id]);
  
    return (
      <Container maxWidth="xl" sx={{ pb: 5 }}>
        <NavigationContainer>
          <SectionNavigation
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Link href="/materiel_de_transport/bon_de_voiture">
              <Button
                color="info"
                variant="text"
                startIcon={<ArrowBackIcon />}
              >
                Retour
              </Button>
            </Link>
            <Typography variant="h4" color="GrayText">
              Details bon de voiture
            </Typography>
          </SectionNavigation>
          <Divider />
        </NavigationContainer>
        <DetailsContainer>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Numéro BV :
                </Typography>
                <Typography variant="body1" color="gray">
                  {carVoucher.number}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Immatriculation :
                </Typography>
                <Typography variant="body1" color="gray">
                  {carVoucher.registration}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Type :
                </Typography>
                <Typography variant="body1" color="gray">
                  {carVoucher.type}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Motif :
                </Typography>
                <Typography variant="body1" color="gray">
                  {carVoucher.reason}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Argumentaire :
                </Typography>
                <Typography variant="body1" color="gray">
                  {carVoucher.argument}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Itineraire :
                </Typography>
                <Typography variant="body1" color="gray">
                  {carVoucher.itinerary}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Date et heure de départ :
                </Typography>
                <Typography variant="body1" color="gray">
                    <Moment format="DD/MM/YYYY">{carVoucher.departureDate}</Moment> <Moment format="HH:mm">{carVoucher.departureTime}</Moment>
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Date et heure de départ :
                </Typography>
                <Typography variant="body1" color="gray">
                    <Moment format="DD/MM/YYYY">{carVoucher.arrivalDate}</Moment> <Moment format="HH:mm">{carVoucher.arrivalTime}</Moment>
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Quantité :
                </Typography>
                <Typography variant="body1" color="gray">
                  {carVoucher.quantity}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
        </DetailsContainer>
      </Container>
    );
  };
  
  export default DetailBonDeVoiture;
  
  export const InfoItems = styled(Stack)(({ theme }) => ({}));
  
  const DetailsContainer = styled("div")(({ theme }) => ({
    padding: 30,
    border: "1px solid #E0E0E0",
    borderRadius: 20,
    background: "#fff",
  }));
  
  const NavigationContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    flex: 1,
    width: "100%",
  }));
  
  export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
  