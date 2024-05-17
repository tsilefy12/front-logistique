import { Card, Container, FormControl, Stack } from "@mui/material";

const CardDashboard = () => {
    return (
        <Container maxWidth="lg">
            <Stack direction="row" gap={2} flexWrap={"wrap"}>
                <Card sx={styleCardHeader1}>
                    <FormControl style={{ margin: "10px", fontSize: "1.2em", textAlign: "center" }}>
                        Montant mensuel d'entretien de voiture
                    </FormControl>
                </Card>
                <Card sx={styleCardHeader1}>
                    <Stack style={{ margin: "10px", fontSize: "1.2em", textAlign: "center" }}>
                        Liste des articles à acheter
                        dans fiche de stock
                    </Stack>
                </Card>
                <Card sx={styleCardHeader1}>
                    <FormControl style={{ margin: "10px", fontSize: "1.2em", textAlign: "center" }}>
                        Recharge du carbuarant
                    </FormControl>
                </Card>
            </Stack>
        </Container>
    )
}
export default CardDashboard;

const styleCardHeader1 = {
    //border: "1px solid Darkgray",
    width: 250,
    height: 100,
    overflow: "auto",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)"
    // backgroundColor: "rgb(224, 224, 224)"
}