import { Icon,Container } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ListButtonOffre from './ListButtonOffre'
import List from './list'


const GestionOffre = () => {
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <ListButtonOffre/>
      <List/>
      </CardContent>
      </Card>
    </Container>
    
  )
}

export default GestionOffre;