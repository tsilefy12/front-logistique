import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchCarVouchers from "../../materiel_de_transport/bon_de_voiture/hooks/useFetchCarVoucher";
import { useRouter } from "next/router";
import ChartDataLabels from "chartjs-plugin-datalabels";

const CercleChart: React.FC = () => {
  const { carVouchers } = useAppSelector((state) => state.carVoucher);
  const fetchCarVouchers = useFetchCarVouchers();
  const router = useRouter();

  let toutLst: { id: string; name: number }[] = [];

  useEffect(() => {
    fetchCarVouchers();
  }, [router.query]);

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const totalMontantByMonth: { [key: string]: number } = {};

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
    const ctx = chartRef.current;
    if (carVouchers.length !== 0) {
      carVouchers.forEach((result) => {
        const now = new Date().getFullYear();
        const date = new Date(result.date || 0);
        const month = monthsInLetters[date.getMonth()];
        const year = new Date(result.date!).getFullYear();

        if (year === now) {
          const montantTotal = parseInt(result.montantTotal || "0");
          if (month && !isNaN(montantTotal)) {
            totalMontantByMonth[month] =
              (totalMontantByMonth[month] || 0) + montantTotal;
          }
        }
      });

      const listMois: string[] = [];
      const listMontant: number[] = [];
      Object.keys(totalMontantByMonth).forEach((month) => {
        listMois.push(month);
        listMontant.push(totalMontantByMonth[month]);
      });

      const colors = [
        "#4caf50", // green
        "#f44336", // red
        "#2196f3", // blue
        "#ffeb3b", // yellow
        "#ff9800", // orange
        "#9c27b0", // purple
      ];

      const newChart = new Chart(ctx!, {
        type: "pie",
        data: {
          labels: listMois.length !== 0 ? listMois : ["vide"],
          datasets: [
            {
              label: "Montant total (en Ariary)",
              data: listMontant.length !== 0 ? listMontant : [0.5],
              backgroundColor: listMontant.map(
                (_, index) => colors[index % colors.length]
              ),
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          animation: false,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: `Montant mensuel d'entretien, année ${new Date().getFullYear()}`,
              font: {
                weight: "normal",
              },
            },
            datalabels: {
              display: true,
              color: "black",
              formatter: (value, context) => {
                return listMois[context.dataIndex];
              },
            },
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
        },
        plugins: [ChartDataLabels],
      });

      return () => {
        newChart.destroy();
      };
    }
  }, [carVouchers]);

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <canvas ref={chartRef} id="circle-chart"></canvas>
    </div>
  );
};

export default CercleChart;
