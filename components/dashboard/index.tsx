import { Card, FormControl, FormLabel, Stack} from "@mui/material";
import HeaderDashboard from "./header";
import CercleChart from "./cercleChart";
import CardDashboard from "./card";
import VerticalMenu from "./menu";
import DemiCercleChart from "./demiCercle";


const Dashboard = () => {
    return (
        <FormControl>
            <Stack direction="column">
                <HeaderDashboard />
                <FormControl fullWidth sx={styles}>
                    <Stack direction="row" justifyContent="space-between">
                        <div>
                            <div style={{ margin: "10px", height: "20vh" }}>
                                <CardDashboard />
                            </div>
                            <Stack direction="row" spacing={13}>
                            <FormControl>
                                <CercleChart />
                                </FormControl>
                               <FormControl>
                               <Card sx={styleCard}>
                                  <FormLabel style={{margin: "10px"}}>Cahier <b>100</b></FormLabel>
                                  <FormLabel style={{margin: "10px"}}>Stylos <b>200</b></FormLabel>
                                  <FormLabel style={{margin: "10px"}}>Crayon <b>20</b></FormLabel>
                                  <FormLabel style={{margin: "10px"}}>Crayon couleur <b>12</b></FormLabel>
                                  <FormLabel style={{margin: "10px"}}>Cahier <b>100</b></FormLabel>
                                  <FormLabel style={{margin: "10px"}}>Stylos <b>200</b></FormLabel>
                                  <FormLabel style={{margin: "10px"}}>Crayon <b>20</b></FormLabel>
                                  <FormLabel style={{margin: "10px"}}>Crayon couleur <b>12</b></FormLabel>
                                </Card>
                                </FormControl>
                                {/* <FormControl>
                                <DemiCercleChart/>
                                </FormControl> */}
                                </Stack>
                        </div>
                        <div>
                            <FormControl className="nav-bar">
                                <VerticalMenu />
                            </FormControl>
                        </div>
                    </Stack>
                </FormControl>
            </Stack>
        </FormControl>
    )
}
export default Dashboard;

const styles = {
    position: "fixed",
    //border: "1px solid black",
    top: 65,
    left: 0,
    padding: 4,
    backgroundColor: "rgb(245, 245, 245)"
}
// const styelMenu = {
//     display: 'flex',
//     flexDirection: 'column', // Affichage vertical
//     height: '100vh', // Hauteur de 100% de la vue
//     backgroundColor: '#f0f0f0', // Exemple de couleur de fond
// };
const styleCard = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #98FB98",
    width: 250,
    height: 250,
    overflow: "auto",
    marginTop: 5,
}
