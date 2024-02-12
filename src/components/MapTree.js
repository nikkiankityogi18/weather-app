import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { generateTemperatureColor } from "../utils/colorPicker";
import StateBarChart from "./StateBarChart";
import StateLineChart from "./StateLineChart";
import { statePopulationData } from "../constents";

const MapTree = () => {
  const [stateCode, setStateCode] = useState("");
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      Chart.register(TreemapController, TreemapElement);

      const ctx = chartContainer.current.getContext("2d");
      let populationData = statePopulationData.map((e) => e.population);
      let labels = statePopulationData.map((e) => e.name);
      let temperature = statePopulationData.map((e) => e.temperature);
      let code = statePopulationData.map((e) => e.code);
      let maxTemp = Math.max(...temperature);
      let minTemp = Math.min(...temperature);

      chartInstance.current = new Chart(ctx, {
        type: "treemap",
        data: {
          datasets: [
            {
              tree: populationData,
              backgroundColor: (ctx) =>
                generateTemperatureColor(
                  temperature[ctx.dataIndex],
                  minTemp,
                  maxTemp
                ),

              labels: {
                display: true,
                formatter: function (value) {
                  let label = labels[value.dataIndex];
                  return label;
                },
                color: ["white", "whiteSmoke"],
                font: [{ size: 20, weight: "bold" }, { size: 12 }],
                overflow: "fit",
              },
            },
          ],
        },
        options: {
          aspectRatio: 1,
          onClick: (event, elements) => {
            if (elements.length > 0) {
              let stCode = code[elements[0].index];
              getStateCode(stCode);
            }
          },
          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = labels[context.dataIndex];
                  const value = populationData[context.dataIndex];
                  const temp = temperature[context.dataIndex];

                  return `${label}: ${value}  Temprature:${temp} °C`;
                },
              },
            },
          },
          datalabels: {
            formatter: (value, context) => {
              const label = context.dataset.data[context.dataIndex].label;
              return label;
            },
          },
          font: {
            size: 12,
          },
        },
      });
      function getStateCode(code) {
        setStateCode(code);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [statePopulationData]);

  return (
    <div className="flex flex-col">
      <div>
        <canvas ref={chartContainer} />
      </div>
      <div className="flex lg:flex-row flex-col">
        <div className="flex lg:w-1/2 justify-center">
          {stateCode && <StateBarChart stateCode={stateCode} />}
        </div>
        <div className="flex lg:w-1/2 w-full">
          {stateCode && <StateLineChart stateCode={stateCode} />}
        </div>
      </div>
    </div>
  );
};

export default MapTree;
