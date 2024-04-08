import { Card, Container, Stack } from "@mui/material";

const CardDashboard = () =>{
  return (
    <Container>
        <Stack direction="row" justifyContent="space-around" spacing={15}>
            <Card>
                Montant mensuel d'entretien de voiture
            </Card>
            <Card>
                Liste des articles
            </Card>
            <Card>
                Recharge du carbuarant
            </Card>
        </Stack>
    </Container>
  )
}
export default CardDashboard;