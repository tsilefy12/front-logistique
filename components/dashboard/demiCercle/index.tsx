import React from 'react';
import Chart from 'chart.js/auto';

const DemiCercleChart = () => {
    const chartRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        const ctx = chartRef.current;
        if (!ctx) return;

        const newChart = new Chart(ctx, {
            type: 'doughnut',
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
                cutout: "50%", 
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'My Half Circle Chart'
                    }
                }
            }
        });

        return () => {
            newChart.destroy(); // Détruire le graphique lors du démontage du composant
        };

    }, []);

    return (
        <canvas ref={chartRef} id="circle-chart" width="295" height="290"></canvas> // Réduisez la hauteur du canevas à la moitié pour afficher un demi-cercle
    )
}

export default DemiCercleChart;
