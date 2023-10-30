/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from 'react-dom/client';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import { Chart } from 'smart-webcomponents-react/chart';
import "./style.css";

export const PieChart = ({pieChartData}) => {
	const monthFormatter = new Intl.DateTimeFormat('en', {
		month: 'short'
	});

	const caption = '';
	const description = '';
	const showLegend = true;
	const showBorderLine = true;
	const legendLayout = {
		left: 50,
		top: 370,
		width: 300,
		height: 200,
	};
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
	const dataSource = pieChartData;
	const colorScheme = 'scheme32';
	const seriesGroups = [{
		type: 'donut',
		offsetX: 140,
		offsetY: 150,
		dataSource: pieChartData,
		series: [{
			dataField: 'Share',
			displayText: 'Browser',
			labelRadius: 120,
			initialAngle: 10,
			radius: 130,
			innerRadius: 90,
			centerOffset: 0,
			formatSettings: {
				sufix: '%',
				decimalPlaces: 1
			}
		}]
	}];
    const borderLineColor = '#D4DAE5';
    const fillColor = '#D4DAE5';

	return (
		<div>
			<Chart id="chart"
				caption={caption}
				description={description}
				showLegend={showLegend}
				showBorderLine={showBorderLine}
				legendLayout={legendLayout}
				padding={padding}
				titlePadding={titlePadding}
				colorScheme={colorScheme}
				seriesGroups={seriesGroups}></Chart>
		</div>
	);
}

export default PieChart;