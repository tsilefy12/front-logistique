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
import Link from "next/link";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Check, Close, Save } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Commande = () => {
  return (
    <FormContainer spacing={2}>
      <Typography variant="h6">Commande</Typography>

      <Stack spacing={2} direction="row">
      <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Typography sx={{ fontSize: 15 }} color="secondary" gutterBottom>
         Demandeur :
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="grey" gutterBottom>
         Kristin Watson
        </Typography>
        </Stack>
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Typography sx={{ fontSize: 15 }} color="secondary" gutterBottom>
         Designation :
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="grey" gutterBottom>
         Commande_1
        </Typography>
        </Stack>
      </Stack>
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
