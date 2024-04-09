import { Card, Container, FormControl, Stack } from "@mui/material";
import { padding } from "polished";

const CardDashboard = () => {
    return (
        <Container style={{marginTop: "-10px"}}>
            <Stack direction="row" justifyContent="space-around" spacing={15}>
                <Card sx={styleCardHeader1}>
                    <FormControl style={{ margin: "10px"}}>
                        Montant mensuel d'entretien de voiture
                    </FormControl>
                </Card>
                <Card sx={styleCardHeader2}>
                    <FormControl style={{ margin: "10px"}}>
                        Liste des articles
                    </FormControl>
                </Card>
                <Card sx={styleCardHeader3}>
                    <FormControl style={{ margin: "10px" }}>
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
    marginTop: 5,
   // backgroundColor: "rgb(224, 224, 224)"
}
const styleCardHeader2 = {
   // border: "1px solid #98FB98",
    width: 250,
    height: 100,
    overflow: "auto",
    marginTop: 5,
    //backgroundColor: "#008000",
}
const styleCardHeader3 = {
    //border: "1px solid #98FB98",
    width: 250,
    height: 100,
    overflow: "auto",
    marginTop: 5,
    //backgroundColor: "#FFA07A"
    //color: "#000000",
}