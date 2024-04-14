import React from 'react';
import Chart from 'chart.js/auto';
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchCarVouchers from "../../materiel_de_transport/bon_de_voiture/hooks/useFetchCarVoucher";
import { useRouter } from "next/router";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const CercleChart = () => {
    const { carVouchers } = useAppSelector((state) => state.carVoucher);
    const fetchCarVouchers = useFetchCarVouchers();
    const router = useRouter();

    let toutLst: { id: string, name: number }[] = [];

    React.useEffect(() => {
        fetchCarVouchers();
    }, [router.query]);

    const chartRef = React.useRef<HTMLCanvasElement | null>(null);

    const totalMontantByMonth: { [key: string]: number } = {};

    const monthsInLetters = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    React.useEffect(() => {
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
                        totalMontantByMonth[month] = (totalMontantByMonth[month] || 0) + montantTotal;
                    }
                }
            });

            const listMois: string[] = [];
            const listMontant: number[] = [];
            const colors = [
                'rgb(224, 224, 224)',
                '#CC9933',
                'rgb(154, 205, 50)',
                'blue',
                'orange'
            ];

            Object.keys(totalMontantByMonth).forEach(month => {
                listMois.push(month);
                listMontant.push(totalMontantByMonth[month]);
            });
            const newChart = new Chart(ctx!, {
                type: 'pie',
                data: {
                    labels: (listMois.length != 0) ? listMois : ["vide"],
                    datasets: [{
                        label: 'Montant total',
                        data: (listMontant.length != 0) ? listMontant : [0.5],
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Montant mensuel d\'entretien'
                        },
                        datalabels: {
                            display: true,
                            color: 'black',
                            formatter: (value, context) => {
                                return listMois[context.dataIndex]; // Utilisez le nom du mois comme étiquette de données
                            }
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    }
                }
            });

            return () => {
                newChart.destroy(); // Détruire le graphique lors du démontage du composant
            };
        }
    }, [carVouchers]);

    return (
        <canvas ref={chartRef} id="circle-chart" width="300" height="300"></canvas>
    )
}
export default CercleChart;

