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

const CompareChart = ({ chartData }) => {
  // Extract the years and data values
  const years = chartData.data.map(item => item.date);
  const values1 = chartData.data.map(item => parseFloat(item.value1.replace(/[^\d.]*/g, '')));
  const values2 = chartData.data.map(item => parseFloat(item.value2.replace(/[^\d.]*/g, '')));
  const label1 = chartData.data.map(item => item.label1);
  const label2 = chartData.data.map(item => item.label2);

  console.log('list of years' + years);
  console.log('list of values1' + values1);
  console.log('list of values2' + values2);
  console.log('list of label1' + label1);
  console.log('list of label2' + label2);

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
        label: label1[0],
        data: values1,
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        pointBackgroundColor: "#000",
        yAxisID: "y",
      },
      {
        label: label2[0],
        data: values2,
        borderColor: '#FF6384',
        backgroundColor: '#FFB1C1',
        pointBackgroundColor: "#000",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={lineGraphData} />;
};

export default CompareChart;
