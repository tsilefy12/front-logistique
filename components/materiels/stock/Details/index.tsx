import React from 'react';
import Box from '@mui/material/Box';
import ListeDetailStock from './listeDetailStock';
export default function GestionListeDetailStock(){
    return (
        <div>
            <Box
                sx={{
                    ml : 3,
                    with : 1000,
                }} 
            >
               <ListeDetailStock/> 
            </Box>
        </div>
    );
}