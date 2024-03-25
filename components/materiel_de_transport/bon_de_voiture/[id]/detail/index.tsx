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
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { getCarVoucher } from "../../../../../redux/features/car-voucher";
import { format } from "date-fns";
//   import { getTransportationEquipment } from "../../../../redux/features/transportation_equipment";

const DetailBonDeVoiture = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { carVoucher } = useAppSelector((state) => state.carVoucher);
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
            <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
              Retour
            </Button>
          </Link>
          <Typography variant="h4" color="GrayText">
            Details d'entretien
          </Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <DetailsContainer>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Matériel :
              </Typography>
              <Typography variant="body1" color="gray">
                {carVoucher.materiel}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Date :
              </Typography>
              <Typography variant="body1" color="gray">
              <Moment format="DD/MM/YYYY">{carVoucher.date}</Moment>
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Montant total :
              </Typography>
              <Typography variant="body1" color="gray">
                {carVoucher.montantTotal}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        {    /*    <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Date et heure de départ :
              </Typography>
             <Typography variant="body1" color="gray">
                <Moment format="DD/MM/YYYY">{carVoucher.departureDate}</Moment>{" "}
                à <Moment format="HH:mm">{carVoucher.departureTime}</Moment>
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
              {/*<Typography variant="body1" color="gray">
                <Moment format="DD/MM/YYYY">{carVoucher.arrivalDate}</Moment> à{" "}
                <Moment format="HH:mm">{carVoucher.arrivalTime}</Moment>
</Typography>
            </InfoItems>
          </Grid>
        </Grid>*/}
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
