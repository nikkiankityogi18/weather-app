import { citiesData } from "../constents";
import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

const StateBarChart = ({ stateCode }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const citiesDataArr = citiesData.filter(
    (city) => city.stateCode === stateCode
  );

  const populations = citiesDataArr.map((city) => city.population);
  const temperature = citiesDataArr.map((city) => city.temperature);
  const cityNames = citiesDataArr.map((city) => city.cityName);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartContainer.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: cityNames,
        datasets: [
          {
            label: "Population",
            data: populations,
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [citiesDataArr, populations, cityNames]);

  return (
    <div className="">
      <h2 className="font-bold text-xl text-center my-4">
        Population of Cities
      </h2>
      <canvas ref={chartContainer} />
    </div>
  );
};
export default StateBarChart;
