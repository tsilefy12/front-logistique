import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchCarVouchers from "../../materiel_de_transport/bon_de_voiture/hooks/useFetchCarVoucher";
import { useRouter } from "next/router";

const CercleChart: React.FC = () => {
  const { carVouchers } = useAppSelector((state) => state.carVoucher);
  const fetchCarVouchers = useFetchCarVouchers();
  const router = useRouter();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

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
  }, [router.query]);
  useEffect(() => {
    if (carVouchers.length === 0) return;

    const now = new Date().getFullYear();
    const totalMontantByMonth: { [key: string]: number } = {};

    carVouchers.forEach((result) => {
      const date = new Date(result.date || 0);
      const month = monthsInLetters[date.getMonth()];
      const year = date.getFullYear();

      if (year === now) {
        const montantTotal = parseInt(result.montantTotal || "0", 10);
        if (month && !isNaN(montantTotal)) {
          totalMontantByMonth[month] =
            (totalMontantByMonth[month] || 0) + montantTotal;
        }
      }
    });

    const listMois = monthsInLetters.map((month) => month);
    const listMontant = listMois.map(
      (month) => totalMontantByMonth[month] || 0
    );

    renderChart(chartRef.current!, listMois, listMontant);
  }, [carVouchers]);

  const renderChart = (
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[]
  ) => {
    // Destroy previous chart instance if exists
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    const colors = ["rgb(75, 192, 192)"];

    new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Montant par mois",
            data: data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            cubicInterpolationMode: "monotone",
            pointHoverBorderWidth: 1,
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            color: "white",
            display: true,
            align: "center",
            anchor: "center",
            textAlign: "center",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            // min: 0,
            // max: Math.max(...data) + 10,
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  };

  return (
    <div style={{ width: "auto", height: 300, display: "flex" }}>
      <canvas
        ref={chartRef}
        id="circle-chart"
        style={{ display: "flex", width: "100%" }}
      ></canvas>
    </div>
  );
};

export default CercleChart;
