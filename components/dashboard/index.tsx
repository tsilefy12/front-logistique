import { Card, Divider, FormLabel, Stack } from "@mui/material";
import HeaderDashboard from "./header";
import CercleChart from "./cercleChart";
import CardDashboard from "./card";
import VerticalMenu from "./menu";
import useFetchSuplyAndConsumableList from "../supply-and-consumable/entreSortie/hooks/useFetchSupplyAndConsumables";
import { Fragment, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import DemiCercleChart from "./demiCercle";
import { padding } from "polished";
import Typography from "../../themes/overrides/Typography";
import { Label } from "@mui/icons-material";
import allMenu from "../../config/menu";
import useFetchVendors from "../vendor/hooks/useFetchVendors";
import useFetchTransportationEquipments from "../materiel_de_transport/hooks/useFetchTransportationEquipments";
import { TransportationEquipmentItem } from "../../redux/features/transportation_equipment/transportationEquipment.interface";
import useFetchTypeEquipment from "../configurations/type-equipment/hooks/useFetchTypeEquipment";
import { TypeEquipmentItem } from "../../redux/features/typeEquipment/typeEquipmentSlice.interface";
import useFetchEquipment from "../materiels/informatique/hooks/useFetchEquipment";
import { EquipmentItem } from "../../redux/features/equipment/equipment.interface";

const Dashboard = () => {
  const router = useRouter();
  const { suplyAndConsumableList } = useAppSelector(
    (state) => state.suplyAndConsumable
  );
  const dispatch = useAppDispatch();
  const fetchSuplyAndConsumableList = useFetchSuplyAndConsumableList();
  const { vendors } = useAppSelector((state) => state.vendor);
  const fetchVendors = useFetchVendors();
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const fetchTransportationEquipments = useFetchTransportationEquipments();
  const fetchTypeEquipment = useFetchTypeEquipment();
  const { typeEquipmentList } = useAppSelector((state) => state.typeEquipment);
  const { equipments } = useAppSelector((state) => state.equipment);
  const fetchEquipment = useFetchEquipment();
  const fetchEtatMateriel = useEffect(() => {
    fetchSuplyAndConsumableList();
    fetchVendors();
    fetchTransportationEquipments();
    fetchTypeEquipment();
    fetchEquipment();
  }, [router.query]);
  const menus = allMenu();
  const listFltered: { id: string; name: number }[] = [];
  suplyAndConsumableList.forEach((element: any) => {
    const restFiltre = element.reste;
    const seuilfiltre = element.seuil;
    if (restFiltre <= seuilfiltre) {
      return listFltered.push({ id: element.designation, name: element.reste });
    }
    return [];
  });
  const statusCounts: { [key: string]: number } = {};

  // Comptez le nombre d'équipements par statut
  equipments.forEach((equipment: EquipmentItem) => {
    if (statusCounts[equipment.status!]) {
      statusCounts[equipment.status!]++;
    } else {
      statusCounts[equipment.status!] = 1;
    }
  });
  return (
    <Stack direction="column">
      <HeaderDashboard />
      <Stack direction={"column"}>
        <Stack direction={"column"} padding={2} gap={1}>
          <FormLabel>Bienvenue Rakoto</FormLabel>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
            gap={3}
            display={"flex"}
            flexDirection={"row"}
          >
            <Card
              sx={{
                ...styleCard,
                width: "45%",
                justifyContent: "flex-start",
                alignItems: "start",
                overflow: "auto",
              }}
            >
              <Stack>
                <p
                  style={{
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
            <Card
              sx={{
                ...styleCard,
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "start",
              }}
            >
              <Stack justifyContent={"left"} alignItems={"start"}>
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Recharge du carburant
                </p>
              </Stack>
              {/* <Stack sx={{ paddingTop: 2 }}>
                <DemiCercleChart />
              </Stack> */}
            </Card>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} padding={2}>
          <Card
            sx={{
              ...styleCard,
              width: "50%",
              alignItems: "start",
              height: "5%",
            }}
          >
            <Stack>
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Montant mensuel d'entretien de voiture en{" "}
                {new Date().getFullYear()}
              </p>
            </Stack>
            <Stack sx={{ marginTop: -4, width: "100%", height: "50%" }}>
              <CercleChart />
            </Stack>
          </Card>
          <Stack
            direction={"column"}
            gap={2}
            height={"100%"}
            fontWeight={"bold"}
          >
            <Card
              sx={{
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 2,
                height: 114,
                overflow: "auto",
              }}
            >
              <Stack direction={"column"} gap={2}>
                <p>Nombre de materièle de transport</p>
                <Stack direction={"column"} gap={1}>
                  {typeEquipmentList.map(
                    (t: TypeEquipmentItem) =>
                      transportationEquipments.filter((f) => f.type == t.id)
                        .length != 0 && (
                        <Stack
                          direction={"row"}
                          gap={8}
                          alignItems={"center"}
                          key={t.id!}
                        >
                          <span>
                            {
                              transportationEquipments.filter(
                                (f) => f.type == t.id
                              ).length
                            }
                          </span>
                          <span>
                            -{t.type} {t.prefix}
                          </span>
                        </Stack>
                      )
                  )}
                </Stack>
              </Stack>
            </Card>
            <Card
              sx={{
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 2,
                height: 110,
              }}
            >
              <Stack direction={"column"} gap={2} alignItems={"center"}>
                <p>
                  Nombre de{" "}
                  {vendors.length > 1 ? "fournisseurs" : "fournisseur"}
                </p>
                <span style={{ paddingBottom: 4 }}>{vendors.length}</span>
              </Stack>
            </Card>
            <Card
              sx={{
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 2,
                height: 110,
                overflow: "auto",
              }}
            >
              <Stack direction={"column"} gap={2}>
                <p>Nombre de materièle selon leur état</p>
                <Stack direction={"column"} gap={1}>
                  {/* Mapper à travers les statuts comptés et les afficher */}
                  {Object.keys(statusCounts).map((status, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      gap={8}
                      alignItems={"center"}
                    >
                      <span>{statusCounts[status]}</span>
                      <span>
                        {status == "GOOD"
                          ? "Bon"
                          : status == "BAD"
                          ? "Mauvais"
                          : "Neuf"}
                      </span>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Stack>
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
  height: 125,
};
