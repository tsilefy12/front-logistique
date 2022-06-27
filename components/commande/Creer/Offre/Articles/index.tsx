import { Icon,Container } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ListButtonArticle from './table/listeBottongestionArticle'
import ListArticle from './table/liste_article'


const GestionArticle = () => {
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <ListButtonArticle/>
      <ListArticle/>
      </CardContent>
      </Card>
    </Container>
    
  )
}

export default GestionArticle;