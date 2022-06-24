import { Icon,Container } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ListButtonOffre from './ListButtonOffre'
import List from './list'


const GestionOffre = () => {
  return (
    <Container>
      <ListButtonOffre/>
      <List/>
    </Container>
    
  )
}

export default GestionOffre;