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
    function generateRandomHexColor() {
        // Fonction pour générer une valeur hexadécimale aléatoire à deux chiffres
        function getRandomHex() {
            // Générer un nombre entier aléatoire entre 0 et 255
            const randomInt = Math.floor(Math.random() * 256);
            // Convertir ce nombre en une chaîne hexadécimale à deux chiffres
            const hexString = randomInt.toString(16);
            // Si la chaîne est d'un seul chiffre, ajouter un zéro devant
            return hexString.padStart(2, '0');
        }
    
        // Générer les composantes rouge, verte et bleue de la couleur
        const red = getRandomHex();
        const green = getRandomHex();
        const blue = getRandomHex();
    
        // Combiner les composantes pour former le code couleur hexadécimal
        const hexColor = `#${red}${green}${blue}`;
        return hexColor;
    }
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
            const now = new Date().getFullYear()
            Object.keys(totalMontantByMonth).forEach(month => {
                listMois.push(month);
                listMontant.push(totalMontantByMonth[month]);
            });
            const newChart = new Chart(ctx!, {
                type: 'pie',
                data: {
                    labels: (listMois.length != 0) ? listMois : ["vide"],
                    datasets: [{
                        label: 'Montant total (en Ariary)',
                        data: (listMontant.length != 0) ? listMontant : [0.5],
                        backgroundColor: listMois.map(m=> generateRandomHexColor()),
                        // borderColor: listMois.map(m=>generateRandomHexColor()),
                        borderWidth: 0
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
                            text: `Montant mensuel d\'entretien, année ${now}`
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

