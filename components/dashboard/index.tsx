import { Card, FormControl, FormLabel, Stack } from "@mui/material";
import HeaderDashboard from "./header";
import CercleChart from "./cercleChart";
import CardDashboard from "./card";
import VerticalMenu from "./menu";

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
                            <Stack direction="row" justifyContent="space-between">
                            <FormControl>
                                <CercleChart />
                                </FormControl>
                               <FormControl>
                               <Card sx={styleCard}>
                                  <FormLabel style={{margin: "20px"}}>Cahier 100</FormLabel>
                                  <FormLabel style={{margin: "20px"}}>Stylos 200</FormLabel>
                                  <FormLabel style={{margin: "20px"}}>Cahier 100</FormLabel>
                                  <FormLabel style={{margin: "20px"}}>Cahier 100</FormLabel>
                                  <FormLabel style={{margin: "20px"}}>Cahier 100</FormLabel>
                                </Card>
                                </FormControl>
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
    border: "1px solid black",
    top: 87,
    left: 0,
}
const styelMenu = {
    display: 'flex',
    flexDirection: 'column', // Affichage vertical
    height: '100vh', // Hauteur de 100% de la vue
    backgroundColor: '#f0f0f0', // Exemple de couleur de fond
};
const styleCard = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    border: "1px solid blue",
    width: 200
}