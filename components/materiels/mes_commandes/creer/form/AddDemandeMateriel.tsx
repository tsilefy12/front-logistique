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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const AddDemandeMateriel = () => {
  return (
    <Stack maxWidth="xl" sx={{ pb: 2 }}>
      <FormContainer spacing={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Titre"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Demandeur</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Demandeur"
          >
            <MenuItem value={10}>Demandeur_1</MenuItem>
            <MenuItem value={20}>Demandeur_2</MenuItem>
            <MenuItem value={30}>Demandeur_3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Raison de la commande"
          variant="outlined"
        />
      </FormContainer>
    </Stack>
  );
};

export default AddDemandeMateriel;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));
