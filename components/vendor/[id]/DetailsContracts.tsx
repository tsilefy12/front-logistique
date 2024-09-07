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
import { getVendor } from "../../../redux/features/vendor";
import useFetchTypeProduitList from "../../configurations/type_produit/hooks/useFetchTypeProduitList";
import insertSeparatorAtMiddle from "../../../hooks/formateurCompte";

const DetailsVendor = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { vendor } = useAppSelector((state) => state.vendor);
  const fetchTypeProduit = useFetchTypeProduitList();
  const { typeProduits } = useAppSelector((state) => state.typeProduit);

  useEffect(() => {
    getDetailsVendor();
    fetchTypeProduit();
  }, [id]);
  // console.log(vendor);
  const getDetailsVendor = () => {
    const args: any = {
      include: {
        typeProduct: true,
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
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Détails du fournisseur
        </Typography>
      </SectionNavigation>
      <DetailsContainer>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"column"} gap={2}>
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
                    Téléphone :
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
                    RIB :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {insertSeparatorAtMiddle(vendor.rib || 0)}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
          </Stack>
          <Stack direction={"column"} gap={2}>
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
                    Nif :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {vendor.nif}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Stat :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {vendor.website}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Agence :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {vendor.agence}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
          </Stack>
          <Stack direction={"column"} gap={2}>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Catégorie fournisseur :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {vendor.categorieFournisseur}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Evaluation :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {vendor.evaluation}
                  </Typography>
                </InfoItems>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Type de produit :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {typeProduits &&
                      typeProduits.find((t) => t.id === vendor.typeProduit)
                        ?.typeProduct!}
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

export default DetailsVendor;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
