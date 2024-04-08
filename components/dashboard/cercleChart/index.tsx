import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CercleChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current;
        if (!ctx) return; // Vérifiez si le ref est défini

        const newChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
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
                        text: 'My Circle Chart'
                    }
                }
            }
        });

        return () => {
            newChart.destroy(); // Détruire le graphique lors du démontage du composant
        };

    }, []);

    return (
        <canvas ref={chartRef} id="circle-chart"></canvas>
    )
}
export default CercleChart;

