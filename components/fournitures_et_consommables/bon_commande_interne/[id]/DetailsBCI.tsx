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
        <Stack
            direction="row"
            sx={{
                flex: "1 1 100%",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            >
              <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <InfoItems direction="row" spacing={2}>
                  <Typography variant="body1" color="secondary">
                    Article :
                  </Typography>
                  <Typography variant="body1" color="gray">
                    {/* {consumable.item} */}
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
                      {/* {consumable.applicant?.name} {consumable.applicant?.surname} */}
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
                      {/* {consumable.requestedQuantity} */}
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
                      {/* {consumable.deliveredQuantity} */}
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
                      {/* <Moment format="DD/MM/YYYY">{consumable.deliveryDate}</Moment> */}
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
                      {/* {consumable.status} */}
                    </Typography>
                  </InfoItems>
                </Grid>
              </Grid>
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
