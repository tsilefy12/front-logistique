// import { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const DemiCercleChart = () => {
//     useEffect(() => {
//         const ctx = document.getElementById('speedometerChart')!;
//         if (!ctx) {
//             return;
//         }
//         new Chart(ctx, {
//             type: 'radialGauge',
//             data: {
//                 labels: ['Low', 'Medium', 'High'],
//                 datasets: [{
//                     data: [20, 50, 80], // Données à afficher sur le graphique
//                     backgroundColor: ['#FFA07A', '#FF6347', '#FF4500'], // Couleurs de fond des zones
//                     borderWidth: 0,
//                     rotate: -90, // Rotation de l'aiguille (0 est en haut)
//                     min: 0, // Valeur minimale affichée sur l'axe
//                     max: 100, // Valeur maximale affichée sur l'axe
//                     stepSize: 20, // Incréments de l'échelle
//                     startAngle: 180, // Angle de départ du graphique (180 est à midi)
//                     ticks: { display: false }, // Désactiver l'affichage des graduations
//                     centerArea: { display: false }, // Désactiver l'affichage de la zone centrale
//                     height: 40,
//                     width: 200
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 layout: {
//                     padding: {
//                         top: 20,
//                         bottom: 20,
//                         left: 20,
//                         right: 20
//                     }
//                 },
//                 scale: {
//                     ticks: {
//                         fontSize: 12
//                     }
//                 },
//                 plugins: {
//                     legend: {
//                         display: false // Masquer la légende
//                     },
//                     title: {
//                         display: true,
//                         text: 'Speedometer Chart'
//                     }
//                 }
//             }
//         });
//     }, []);

//     return (
//         <canvas id="speedometerChart" height={20} width={40}></canvas>
//     );
// };

// export default DemiCercleChart;
