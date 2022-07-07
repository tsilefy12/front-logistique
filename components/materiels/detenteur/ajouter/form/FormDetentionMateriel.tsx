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

const FormDetentionMateriel = () => {
  return (
    <FormContainer spacing={2}>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Réference"
        variant="outlined"
      />

      <Typography variant="h6">Employé</Typography>

      <Stack spacing={2} direction="row">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nom"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Prénoms"
          variant="outlined"
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Matricule"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Fonction"
          variant="outlined"
        />
      </Stack>
    </FormContainer>
  );
};

export default FormDetentionMateriel;

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
