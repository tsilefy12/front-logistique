import { Icon,Container,Stack } from '@mui/material'
import React from 'react';
import Card from '@mui/material/Card'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import handleChange from './eventSelect';
import FormControl from '@mui/material/FormControl';


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
        
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={offre}
          // onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>Offre retenu</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={offre}
          // onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>Offre retenu</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={offre}
          // onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>Offre retenu</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </Stack>
        </FormControl>
      </CardContent>
    </Card>
    </Container>
      
  )
}

export default Commande;