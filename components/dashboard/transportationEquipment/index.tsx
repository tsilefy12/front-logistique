import { Card, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchTypeEquipment from "../../configurations/type-equipment/hooks/useFetchTypeEquipment";

const CardTransportationEquipment = () => {
  const fetchTypeEquipment = useFetchTypeEquipment();
  const { typeEquipmentList } = useAppSelector((state) => state.typeEquipment);

  useEffect(() => {
    fetchTypeEquipment();
  }, []);

  const colors = [
    "#42391b", // white
    "#005259", // blue
    "#f8fff8", // yellow
  ];

  const typeCounts = typeEquipmentList
    .filter((f) => f.prefix)
    .reduce((acc, curr) => {
      const type = curr.prefix;
      if (type !== undefined) {
        if (acc[type]) {
          acc[type].count += 1;
        } else {
          acc[type] = {
            type,
            count: 1,
          };
        }
      }
      return acc;
    }, {} as { [key: string]: { type: string; count: number } });

  const typeEntries = Object.values(typeCounts);

  return (
    <Card
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
        paddingTop: 2,
        height: 150,
        backgroundColor: "#A4C754",
        overflow: "auto",
      }}
    >
      <Stack direction={"column"} gap={2} sx={{ maxHeight: "100%" }}>
        <p
          style={{
            display: "flex",
            position: "sticky",
            top: 0,
            backgroundColor: "#A4C754",
            zIndex: 1,
            margin: 0,
          }}
        >
          Matériels
        </p>
        <div style={{ overflowY: "auto", maxHeight: "100%" }}>
          {typeEntries.map((entry, index) => (
            <Stack
              key={entry.type}
              direction={"row"}
              gap={8}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <span style={{ color: colors[index % colors.length] }}>
                {entry.type}
              </span>
              <span
                style={{
                  color: colors[index % colors.length],
                  fontWeight: "normal",
                  fontSize: "20px",
                }}
              >
                {entry.count}
              </span>
            </Stack>
          ))}
        </div>
      </Stack>
    </Card>
  );
};

export default CardTransportationEquipment;
