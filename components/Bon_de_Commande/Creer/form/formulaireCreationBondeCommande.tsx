import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Container } from "@mui/material";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListeTableBonCommande from './table';
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


export default function FormulaireBonCommande() {

    const [currency, setCurrency] = React.useState('Option_2');
    const [value, setValue] = React.useState<Date | null>(null);
    const [mode, setMode] = React.useState('Option_2');


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrency(event.target.value);
    };

    const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMode(event.target.value);
    };

    

  

    return(
        <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="flex-start"
        sx={{
            ml : 1
        }}
        >
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
        <Container>
        <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                //spacing={2}
            >
                <Button variant="text" size="small" color="info"  sx={{ ml : 1  
                }}>
                        <ArrowBackIcon/>Retour
                </Button>
                <Button variant="contained" size="small" color="primary" sx={{ ml : 2  
                }}>
                    <CheckIcon/>Enregister
                </Button>
                <Button variant="text" size="small" color="warning" sx={{ ml : 2  
                }}>
                        <CloseIcon/>Annuler
                </Button>
                <Typography variant="h5" 
                 sx={{ ml : 70  
                }}
                >
                    Créer un bon de commande
                </Typography>
            </Stack>   
            <Divider sx={{
                mt : 1
            }}/>
        </Container>
        </Grid>
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
                mt: 2,
                width : '100%'
            }}
            //spacing={0}
        >
           <Container>
                <TextField 
                    id="outlined-basic" 
                    placeholder="Numéro" 
                    variant="outlined" 
                    sx = {{
                       width : '48%'
                    }}
                />
                <TextField 
                    id="outlined-basic" 
                    placeholder="Réference" 
                    variant="outlined" 
                    sx = {{
                        ml : 1,
                        width : '50%'
                     }}
                />
           </Container> 
        </Stack>
        <Container>
            <TextField 
                id="outlined-basic" 
                placeholder="Commande lié" 
                variant="outlined" 
                sx = {{
                    mt : 2,
                    width : '99%'
                    }}
            />
        </Container>
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
                mt: 2,
                width : '100%'
            }}
            //spacing={0}
        >
           <Container>
                <TextField
                        id="outlined-select-currency"
                        select
                        label="Fournisseur"
                        placeholder = "Fournisseur"
                        value={currency}
                        onChange={handleChange}
                        sx = {{
                            width : '48%'
                        }}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                        id="outlined-select-currency"
                        select
                        label="Mode d'expedition"
                        placeholder = "Mode d'expedition"
                        value={mode}
                        onChange={handleChangeMode}
                        sx = {{
                            ml : 1,
                            width : '50%'
                         }}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Container> 
        </Stack>
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
                mt: 2,
                width : '100%',
                
            }}
            //spacing={0}
        >
           {/* <CustomStack> */}
                <TextField 
                    id="outlined-basic" 
                    type="date" 
                    placeholder="Date de livraison" 
                    variant="outlined" 
                    sx = {{
                        width : '42%',
                        ml : 8
                    }}
                />
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                >
                    <Typography variant="body1" gutterBottom sx={{
                        ml : 12
                        }}>
                            Validation
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        
                    >
                        <FormControlLabel  control={<Switch defaultChecked />} label="GSE" 
                            sx = {{ ml : 10 }}
                        />
                        <FormControlLabel  control={<Switch defaultChecked />} label="DE" 
                            sx = {{ ml :  13 }}
                        />
                    </Stack>

           {/* </CustomStack> */}
                    
                </Stack>
           
               
        </Stack>
        <Container>
            <ListeTableBonCommande />
        </Container>
    </Grid>
     
    );



}
