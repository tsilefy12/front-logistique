/*import { useEffect, useRef } from 'react';
import Chart, { ChartOptions } from 'chart.js/auto';

const HalfCircleChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;

        const halfChartOptions: ChartOptions<'pie'> = {
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
                type: 'pie', // Ajout de la propriété 'type'
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Half Circle Chart'
                    }
                },
                elements: {
                    arc: {
                        angle: Math.PI // Définit l'angle du demi-cercle
                    }
                }
            }
        };
        
        const halfChart = new Chart(ctx, halfChartOptions);

        return () => {
            halfChart.destroy();
        };
    }, []);

    return <canvas ref={chartRef} id="half-circle-chart" width="400" height="200"></canvas>;
}

export default HalfCircleChart;*/
