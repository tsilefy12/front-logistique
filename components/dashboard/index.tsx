import { Card, Divider, FormLabel, Stack } from "@mui/material";
import HeaderDashboard from "./header";
import CercleChart from "./cercleChart";
import CardDashboard from "./card";
import VerticalMenu from "./menu";
import useFetchSuplyAndConsumableList from "../supply-and-consumable/entreSortie/hooks/useFetchSupplyAndConsumables";
import React, { Fragment, useEffect, useMemo, useState } from "react";
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
  const dispatch = useAppDispatch();

  const { suplyAndConsumableList } = useAppSelector(
    (state) => state.suplyAndConsumable
  );
  const { vendors } = useAppSelector((state) => state.vendor);
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const { typeEquipmentList } = useAppSelector((state) => state.typeEquipment);
  const { equipments } = useAppSelector((state) => state.equipment);
  const { user } = useAppSelector((state) => state.auth);

  const fetchSuplyAndConsumableList = useFetchSuplyAndConsumableList();
  const fetchVendors = useFetchVendors();
  const fetchTransportationEquipments = useFetchTransportationEquipments();
  const fetchTypeEquipment = useFetchTypeEquipment();
  const fetchEquipment = useFetchEquipment();

  const [listFiltered, setListFiltered] = useState<
    { id: string; name: number }[]
  >([]);
  const [nomUtilisateur, setNomUtilisateur] = useState<string>("");
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    fetchSuplyAndConsumableList();
    fetchVendors();
    fetchTypeEquipment();
    fetchEquipment();
  }, [
    dispatch,
    fetchSuplyAndConsumableList,
    fetchVendors,
    fetchTypeEquipment,
    fetchEquipment,
  ]);

  useEffect(() => {
    const filteredList = suplyAndConsumableList.filter(
      (element: any) => element.reste <= element.seuil
    );
    setListFiltered(
      filteredList.map((element: any) => ({
        id: element.designation,
        name: element.reste,
      }))
    );

    const countStatus = () => {
      const counts: { [key: string]: number } = {};
      equipments.forEach((equipment: EquipmentItem) => {
        const status = equipment.status;
        if (status) {
          counts[status] = (counts[status] || 0) + 1;
        }
      });
      return counts;
    };
    setStatusCounts(countStatus());

    setNomUtilisateur(user?.name || "");
  }, [suplyAndConsumableList, equipments, user]);
  const colors = [
    "#4caf50", // green
    "#f44336", // red
    "rgb(75, 192, 192)", // blue
    "#ffeb3b", // yellow
    "#ff9800", // orange
    "#9c27b0", // purple
  ];
  return (
    <Stack direction="column">
      <HeaderDashboard />
      <Stack direction={"column"}>
        <Stack direction={"column"} padding={2} gap={1}>
          <FormLabel>Bienvenue {nomUtilisateur}</FormLabel>
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
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  Liste des articles à acheter dans fiche de stock
                </p>
              </Stack>
              <Stack
                sx={{
                  ...styleCard,
                  justifyContent: "flex-start",
                  height: "auto",
                  marginTop: -3.5,
                  width: "85%",
                  margingLeft: 3,
                }}
              >
                {listFiltered.map((i) => (
                  <Stack key={i.id} direction={"column"} sx={{ width: "100%" }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      sx={{ width: "100%" }}
                    >
                      <p>{i.id}</p>
                      <p
                        style={{
                          color: i.name <= 5 ? "red" : "rgb(75, 192, 192)",
                        }}
                      >
                        {i.name}
                      </p>
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
                <p style={{ textAlign: "left", fontWeight: "bold" }}>
                  Recharge du carburant
                </p>
              </Stack>
              <Stack direction={"row"} sx={{ marginTop: -3.5 }}>
                <DemiCercleChart />
              </Stack>
            </Card>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} padding={2}>
          <Card
            sx={{
              ...styleCard,
              width: "70%",
              alignItems: "start",
              height: "10%",
            }}
          >
            <Stack>
              <p style={{ fontWeight: "bold" }}>
                Montant mensuel d'entretien de voiture en{" "}
                {new Date().getFullYear()}
              </p>
            </Stack>
            <Stack marginTop={-4} height={"60%"} width={"100%"}>
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
                height: 120,
                overflow: "auto",
              }}
            >
              <Stack direction={"column"} gap={2}>
                <p>Nombre de materièle de transport</p>
                <Stack direction={"column"} gap={1}>
                  {typeEquipmentList.map(
                    (t: TypeEquipmentItem, index) =>
                      transportationEquipments.filter((f) => f.type == t.id)
                        .length !== 0 && (
                        <Stack
                          key={t.id}
                          direction={"row"}
                          gap={8}
                          alignItems={"center"}
                        >
                          <span
                            style={{ color: colors[index % colors.length] }}
                          >
                            {
                              transportationEquipments.filter(
                                (f) => f.type == t.id
                              ).length
                            }
                          </span>
                          <span
                            style={{ color: "GrayText", fontWeight: "normal" }}
                          >
                            - {t.type} {t.prefix}
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
                paddingTop: 1,
                height: 95,
              }}
            >
              <Stack direction={"column"} gap={2} alignItems={"center"}>
                <p>
                  Nombre de{" "}
                  {vendors.length > 1 ? "fournisseurs" : "fournisseur"}
                </p>
                <span style={{ paddingBottom: 4, color: "rgb(75, 192, 192)" }}>
                  {vendors.length}
                </span>
              </Stack>
            </Card>
            <Card
              sx={{
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 1,
                height: 114,
                overflow: "auto",
              }}
            >
              <Stack direction={"column"} gap={2}>
                <p>Nombre de materièle selon leur état</p>
                <Stack direction={"column"} gap={1}>
                  {Object.keys(statusCounts).map((status, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      gap={8}
                      alignItems={"center"}
                      paddingBottom={1}
                    >
                      <span
                        style={{
                          color:
                            status === "BAD"
                              ? "red"
                              : status === "GOOD"
                              ? "rgb(75, 192, 192)"
                              : "brown",
                        }}
                      >
                        {statusCounts[status]}
                      </span>
                      <span style={{ color: "GrayText", fontWeight: "normal" }}>
                        -{" "}
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
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 5,
  padding: 2,
  height: 125,
};
