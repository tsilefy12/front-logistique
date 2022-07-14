import {
    Button,
    Container,
    styled,
    Typography,
    TextField,
    FormControl,
    Stack,
    MenuItem,
    Divider,
    InputLabel
  } from "@mui/material";
  import React from "react";
  import Link from "next/link";
  import ArrowBack from "@mui/icons-material/ArrowBack";
  import { Check, Close, Save } from "@mui/icons-material";
  import Select, { SelectChangeEvent } from '@mui/material/Select';

  const [Value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  
  const FormArticle = () => {
    return (
      <Container maxWidth="xl" sx={{ pb: 5 }}>
        <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Link href="/fournitures_et_consommables">
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Check />}
              sx={{ marginInline: 3 }}
            >
              Enregistrer
            </Button>
            <Button
              variant="text"
              color="warning"
              size="small"
              startIcon={<Close />}
              sx={{ marginInline: 3 }}
            >
              Annuler
            </Button>
          </Stack>
          <Typography variant="h4">Créer Article</Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
        <Typography variant="h5">Creer Article</Typography>
        <FormContainer spacing={2}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Designation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Value}
          label="Designation"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Quantite stocké" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Prix Unitaire" variant="outlined" />
          </FormControl>
          
        </FormContainer>
      </Container>
    );
  };
  
  export default FormArticle;
  
  export const CustomStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  }));
  
  const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    // border: "1px solid #E0E0E0",
    borderRadius: 20,
    background: "#fff",
  }));
  const NavigationContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    flex: 1,
    width: "100%",
  }));
  
  const SectionNavigation = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "5px",
  }));
  