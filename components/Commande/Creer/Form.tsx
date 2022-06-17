import { Icon,Container } from '@mui/material'
import React from 'react';
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';


// const [offre, setAge] = useState('');

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value);
//   };
const Form = () => {
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      
      <FormControl sx={{ m:1, minWidth: 275, width: 1000 }}>
      <Stack
         direction="column"
         spacing={1}
        >
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={offre}
          //  
          //onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>Demandeur</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={offre}
          //  
          //onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>GRANT</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <TextField id="filled-basic" label="Designation" variant="outlined" />
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
          <TextField id="filled-basic" label="Nombre d'offre autorise possible pour une commande" variant="outlined" />
          <TextField id="filled-basic" label="ligne budgetaire maximale pour une commande" variant="outlined" />
        </Stack>
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
          <TextField id="filled-basic" label="Quantite" variant="outlined" />
          <TextField id="filled-basic" label="Deadline de reception" variant="outlined" />
        </Stack>
        </Stack>
        </FormControl>
        
      </CardContent>
    </Card>
    </Container>
      
  )
}

export default Form;