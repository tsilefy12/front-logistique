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
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { getTransportationEquipment } from "../../../../redux/features/transportation_equipment";
import Moment from "react-moment";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import useFetchVendors from "../../../vendor/hooks/useFetchVendors";
import { TransportationEquipmentItem } from "../../../../redux/features/transportation_equipment/transportationEquipment.interface";

const DetailTransportEquipment = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;

  const { transportationEquipment } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const fetchTransportEquipement = useFetchTransportationEquipments();

  const getDetailTransportationEquipment = () => {
    const args: any = {
      include: {
        vendor: true,
        typeEquipment: true,
      },
    };
    dispatch(getTransportationEquipment({ id, args }));
  };

  useEffect(() => {
    getDetailTransportationEquipment();
    fetchTransportEquipement();
  }, [id]);

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Link href="//materiel_de_transport">
            <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
              Retour
            </Button>
          </Link>
          <Typography variant="h4" color="GrayText">
            Détails matériel de transport
          </Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <DetailsContainer>
        <Stack direction="row" spacing={25}>
          <Stack>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Régistration :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.registration}
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
                    {transportationEquipment.typeEquipment?.type}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Marque :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.brand}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Status :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.status}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
          </Stack>
          <Stack>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Date d'acquisition :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    <Moment format="DD/MM/YYYY">
                      {transportationEquipment.dateAcquisition}
                    </Moment>
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Kilométrage initial :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.kilometrageInitial} Km
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Réservoir :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.reservoir} L
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Consommation au 100 :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.consommation} L
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
          </Stack>
          <Stack>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Autre informations :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.otherInformation}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Fournisseur :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.vendor?.name}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Kilométrage actuel :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.kilometrageActuel} Km
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Reste du carburant :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {transportationEquipment.reste} L
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

export default DetailTransportEquipment;

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
