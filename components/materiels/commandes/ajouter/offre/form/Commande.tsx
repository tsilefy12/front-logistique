import { styled } from "@mui/material";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../../../../../shared/keyValue";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { getOrderEquipment } from "../../../../../../redux/features/orderEquipment";
// import Moment from "react-moment";

const Commande = () => {
  const router = useRouter();

  const id: any = router.query.commandId;
  const { orderEquipment } = useAppSelector(
    (state: any) => state.orderEquipment
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    getDetailsOrderEquipement();
  }, [id]);

  const getDetailsOrderEquipement = () => {
    const args: any = {
      include: {
        designation: true,
        reason: true,
        deadlineOfReception: true,
        numberOfAuthorisedOffersPossible: true,
        applicantId: true,
        status: true,
      },
    };
    dispatch(getOrderEquipment({ id, args }));
  };

  const formatDateToFr = (date: string) => {
    const dateCommande = new Date(date).toLocaleDateString("fr");
    return dateCommande;
  };

  return (
    <FormContainer spacing={2}>
      <Typography variant="h6">Commande</Typography>

      <Grid container>
        <Grid item xs={12} md={6}>
          <KeyValue
            keyName="Demandeur"
            value={orderEquipment?.applicant?.name}
          />
          <KeyValue keyName="Designation" value={orderEquipment?.designation} />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyValue
            keyName="Quantité"
            value={orderEquipment?.numberOfAuthorisedOffersPossible}
          />
          <KeyValue
            keyName="Deadline de réception"
            value={formatDateToFr(orderEquipment?.deadlineOfReception)}
          />
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Commande;

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
