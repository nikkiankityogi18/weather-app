import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { formatDateTime } from "../utils/dateFormat";

const ForcastChart = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const apiKey = "4817d95667154e2b474184f60dbbec68";
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);
        setForecastData(response.data.list);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [city]);

  useEffect(() => {
    if (forecastData.length > 0) {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("weatherChart").getContext("2d");
      const showData = forecastData.filter((data, index) => index % 8 === 0);

      const labels = showData.map((data) => formatDateTime(data.dt_txt));
      const temperatures = showData.map((data) => data.main.temp);

      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: temperatures,
              borderColor: "#3b82f6 ",
              tension: 0.1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  var label = context.dataset.label || "";

                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y.toFixed(2) + " °C";
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                callback: (value, index, values) => {
                  let label = labels[value];
                  if (label == null) {
                    return "";
                  }
                  let breakLabel = label.split("\n");
                  return breakLabel;
                },
              },
            },
            y: {
              beginAtZero: false,
              grid: {
                display: false,
              },
            },
          },
        },
      });

      chartRef.current = chart;
    }
  }, [forecastData]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="mt-4 font-semibold text-xl m-auto">
        5-Day Weather Forecast for {city}
      </h2>
      <canvas id="weatherChart"></canvas>
    </div>
  );
};

export default ForcastChart;
