import { Icon,Container } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormulaireBonCommande from './form/formulaireCreationBondeCommande';
export default function GestionCreatinBonCommande() {
    return (
        <div>
            <Box
                sx={{
                    ml : 3,
                    with : 1000,
                }} 
            >
                <FormulaireBonCommande/>
            </Box>
        </div>
    );
}