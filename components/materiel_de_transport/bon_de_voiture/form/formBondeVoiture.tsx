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
  import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
  import Link from "next/link";
  import * as React from "react";
  import ArrowBack from "@mui/icons-material/ArrowBack";
  import AttachFileIcon from "@mui/icons-material/AttachFile";
  import { Check, Close, Save } from "@mui/icons-material";
  
  const passager = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];
  const currencies = [
    {
      value: '1',
      label: 'Option_1',
    },
    {
      value: '2',
      label: 'Option_2',
    },
    {
      value: '3',
      label: 'Option_3',
    },
    {
      value: '4',
      label: 'Option_4',
    },
  ];


  
  //const [currencies, setCurrency] = React.useState('Option_2');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const FormBonDeVoiture = () => {
    return (
      <Container maxWidth="xl" sx={{ pb: 5 }}>
        <NavigationContainer>
          <SectionNavigation>
            <Stack flexDirection={"row"}>
              <Link href="/fournisseurs">
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
            <Typography variant="h4">Ajouter un bon de voiture</Typography>
          </SectionNavigation>
          <Divider />
        </NavigationContainer>
  
        <FormContainer spacing={2}>
        <Stack
  direction="row"
  justifyContent="center"
  alignItems="center"
  spacing={2}
>
          <TextField
            fullWidth
            id="outlined-basic"
            label="NumeroBV"
            variant="outlined"
          />
          <FormControl fullWidth>
          <TextField
          fullWidth
                   	   id="filled-select-currency"
                            select
                            label="Immatriculation"
                            value={currencies}
                            onChange={handleChange}
                            variant="filled"
                            style = {{width: 150}}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                   
		</TextField>
          </FormControl>
          </Stack>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Numero CM" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Poste Analitique" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Type" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Motif" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Argumentaire" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Itineraire" variant="outlined" />
          </FormControl>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Date de départ" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Heure de depart" variant="outlined" />
          </FormControl>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Date de retour" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Heure de retour" variant="outlined" />
          </FormControl>
          </Stack>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Nombre" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
          <Autocomplete
        multiple
        id="tags-standard"
        options={passager}
        getOptionLabel={(option) => option.title}
        defaultValue={[passager[1]]}
        renderInput={(params) => (
            <TextField {...params}
            variant="standard" id="outlined-basic" label="Selectionner ou créer passager" />
        )}
      />
            
          </FormControl>
        </FormContainer>
      </Container>
    );
  };
  
  export default FormBonDeVoiture;
  
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
  