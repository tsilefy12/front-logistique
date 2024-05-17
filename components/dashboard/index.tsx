import { Card, Divider, Stack } from "@mui/material";
import HeaderDashboard from "./header";
import CercleChart from "./cercleChart";
import CardDashboard from "./card";
import VerticalMenu from "./menu";
import useFetchSuplyAndConsumableList from "../supply-and-consumable/entreSortie/hooks/useFetchSupplyAndConsumables";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/reduxHooks";
import DemiCercleChart from "./demiCercle";

const Dashboard = () => {
  const router = useRouter();
  const { suplyAndConsumableList } = useAppSelector(
    (state) => state.suplyAndConsumable
  );
  const fetchSuplyAndConsumableList = useFetchSuplyAndConsumableList();
  useEffect(() => {
    fetchSuplyAndConsumableList();
  }, [router.query]);

  const listFltered: { id: string; name: number }[] = [];
  suplyAndConsumableList.forEach((element: any) => {
    const restFiltre = element.reste;
    const seuilfiltre = element.seuil;
    if (restFiltre <= seuilfiltre) {
      return listFltered.push({ id: element.designation, name: element.reste });
    }
    return [];
  });

  return (
    <Stack direction="column">
      <HeaderDashboard />
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        sx={{ height: "calc(100vh - 80px)" }}
      >
        <Stack direction={"row"} gap={2} padding={2} flexWrap={"wrap"}>
          <Stack direction={"column"} alignItems={"center"} gap={4}>
            <Card sx={styleCard}>
              <p style={{ fontSize: "1.2em", textAlign: "center" }}>
                Montant mensuel d'entretien de voiture
              </p>
            </Card>
            <CercleChart />
          </Stack>
          <Stack direction={"column"} alignItems={"center"} gap={4}>
            <Card sx={styleCard}>
              <p style={{ fontSize: "1.2em", textAlign: "center" }}>
                Liste des articles à acheter dans fiche de stock
              </p>
            </Card>
            <Card
              sx={{
                ...styleCard,
                justifyContent: "flex-start",
                height: "auto",
                maxHeight: "calc(100vh - 240px)",
              }}
            >
              {listFltered.map((i) => (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  padding={2}
                  sx={{ width: "100%" }}
                  key={i.id}
                >
                  <p>{i.id}</p>
                  <p>{i.name}</p>
                </Stack>
              ))}
            </Card>
          </Stack>
          <Stack direction={"column"} alignItems={"center"} gap={4}>
            <Card sx={styleCard}>
              <p style={{ fontSize: "1.2em", textAlign: "center" }}>
                Recharge du carbuarant
              </p>
            </Card>
            <DemiCercleChart />
          </Stack>
        </Stack>
        <Stack sx={{ height: "100%" }}>
          <VerticalMenu />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Dashboard;

const styleCard = {
  width: 300,
  height: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
