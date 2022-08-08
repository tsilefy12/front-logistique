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
import { getVendor } from "../../../redux/features/vendor";

const DetailsVendor = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { vendor } = useAppSelector((state) => state.vendor);

  useEffect(() => {
    getDetailsVendor();
  }, [id]);

  const getDetailsVendor = () => {
    const args: any = {
      include: {
        name: true,
        address: true,
        phone: true,
        email: true,
        website: true,
      },
    };
    dispatch(getVendor({ id, args }));
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/fournisseurs">
          <Button
            color="info"
            variant="text"
            startIcon={<ArrowBackIcon />}
          >
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details du fournisseur
        </Typography>
      </SectionNavigation>
      <DetailsContainer>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Nom :
              </Typography>
              <Typography variant="body1" color="gray">
                {vendor.name}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Adresse :
              </Typography>
              <Typography variant="body1" color="gray">
                {vendor.address}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Télephone :
              </Typography>
              <Typography variant="body1" color="gray">
                {vendor.phone}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Email :
              </Typography>
              <Typography variant="body1" color="gray">
                {vendor.email}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Site Web :
              </Typography>
              <Typography variant="body1" color="gray">
                {vendor.website}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DetailsVendor;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
