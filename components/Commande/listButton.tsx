import { Container, Grid,Icon,styled,useTheme } from '@mui/material'
import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '../../themes/overrides/Typography'

const ListButton= ()=>{
  return(
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={10}>
    <Stack spacing={1} direction="row">
      <Button variant="text" color="info"><ArrowBackIcon/>Retour</Button>
      <Button variant="contained" color="primary"><CheckIcon/>Enregistrer</Button>
      <Button variant="text" color="warning"><CloseIcon/>Annuler</Button>
    </Stack>
    </Grid>
    <Grid item xs={2}>
      <Typography variant="h5">
    Gerér offres
    </Typography>
  </Grid>
  </Grid>
    </Container>
  )
}

export default ListButton;