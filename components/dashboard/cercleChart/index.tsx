import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchCarVouchers from "../../materiel_de_transport/bon_de_voiture/hooks/useFetchCarVoucher";
import { useRouter } from "next/router";
import { linearGradient } from "polished";

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

  const [dataLabels, setDataLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

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
    setDataLabels(listMois);
    setData(listMontant);
  }, [carVouchers]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.labels = dataLabels;
      chartInstanceRef.current.data.datasets[0].data = data;
      chartInstanceRef.current.update();
    } else {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: dataLabels,
          datasets: [
            {
              label: "Montant par mois",
              data: data,
              backgroundColor: "rgb(75, 192, 192)",
              borderColor: "rgb(75, 192, 192)",
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
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [dataLabels, data]);

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
