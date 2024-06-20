import { Card, Stack } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchTransportationEquipments from "../../materiel_de_transport/hooks/useFetchTransportationEquipments";
import useFetchTypeEquipment from "../../configurations/type-equipment/hooks/useFetchTypeEquipment";
import { TypeEquipmentItem } from "../../../redux/features/typeEquipment/typeEquipmentSlice.interface";

const CardTranpostationEquipment = () => {
  const fetchTransportationEquipments = useFetchTransportationEquipments();
  const fetchTypeEquipment = useFetchTypeEquipment();

  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const { typeEquipmentList } = useAppSelector((state) => state.typeEquipment);
  const stableFetchTypeEquipment = useCallback(fetchTypeEquipment, []);

  useEffect(() => {
    stableFetchTypeEquipment();
  }, [stableFetchTypeEquipment]);

  const colors = [
    "#4caf50", // green
    "#f44336", // red
    "rgb(75, 192, 192)", // blue
    "#ffeb3b", // yellow
    "#ff9800", // orange
    "#9c27b0", // purple
  ];

  return (
    <Card
      sx={{
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 2,
        height: 175,
        overflow: "auto",
      }}
    >
      <Stack direction={"column"} gap={2}>
        <p>Nombre de materièle de transport</p>
        <Stack direction={"column"} gap={1}>
          {typeEquipmentList.map(
            (t: TypeEquipmentItem, index) =>
              transportationEquipments.filter((f) => f.type == t.id).length !==
                0 && (
                <Stack
                  key={t.id}
                  direction={"row"}
                  gap={8}
                  alignItems={"center"}
                >
                  <span style={{ color: colors[index % colors.length] }}>
                    {
                      transportationEquipments.filter((f) => f.type == t.id)
                        .length
                    }
                  </span>
                  <span style={{ color: "GrayText", fontWeight: "normal" }}>
                    - {t.type} {t.prefix}
                  </span>
                </Stack>
              )
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
export default CardTranpostationEquipment;
