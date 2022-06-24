import { Icon,Container,Stack } from '@mui/material'
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';



// const [offre, setAge] = useState('');

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value);
//   };
const Commande = () => {
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 23 }} color="#000000" gutterBottom>
          <h5>Commande</h5>
        </Typography>
        <FormControl variant="filled" sx={{ m:1, minWidth: 275, width: 1000 }}>
        <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={0.5}
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
            <em>Offre retenu</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        
        <TextField id="filled-basic" label="Designation" variant="filled" />
        <Box sx={{ width: '100%' }}>
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
          <TextField id="filled-basic" label="Designation" variant="filled" />
          <TextField id="filled-basic" label="Designation" variant="filled" />
        </Stack>
        </Box>
        </Stack>
        </FormControl>
      </CardContent>
    </Card>
    </Container>
      
  )
}

export default Commande;