import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchTransportationEquipments from "../../materiel_de_transport/hooks/useFetchTransportationEquipments";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Stack } from "@mui/material";

ChartJS.register(BarElement, Tooltip, Legend, ChartDataLabels);

const BarChart: React.FC = () => {
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const fetchTransportEquipments = useFetchTransportationEquipments();

  useEffect(() => {
    fetchTransportEquipments();
  }, []);

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
    "rgb(75, 192, 192)", // blue
    "#ff9800", // orange
    "#9c27b0", // purple
  ];

  const data = {
    labels: listMateriel.length !== 0 ? listMateriel : ["vide"],
    datasets: [
      {
        label: "Reste de carburant (L)",
        data: listResteCarburant.length !== 0 ? listResteCarburant : [0],
        backgroundColor: listResteCarburant.map(
          (_, index) => colors[index % colors.length]
        ),
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "top" as const,
      },
      datalabels: {
        formatter: (value: any) => {
          return value;
        },
        color: "#fff",
        font: {
          weight: "bold" as const,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
        },
        grid: {
          display: false,
        },
        position: "bottom",
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          callback: function (value: number) {
            return value + "L";
          },
        },
        grid: {
          display: true,
        },
        position: "right",
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "4px",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
