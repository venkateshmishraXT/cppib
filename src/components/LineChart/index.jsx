/* eslint-disable react/prop-types */
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

const LineChart = ({ lineChartData }) => {
  // Extract the years and data values
  const value1 = 'S&P 500';
  const value2 = 'NASDAQ';

  const years = lineChartData.map(item => item.Date);
  const values1 = lineChartData.map(item => parseFloat(item[value1].replace(/[^\d.]*/g, '')));
  const values2 = lineChartData.map(item => parseFloat(item[value2].replace(/[^\d.]*/g, '')));

  const options = {
    responsive: true,
	maintainAspectRatio: false,
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
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 15
        }
      },
      tooltip: {
        enabled: true,
      },
    },
	scales: {
		x: {
			display: true,
			title: {
			display: false,
			text: "Year"
			}
		},
		y: {
			display: true,
			suggestedMin: 0,
			suggestedMax: 5500,
			title: {
			display: false,
			text: "Stocks"
			},
			ticks: {
				stepSize: 1000,
			},
		},
    }
  };

  const lineGraphData = {
    labels: years,
    datasets: [
      {
        label: value1,
        data: values1,
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        pointBackgroundColor: "#000",
        yAxisID: "y",
      },
      {
        label: value2,
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

export default LineChart;
