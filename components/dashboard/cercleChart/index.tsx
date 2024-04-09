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
                labels: ['Gray', 'Orange', 'Green'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgb(224, 224, 224)',
                        '#CC9933',
                        'rgb(154, 205, 50)',
                    ],
                    borderColor: [
                        'rgb(224, 224, 224)',
                        '#CC9933',
                        'rgb(154, 205, 50)',
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
        <canvas ref={chartRef} id="circle-chart" width="300" height="300"></canvas>
    )
}
export default CercleChart;

