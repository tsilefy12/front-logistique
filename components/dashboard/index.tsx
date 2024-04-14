import { Card, FormControl, FormLabel, Stack } from "@mui/material";
import HeaderDashboard from "./header";
import CercleChart from "./cercleChart";
import CardDashboard from "./card";
import VerticalMenu from "./menu";
import useFetchSuplyAndConsumableList from "../supply-and-consumable/entreSortie/hooks/useFetchSupplyAndConsumables";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/reduxHooks";
import DemiCercleChart from "./demiCercle";

const Dashboard = () => {
    const router = useRouter();
    const { suplyAndConsumableList } = useAppSelector((state) => state.suplyAndConsumable)
    const fetchSuplyAndConsumableList = useFetchSuplyAndConsumableList();
    useEffect(() => {
        fetchSuplyAndConsumableList();
    }, [router.query])

    const listFltered: { id: string, name: number }[] = [];
    suplyAndConsumableList.forEach((element: any) => {
        const restFiltre = element.reste;
        const seuilfiltre = element.seuil;
        if (restFiltre <= seuilfiltre) {
            return listFltered.push({ id: element.designation, name: element.reste })
        }
        return [];
    });

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
                                        { 
                                        (listFltered.length !=0) ? 
                                            listFltered.map((itme: any, index: any) => (
                                                <FormLabel key={index}
                                                    style={{ margin: "10px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", overflow: "auto"}}>
                                                    <FormLabel style={{marginLeft: "15px", color: "black"}}>{itme.id}</FormLabel>
                                                    <FormLabel style={{ marginRight: "15px", fontWeight: 900, color: "black"}}>{itme.name}</FormLabel>
                                                </FormLabel>
                                            )):
                                            (
                                                <FormLabel style={{width: "auto", marginTop: "35%", textAlign: 'center'}}>AUCUN ARTICLE</FormLabel>
                                            )
                                        }
                                    </Card>
                                </FormControl>
                                <FormControl>
                                <DemiCercleChart/>
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
    //border: "1px solid black",
    top: 65,
    left: 0,
    padding: 4,
    backgroundColor: "rgb(245, 245, 245)"
}

const styleCard = {
    display: "flex",
    flexDirection: "column",
    width: 280,
    height: 250,
    overflow: "auto",
    marginTop: 5,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
}
