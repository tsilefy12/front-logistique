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
import { padding } from "polished";

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
        <Stack></Stack>
        <Stack direction={"row"} gap={2} flexWrap={"wrap"} paddingTop={2}>
          <Card sx={styleCard}>
            <Stack>
              <p
                style={{
                  fontSize: "1.2em",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Montant mensuel d'entretien de voiture
              </p>
            </Stack>
            <Stack sx={{ ...styleCard, marginTop: -4 }}>
              <CercleChart />
            </Stack>
          </Card>
          <Card sx={styleCard}>
            <Stack>
              <p
                style={{
                  fontSize: "1.2em",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Liste des articles à acheter dans fiche de stock
              </p>
            </Stack>
            <Stack
              sx={{
                ...styleCard,
                justifyContent: "flex-start",
                height: "auto",
                maxHeight: "calc(100vh - 240px)",
                marginTop: -3.5,
              }}
            >
              {listFltered.map((i) => (
                <Stack direction={"column"} sx={{ width: "100%" }}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    paddingLeft={2}
                    paddingRight={2}
                    sx={{ width: "100%" }}
                    key={i.id}
                  >
                    <p>{i.id}</p>
                    <p>{i.name}</p>
                  </Stack>
                  <Divider />
                </Stack>
              ))}
            </Stack>
          </Card>
          <Card sx={{ ...styleCard }}>
            <Stack>
              <p
                style={{
                  fontSize: "1.2em",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Recharge du carburant
              </p>
            </Stack>
            <Stack sx={{ paddingTop: 2 }}>
              <DemiCercleChart />
            </Stack>
          </Card>
        </Stack>
        <Stack sx={{ height: "100%", borderLeft: "1px solid gray" }}>
          <VerticalMenu />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Dashboard;

const styleCard = {
  width: 300,
  // height: 100,
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 5,
  padding: 2,
};
