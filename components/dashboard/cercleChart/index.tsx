import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchCarVouchers from "../../materiel_de_transport/bon_de_voiture/hooks/useFetchCarVoucher";
import { useRouter } from "next/router";
import { X } from "@mui/icons-material";

const CercleChart: React.FC = () => {
  const { carVouchers } = useAppSelector((state) => state.carVoucher);
  const fetchCarVouchers = useFetchCarVouchers();
  const router = useRouter();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const monthsInLetters = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  useEffect(() => {
    fetchCarVouchers();
  }, []);

  const [dataLabels, setDataLabels] = useState<string[]>(monthsInLetters);
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    if (carVouchers.length === 0) return;

    const now = new Date().getFullYear();
    const totalMontantByCarAndMonth: {
      [car: string]: { [month: string]: number };
    } = {};

    carVouchers.forEach((result) => {
      const date = new Date(result.date || 0);
      const month = monthsInLetters[date.getMonth()];
      const year = date.getFullYear();
      const car = result.transportationEquipment.registration; // Assurez-vous que c'est le bon champ pour le numéro de voiture

      if (year === now) {
        const montantTotal = parseInt(result.montantTotal || "0", 10);
        if (month && !isNaN(montantTotal)) {
          if (!totalMontantByCarAndMonth[car]) {
            totalMontantByCarAndMonth[car] = {};
          }
          totalMontantByCarAndMonth[car][month] =
            (totalMontantByCarAndMonth[car][month] || 0) + montantTotal;
        }
      }
    });

    const newDatasets = Object.keys(totalMontantByCarAndMonth).map(
      (car, index) => {
        const carData = monthsInLetters.map(
          (month) => totalMontantByCarAndMonth[car][month] || 0
        );

        return {
          label: `Voiture ${car}`,
          data: carData,
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length],
          borderWidth: 2,
          cubicInterpolationMode: "monotone",
          pointHoverBorderWidth: 1,
          tension: 0.1,
          fill: false,
        };
      }
    );

    setDatasets(newDatasets);
  }, [carVouchers]);

  const colors = [
    "#f44336", // red
    "rgb(75, 192, 192)", // blue
    "#ffeb3b", // yellow
    "#ff9800", // orange
    "#9c27b0", // purple
    "#4caf50", // green
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.labels = dataLabels;
      chartInstanceRef.current.data.datasets = datasets.map((dataset) => ({
        ...dataset,
        pointRadius: 0, // Enlever les billes
      }));
      chartInstanceRef.current.update();
    } else {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: dataLabels,
          datasets: datasets.map((dataset) => ({
            ...dataset,
            pointRadius: 0, // Enlever les billes
          })),
        },
        options: {
          plugins: {
            datalabels: {
              color: "white",
              display: true,
              align: "center",
              anchor: "start",
              textAlign: "center",
            },
            legend: {
              position: "bottom",
            },
            tooltip: {
              enabled: true,
              mode: "nearest",
              intersect: false,
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [dataLabels, datasets]);

  return (
    <div style={{ width: "auto", display: "flex" }}>
      <canvas
        ref={chartRef}
        id="circle-chart"
        style={{ display: "flex", width: "100%" }}
      ></canvas>
    </div>
  );
};

export default CercleChart;
