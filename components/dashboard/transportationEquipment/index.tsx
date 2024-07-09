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

  // Filter and reduce to count types
  const typeCounts = typeEquipmentList
    .filter((f) => f.prefix)
    .reduce((acc, curr) => {
      const type = curr.prefix;
      if (acc[type]) {
        acc[type].count += 1;
      } else {
        acc[type] = {
          type,
          count: 1,
        };
      }
      return acc;
    }, {});

  const typeEntries = Object.values(typeCounts);

  return (
    <Card
      sx={{
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 2,
        height: 150,
        backgroundColor: "#A4C754",
        overflow: "auto",
      }}
    >
      <Stack direction={"column"} gap={2}>
        <p style={{ display: "flex" }}>Matériels</p>
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
      </Stack>
    </Card>
  );
};

export default CardTransportationEquipment;
