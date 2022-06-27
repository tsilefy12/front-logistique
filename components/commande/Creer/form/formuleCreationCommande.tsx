import * as React from 'react';
import { Stack } from "@mui/material";
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

export default function FormuleCreationCommande() {


    return (

        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            style ={{width: '90%'}}
        >
            <TextField id="filled-basic" label="Titre" variant="filled" size="small" style ={{width: '100%'}} />
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={offre}
                //  
                //onChange={handleChange}
                label="Selectionner Option"
                size="small"
                style ={{width: '100%'}}
            >
                <MenuItem value="">
                    <em>Selectionner Option</em>
                </MenuItem>
                <MenuItem value={10}>Option</MenuItem>
                <MenuItem value={20}>Option1</MenuItem>
                <MenuItem value={30}>Option1</MenuItem>
            </Select>
            <TextField id="filled-basic" label="Titre2" variant="filled" size="small" style ={{width: '100%'}} />
        </Stack>

    );

}