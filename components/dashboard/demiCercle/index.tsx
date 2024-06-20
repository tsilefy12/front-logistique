import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchTransportationEquipments from "../../materiel_de_transport/hooks/useFetchTransportationEquipments";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Stack } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DemiCercleChart: React.FC = () => {
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const fetchTransportEquipments = useFetchTransportationEquipments();

  useEffect(() => {
    fetchTransportEquipments();
  }, [fetchTransportEquipments]);

  const listMateriel: string[] = [];
  const listResteCarburant: number[] = [];

  transportationEquipments.forEach((element) => {
    if (
      element.reste !== 0 &&
      element.kilometrageActuel !== element.kilometrageInitial
    ) {
      listMateriel.push(element.registration || "");
      listResteCarburant.push(element.reste || 0);
    }
  });

  const colors = [
    "#4caf50", // green
    "#f44336", // red
    "#2196f3", // blue
    "#ffeb3b", // yellow
    "#ff9800", // orange
    "#9c27b0", // purple
  ];

  const data = {
    labels: listMateriel.length !== 0 ? listMateriel : ["vide"],
    datasets: [
      {
        label: "Reste",
        data: listResteCarburant.length !== 0 ? listResteCarburant : [0],
        backgroundColor: listResteCarburant.map(
          (_, index) => colors[index % colors.length]
        ),
        borderWidth: 0,
        cutout: "85%", // Creates the semi-circle effect
        rotation: -0.5 * Math.PI, // Start angle (top)
        circumference: Math.PI, // Only half of the circle
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        position: "top" as const,
      },
      datalabels: {
        formatter: (value: any, context: any) => {
          return value; // Display the raw data value
        },
        color: "#fff",
        font: {
          weight: "bold" as const,
        },
      },
    },
  };
  const totalResteCarburant = listResteCarburant.reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        margin: "4px",
      }}
    >
      {listResteCarburant.map((m, index) => (
        <Stack key={index} direction={"column"} gap={2} width={150}>
          <Stack direction={"row"} gap={2}>
            <span
              style={{
                width: `${(m * 100) / totalResteCarburant}%`,
                backgroundColor: colors[index % colors.length],
                padding: "5px 10px",
                color: "#fff",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              {/* Optionally include some content inside the span if needed */}
            </span>
          </Stack>
          <Stack direction={"row"} gap={4}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: colors[index % colors.length],
                }}
              ></div>
              <div>
                {" "}
                {listMateriel[index]} :{" "}
                <span style={{ color: m <= 5 ? "red" : "rgb(75, 192, 192)" }}>
                  {m}
                </span>{" "}
                {m > 1 ? "L" : "L"}
              </div>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </div>
  );
};

export default DemiCercleChart;
