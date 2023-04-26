import { styled } from "@mui/material";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../../../../../shared/keyValue";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { getOfferOrder } from "../../../../../../redux/features/OfferOrder";

const Detail = () => {
  const router = useRouter();
  const id: any = router.query.id;
  console.log("Offer Id", id)
  const {offerOrder } = useAppSelector(
    (state) => state.offerOrder
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    getDetailsOfferOrder();
  }, [id]);

  const getDetailsOfferOrder = () => {
    const args: any = {
      include: {
        number: true,
        ProformaNumber: true,
        vatRegime: true,
        vendorId: true,
        paymentMethod : true,
      },
    };
    dispatch(getOfferOrder({ id,args }));
  };

  return (
    <FormContainer spacing={2}>
      <Typography variant="h6">Offre</Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <KeyValue keyName="Numéro" value={offerOrder?.number} />
          <KeyValue keyName="Méthode de paiement" value={offerOrder?.paymentMethod} />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyValue keyName="Num proforma" value={offerOrder?.ProformaNumber}  />
          <KeyValue keyName="Regime TVA" value={offerOrder?.vatRegime}  />
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Detail;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));