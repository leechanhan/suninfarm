import React, { useEffect, useRef } from 'react';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

const LineChart = ({ data }) => {
	const chartRef = useRef(null);
	let chartInstance = null;

	useEffect(() => {
		const ctx = chartRef.current.getContext('2d');
		const createChart = () => {
			Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);
			chartInstance = new Chart(ctx, {
				type: 'line',
				data: data,
				options: {
					scales: {
						x: {
							display: true,
						},
						y: {
							beginAtZero: true,
							max: 100, // 최대값 설정
						},
					},
				},
			});
		};

		const destroyChart = () => {
			if (chartInstance) {
				chartInstance.destroy();
				chartInstance = null;
			}
		};

		const initializeChart = () => {
			destroyChart(); // 이전 차트 파괴
			createChart(); // 새로운 차트 생성
		};

		// 컴포넌트가 처음 렌더링될 때 차트 초기화
		initializeChart();

		// 컴포넌트가 unmount될 때 차트 파괴
		return () => {
			destroyChart();
		};
	}, []);

	return <canvas ref={chartRef} />;
};

export default LineChart;
