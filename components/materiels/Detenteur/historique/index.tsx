import { Icon,Container,Stack } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ListButtonDetenteur from './form/listButton'
import Content from './table/Content'


const Detenteur = () => {
  return (
    <Container>
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
      <ListButtonDetenteur/>
      <Content/>
      </Stack>
    </Container>
    
  )
}

export default Detenteur;