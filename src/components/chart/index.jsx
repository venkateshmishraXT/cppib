import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LinearChart = ({ chartData }) => {
  // Extract the years and data values
  const years = chartData.data.map(item => item.date);
  const values = chartData.data.map(item => parseFloat(item.value.replace(/[^\d.]*/g, '')));

  console.log('list of years' + years);
  console.log('list of values' + values);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
        text: "",
      },
      legend: {
        display: false,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: chartData.axisinfo.xaxis
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: chartData.axisinfo.yaxis
          }
        },
    }
  };

  const lineGraphData = {
    labels: years,
    datasets: [
      {
        label: "value",
        data: values,
        borderColor: "#BCBCBC",
        pointBorderColor: "#BCBCBC",
        pointBackgroundColor: "#000",
        backgroundColor: "#000",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={lineGraphData} />;
};

export default LinearChart;