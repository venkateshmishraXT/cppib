/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from 'react-dom/client';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import { Chart } from 'smart-webcomponents-react/chart';
import "./style.css";

export const LineChart = ({lineChartData}) => {
	const monthFormatter = new Intl.DateTimeFormat('en', {
		month: 'short'
	});

	const caption = 'Equity Indices';
	const description = '';
	const showLegend = true;
	const padding = {
		left: 10,
		top: 5,
		right: 10,
		bottom: 5
	};
	const titlePadding = {
		left: 50,
		top: 0,
		right: 0,
		bottom: 10
	};
	const dataSource = lineChartData;
	const colorScheme = 'scheme32';
	const xAxis = {
		dataField: 'Date',
		formatFunction: (value) => {
			return  monthFormatter.format(value);
		},
		type: 'date',
		baseUnit: 'month',
		valuesOnTicks: true,
		minValue: '01-01-2019',
		maxValue: '01-01-2020',
		tickMarks: {
			visible: true,
			unitInterval: 1,
			color: '#BCBCBC'
		},
		unitInterval: 1,
		gridLines: {
			visible: false,
			unitInterval: 3,
			color: '#BCBCBC'
		},
		labels: {
			angle: -45,
			rotationPoint: 'topright',
			offset: {
				x: -25,
				y: 0
			}
		}
	};
	const valueAxis = {
		visible: true,
		tickMarks: {
			color: '#BCBCBC'
		},
        gridLines: {
            visible: true,
            unitInterval: 3,
			color: '#BCBCBC'
        },
	};
	const seriesGroups = [{
		type: 'line',
		series: [{
			dataField: 'S&P 500',
			displayText: 'S&P 500'
		},
		{
			dataField: 'NASDAQ',
			displayText: 'NASDAQ'
		}
		]
	}];
    const borderLineColor = '#D4DAE5';
    const fillColor = '#D4DAE5';

		return (
			<div>
				<Chart id="chart"
					caption={caption}
					padding={padding}
					titlePadding={titlePadding}
					dataSource={dataSource}
					colorScheme={colorScheme}
					xAxis={xAxis}
					valueAxis={valueAxis}
					seriesGroups={seriesGroups}
                    borderLineColor={borderLineColor}
                    fillColor={fillColor}
                >
                </Chart>
			</div>
		);
}



export default LineChart;