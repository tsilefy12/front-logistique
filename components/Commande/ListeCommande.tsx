import { Icon,Container } from '@mui/material'
import React from 'react'
import Commande from './Commande'
import ListButton from './listButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Offre from './Offre'
import OffreRetenu from './OffreRetenu'


const ListCommande = () => {
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <ListButton />
      <Commande />
      <Offre />
      <OffreRetenu />
      </CardContent>
      </Card>
    </Container>
    
  )
}

export default ListCommande;