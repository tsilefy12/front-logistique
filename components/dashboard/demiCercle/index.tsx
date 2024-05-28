import React from "react";
import Chart from "chart.js/auto";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchTransportationEquipments from "../../materiel_de_transport/hooks/useFetchTransportationEquipments";

const DemiCercleChart = () => {
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const fetchTransportEquipments = useFetchTransportationEquipments();
  const chartRef = React.useRef<HTMLCanvasElement | null>(null);
  React.useEffect(() => {
    fetchTransportEquipments();
  }, []);
  function generateRandomHexColor() {
    function getRandomHex() {
      const randomInt = Math.floor(Math.random() * 256);
      const hexString = randomInt.toString(16);
      return hexString.padStart(2, "0");
    }
    const red = getRandomHex();
    const green = getRandomHex();
    const blue = getRandomHex();

    const hexColor = `#${red}${green}${blue}`;
    return hexColor;
  }
  React.useEffect(() => {
    const ctx = chartRef.current;
    if (!ctx) return;

    const listMateriel: string[] = [];
    const listResteCarburant: number[] = [];
    transportationEquipments.forEach((element) => {
      if (
        element.reste != 0 &&
        element.kilometrageActuel !== element.kilometrageInitial
      ) {
        listMateriel.push(element.registration!);
        listResteCarburant.push(element.reste!);
      }
    });
    const newChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: listMateriel.length != 0 ? listMateriel : ["vide"],
        datasets: [
          {
            label: "Reste",
            data: listResteCarburant.length != 0 ? listResteCarburant : [0],
            backgroundColor: listResteCarburant.map((l) =>
              generateRandomHexColor()
            ),
            // borderColor: [],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "50%",
        plugins: {
          legend: {
            position: "top",
          },
          // title: {
          //     display: true,
          //     text: 'My Half Circle Chart'
          // }
        },
      },
    });

    return () => {
      newChart.destroy(); // Détruire le graphique lors du démontage du composant
    };
  }, [transportationEquipments]);

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <canvas ref={chartRef} id="circle-chart"></canvas>
    </div>
  );
};

export default DemiCercleChart;
