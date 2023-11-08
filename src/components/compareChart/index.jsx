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
  console.log('CompareChart-----' + chartData);
  const chartDataList = chartData.data;
  console.log('CompareChart data -----' + chartDataList);
  const years = chartDataList.map(item => item.date);
  const values1 = chartDataList.map(item => parseFloat(item.value1.replace(/[^\d.]*/g, '')));
  const values2 = chartDataList.map(item => parseFloat(item.value2.replace(/[^\d.]*/g, '')));

  console.log('list of years' + years);
  console.log('list of values1' + values1);
  console.log('list of values2' + values2);

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
        data: values1,
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        pointBackgroundColor: "#000",
        yAxisID: "y",
      },
      {
        label: "value",
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
