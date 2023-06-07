import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Check, Close, Save } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextFieldArea from "../../../../../shared/input/OSTextFieldArea";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchOfferOrderListe from "../table/hooks/useFetchOfferOrder";

const FormulaireOffre = ({ formikProps }: any) => {
  const router = useRouter();
  const { id }: any = router.query;

  const dispatch = useAppDispatch();
  const { selectOfferOrder, isEditing } = useAppSelector(
    (state) => state.selectOfferOrder
  );
  const { offerOrderListe, offerOrder } = useAppSelector(
    (state) => state.offerOrder
  );
  const fetchOfferOderList = useFetchOfferOrderListe();
  useEffect(() => {
    fetchOfferOderList();
  }, []);
  return (
    <FormContainer spacing={2}>
      <Typography variant="h6">Offre retenu</Typography>
      <OSSelectField
        id="outlined-basic"
        label="Offre retenu"
        name="offerOrderId"
        options={offerOrderListe}
        dataKey="number"
        valueKey="id"
      />
      <OSTextFieldArea
        fullWidth
        id="outlined-basic"
        label="Motif de refus"
        variant="outlined"
        name="reasonRejected"
        textarea
      />
    </FormContainer>
  );
};

export default FormulaireOffre;

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
