import { Card, Stack } from "@mui/material";
import HeaderDashboard from "./header";
import CercleChart from "./cercleChart";
import useFetchSuplyAndConsumableList from "../supply-and-consumable/entreSortie/hooks/useFetchSupplyAndConsumables";
import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import DemiCercleChart from "./demiCercle";
import useFetchVendors from "../vendor/hooks/useFetchVendors";
import useFetchTypeEquipment from "../configurations/type-equipment/hooks/useFetchTypeEquipment";
import useFetchEquipment from "../materiels/informatique/hooks/useFetchEquipment";
import { EquipmentItem } from "../../redux/features/equipment/equipment.interface";
import CardTranpostationEquipment from "./transportationEquipment";
import allMenu from "../../config/menu";
import FooterBackOffice from "../../layouts/backOffice/FooterBackOffice";
import Menu from "./menu";
import {
  Business,
  TwoWheelerOutlined,
  DirectionsCarOutlined,
  DirectionsBoatOutlined,
} from "@mui/icons-material";
import useFetchLocationDeTransport from "../materiel_de_transport/location/hooks/useFetchLocationDeTransport";
import useFetchGrant from "../materiel_de_transport/suivi_carburant/hooks/useFetchGrant";
import formatMontant from "../../hooks/format";
import useFetchMissionTransport from "../materiel_de_transport/mission/hooks/useFectMission";

const Dashboard = () => {
  const { suplyAndConsumableList } = useAppSelector(
    (state) => state.suplyAndConsumable
  );
  const { vendors } = useAppSelector((state) => state.vendor);
  const { equipments } = useAppSelector((state) => state.equipment);
  const { user } = useAppSelector((state) => state.auth);

  const fetchSuplyAndConsumableList = useFetchSuplyAndConsumableList();
  const fetchVendors = useFetchVendors();
  const fetchTypeEquipment = useFetchTypeEquipment();
  const { typeEquipmentList } = useAppSelector((state) => state.typeEquipment);
  const fetchEquipment = useFetchEquipment();
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const [listFiltered, setListFiltered] = useState<
    { id: string; name: number }[]
  >([]);
  const [nomUtilisateur, setNomUtilisateur] = useState<string>("");
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const { locationDeTransports } = useAppSelector(
    (state) => state.locationDeTransport
  );
  const fetchLocationTransport = useFetchLocationDeTransport();
  const menu = allMenu();
  const fetchGrant = useFetchGrant();
  const { grantList } = useAppSelector((state) => state.grant);
  const { missionTransports } = useAppSelector(
    (state) => state.missionDeTransport
  );
  const fetchMissionTransport = useFetchMissionTransport();
  useEffect(() => {
    fetchSuplyAndConsumableList();
    fetchVendors();
    fetchTypeEquipment();
    fetchEquipment();
    fetchLocationTransport();
    fetchGrant();
    fetchMissionTransport();
  }, []);

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
  const [locationExter, setLocationExter] = useState<any[]>([]);

  useEffect(() => {
    const grantSums = locationDeTransports.reduce((acc: any, item: any) => {
      if (item.grant) {
        if (!acc[item.grant]) {
          acc[item.grant] = { grant: item.grant, montant: 0 };
        }
        acc[item.grant].montant += item.montant;
      }
      return acc;
    }, {});

    const groupedList = Object.values(grantSums);
    setLocationExter(groupedList);
  }, [locationDeTransports]);

  const [locationInterne, setLocationInterne] = useState<any[]>([]);

  useEffect(() => {
    const grantSums = missionTransports.reduce((acc: any, item: any) => {
      if (item.grant) {
        if (!acc[item.grant]) {
          acc[item.grant] = { grant: item.grant, montant: 0 };
        }
        acc[item.grant].montant += item.montant;
      }
      return acc;
    }, {});

    const groupedList = Object.values(grantSums);
    setLocationInterne(groupedList);
  }, [missionTransports]);
  return (
    <Stack direction="column" sx={{ backgroundColor: "#EFF2E80A" }}>
      <HeaderDashboard />
      <Card
        sx={{
          minWidth: "auto",
          maxWidth: "auto",
          margin: 2,
        }}
      >
        <Stack direction={"column"}>
          <Stack direction={"row"} justifyContent={"space-between"}></Stack>
          <Stack direction={"column"} padding={2} gap={1}>
            <Stack
              direction={"row"}
              sx={{ width: "100%", minHeight: "30%", maxHeight: "30%" }}
              gap={3}
            >
              <Card
                sx={{
                  ...styleCard,
                  width: "25%",
                  justifyContent: "flex-start",
                  alignItems: "start",
                  overflow: "auto",
                  minHeight: "100%",
                  maxHeight: "100%",
                  gap: 1,
                }}
              >
                <Stack>
                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    Liste des articles à acheter
                  </p>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                  paddingLeft={2}
                  paddingRight={2}
                  borderBottom={"2px solid #E0E0E0"}
                >
                  <span>Article</span>
                  <span>Reste</span>
                </Stack>
                <Stack
                  sx={{
                    ...styleCard,
                    justifyContent: "flex-start",
                    alignItems: "start",
                    width: "100%",
                    border: "none",
                    paddingLet: 2,
                    paddingRight: 2,
                    paddingTop: 0,
                    paddingBottom: 2,
                    gap: 1,
                  }}
                >
                  {listFiltered
                    .sort((a, b) => b.id.localeCompare(a.id))
                    .map((i) => (
                      <Stack
                        key={i.id}
                        direction={"column"}
                        sx={{ width: "100%" }}
                      >
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
                              paddingRight: 4,
                            }}
                          >
                            {i.name}
                          </p>
                        </Stack>
                      </Stack>
                    ))}
                </Stack>
              </Card>
              <Card
                sx={{
                  ...styleCard,
                  width: "50%",
                  justifyContent: "flex-start",
                  alignItems: "start",
                  minHeight: "100%",
                  maxHeight: "100%",
                  paddingRight: 2,
                }}
              >
                <Stack justifyContent={"left"} alignItems={"start"}>
                  <p style={{ textAlign: "left", fontWeight: "bold" }}>
                    Recharge du carburant
                  </p>
                </Stack>
                <Stack
                  direction={"row"}
                  sx={{
                    marginTop: -3.5,
                    paddingRight: 4,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <DemiCercleChart />
                </Stack>
              </Card>
              <Card
                sx={{
                  ...styleCard,
                  width: "auto !important",
                  justifyContent: "center",
                  alignItems: "start",
                  minHeight: "100%",
                  maxHeight: "100%",
                }}
              >
                <Menu />
              </Card>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            padding={2}
            gap={4}
            minHeight="100%"
            maxHeight="100%"
          >
            <Card
              sx={{
                ...styleCard,
                width: "50%",
                alignItems: "start",
                minHeight: "100%",
                maxHeight: "100%",
                paddingBottom: 0,
              }}
            >
              <Stack>
                <p style={{ fontWeight: "bold" }}>
                  Montant mensuel d'entretien de voiture en{" "}
                  {new Date().getFullYear()}
                </p>
              </Stack>
              <Stack
                marginTop={-4}
                width="100%"
                sx={{
                  "& .MuiPaper-root": {
                    width: "100%",
                  },
                }}
              >
                <CercleChart />
              </Stack>
            </Card>
            <Stack
              direction={"column"}
              gap={4}
              height={"100%"}
              fontWeight={"bold"}
            >
              <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
                <Card
                  sx={{
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 1,
                    height: 150,
                    width: "50%",
                    border: "1px solid #E0E0E0",
                    backgroundColor: "#A4C754",
                    borderRadius: "10px",
                  }}
                >
                  <Stack direction={"column"} gap={2}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <p>
                        {vendors.length > 1 ? "Fournisseurs" : "Fournisseur"}
                      </p>
                      <img
                        src="/logistique/images/logo/vendor.png"
                        width={40}
                        height={40}
                      />
                    </Stack>
                    <span
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#005259",
                        fontSize: "35px",
                        paddingTop: "5px",
                      }}
                    >
                      {vendors.length}
                    </span>
                  </Stack>
                </Card>
                <CardTranpostationEquipment />
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Card
                  sx={{
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 1,
                    paddingBottom: 4,
                    minHeight: "100%",
                    maxHeight: "100%",
                    width: "60%",
                    backgroundColor: "#A4C754",
                    borderRadius: "10px",
                  }}
                >
                  <Stack direction={"column"} gap={2}>
                    <p>Matériel de transport</p>
                    <Stack
                      direction={"row"}
                      gap={2}
                      justifyContent={"space-between"}
                    >
                      <Stack direction={"column"} gap={2} alignItems={"center"}>
                        <span>
                          <DirectionsCarOutlined fontSize="large" />
                        </span>
                        <span style={{ color: "white", fontSize: "35px" }}>
                          {(() => {
                            const count = transportationEquipments
                              .filter(
                                (f) =>
                                  f.type && f.typeEquipment?.type === "Voiture"
                              )
                              .reduce((total, f) => total + 1, 0);

                            return count;
                          })()}
                        </span>
                      </Stack>
                      <Stack direction={"column"} gap={2} alignItems={"center"}>
                        <span>
                          <TwoWheelerOutlined fontSize="large" />
                        </span>
                        <span style={{ color: "#18af3a", fontSize: "35px" }}>
                          {(() => {
                            const count = transportationEquipments
                              .filter(
                                (f) =>
                                  f.type && f.typeEquipment?.type === "Moto"
                              )
                              .reduce((total, f) => total + 1, 0);

                            return count;
                          })()}
                        </span>
                      </Stack>
                      <Stack direction={"column"} gap={2} alignItems={"center"}>
                        <span>
                          <DirectionsBoatOutlined fontSize="large" />
                        </span>
                        <span
                          style={{
                            color: "#006b71",
                            fontSize: "35px",
                          }}
                        >
                          {(() => {
                            const count = transportationEquipments
                              .filter(
                                (f) =>
                                  f.type && f.typeEquipment?.type === "Pirogue"
                              )
                              .reduce((total, f) => total + 1, 0);

                            return count;
                          })()}
                        </span>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
                <Card
                  sx={{
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 1,
                    minHeight: "100%",
                    maxHeight: "100%",
                    width: "35%",
                    backgroundColor: "#A4C754",
                  }}
                >
                  <Stack direction={"column"} gap={2}>
                    <Stack
                      direction="row"
                      gap={2}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <p>Stock matériels</p>
                      <img
                        src="/logistique/images/logo/warehouse.png"
                        width={35}
                        height={35}
                      />
                    </Stack>
                    <span
                      style={{
                        color: "#005259",
                        fontSize: "35px",
                        justifyContent: "center",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {suplyAndConsumableList.length}
                    </span>
                  </Stack>
                </Card>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={2}
            gap={4}
          >
            <Card
              sx={{
                ...styleCard,
                width: "50%",
                justifyContent: "flex-start",
                alignItems: "start",
                overflow: "auto",
                minHeight: "100%",
                maxHeight: "100%",
                gap: 1,
                backgroundColor: "#A4C754",
              }}
            >
              <Stack>
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  Liste par Grant des locations externes
                </p>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
                paddingLeft={2}
                paddingRight={2}
                borderBottom={"2px solid #000000"}
              >
                <span>Grant</span>
                <span>Montant</span>
              </Stack>
              <Stack
                sx={{
                  ...styleCard,
                  justifyContent: "flex-start",
                  alignItems: "start",
                  width: "100%",
                  border: "none",
                  paddingLeft: 2, // Fixed paddingLeft typo
                  paddingRight: 2,
                  paddingTop: 0,
                  paddingBottom: 2,
                  gap: 1,
                }}
              >
                {locationExter.map((i) => (
                  <Stack key={i.id} direction={"column"} sx={{ width: "100%" }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      sx={{ width: "100%" }}
                    >
                      <p>{grantList.find((e) => e.id === i.grant)?.code}</p>
                      <p
                        style={{
                          color: "black",
                          paddingRight: 4,
                        }}
                      >
                        {formatMontant(i.montant)}
                      </p>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Card>
            <Card
              sx={{
                ...styleCard,
                width: "50%",
                justifyContent: "flex-start",
                alignItems: "start",
                overflow: "auto",
                minHeight: "100%",
                maxHeight: "100%",
                gap: 1,
                backgroundColor: "#A4C754",
              }}
            >
              <Stack>
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  Liste par Grant des locations internes
                </p>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
                paddingLeft={2}
                paddingRight={2}
                borderBottom={"2px solid #000000"}
              >
                <span>Grant</span>
                <span>Montant</span>
              </Stack>
              <Stack
                sx={{
                  ...styleCard,
                  justifyContent: "flex-start",
                  alignItems: "start",
                  width: "100%",
                  border: "none",
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingTop: 0,
                  paddingBottom: 2,
                  gap: 1,
                }}
              >
                {locationInterne.map((i) => (
                  <Stack key={i.id} direction={"column"} sx={{ width: "100%" }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      sx={{ width: "100%" }}
                    >
                      <p>{grantList.find((e) => e.id === i.grant)?.code}</p>
                      <p
                        style={{
                          color: "black",
                          paddingRight: 4,
                        }}
                      >
                        {formatMontant(i.montant)}
                      </p>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Card>
      <FooterBackOffice />
    </Stack>
  );
};

export default Dashboard;

const styleCard = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 3,
  padding: 2,
  border: "1px solid #E0E0E0",
  // borderRadius: "10px",
};
