import { Container, Grid,Icon,styled,useTheme } from '@mui/material'
import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';

const ListButtonDetenteur= ()=>{
  return(
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
    <Stack spacing={1} direction="row">
      <Button variant="text" color="info"><ArrowBackIcon/>Retour</Button>
    </Stack>
    </Grid>
    <Grid item xs={4}>
        <Typography variant="h5">Historique de detention de materiel</Typography>
  </Grid>
  <Divider variant="middle" />
  </Grid>
  
    </Container>
  )
}

export default ListButtonDetenteur;