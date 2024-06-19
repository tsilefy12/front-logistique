import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchTransportationEquipments from "../../materiel_de_transport/hooks/useFetchTransportationEquipments";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DemiCercleChart;
