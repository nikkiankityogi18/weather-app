import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { citiesData } from "../constents";
const StateLineChart = ({ stateCode }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  //   const [cityDataArr, setCityDataArr] = useState([]);
  //   const [temperatures, setTemeratures] = useState([]);
  //   const [cityNames, setCityNames] = useState([]);

  const citiesDataArr = citiesData.filter((ele) => ele.stateCode === stateCode);

  const temperatures = citiesDataArr.map((ele) => ele.temperature);
  const cityNames = citiesDataArr.map((ele) => ele.cityName);
  useEffect(() => {
    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: cityNames,
        datasets: [
          {
            label: "Temperature",
            data: temperatures,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: "Temperature (°C)",
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [temperatures, cityNames]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h2 className="font-bold text-xl text-center my-4">
        Temperature of Cities
      </h2>
      <canvas ref={chartContainer} />;
    </div>
  );
};
export default StateLineChart;
