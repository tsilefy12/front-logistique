import { Icon,Container } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ListButtonCommande from './form/ListButtonCommande'
import Form from './form/Form'


const Formulaire = () => {
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <ListButtonCommande/>
      <Form/>
      </CardContent>
      </Card>
    </Container>
    
  )
}

export default Formulaire;