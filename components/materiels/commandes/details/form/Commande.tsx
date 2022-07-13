import { 
  styled,
  Button,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Grid,
 } from "@mui/material";
import React from "react";

const Commande = () => {
  return (
    <FormContainer spacing={2}>
      <Typography variant="h6">Commande</Typography>
      <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Offre retenu</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Offre retenu"
                //size="small"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Offre_1</MenuItem>
                <MenuItem value={20}>Offre_2</MenuItem>
                <MenuItem value={30}>Offre_3</MenuItem>
              </Select>
          </FormControl>
        <TextField
                fullWidth
                id="outlined-basic"
                label="designation"
                variant="outlined"
                //size="small"
              />
          
          <CustomStack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 2, sm: 2, md: 1 }}
          >
              <FormControl fullWidth>
              <TextField
                fullWidth
                id="outlined-basic"
                label="designation"
                variant="outlined"
                //size="small"
              />
              </FormControl>
              <FormControl fullWidth>
              <TextField
                fullWidth
                id="outlined-basic"
                label="designation"
                variant="outlined"
                //size="small"
              />
              </FormControl>
              </CustomStack>
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
