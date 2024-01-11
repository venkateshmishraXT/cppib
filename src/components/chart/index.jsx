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

  let keysData = []
  for (const key in chartData.data[0]) {
  keysData.push(key);
  }
  const dataField= keysData[1];
  const dateText = keysData[0];

  // Extract the years and data values
  const years = chartData.data.map(item => item[dateText]);
  const values = chartData.data.map(item => item[dataField]);
  //const values = chartData.data.map(item => parseFloat((item[dataField]).replace(/[^\d.]*/g, '')));

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
            text: chartData.axisinfo? chartData.axisinfo.xaxis : dateText,
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: chartData.axisinfo? chartData.axisinfo.yaxis : dataField,
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
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        pointBackgroundColor: "#000",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={lineGraphData} />;
};

export default LinearChart;
