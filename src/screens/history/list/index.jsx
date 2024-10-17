import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout메인헤더 from '@component/layout/Layout메인헤더';
import Menu from '@component/frame/headerBtn/Menu';
import Swal from 'sweetalert2';
import CustomAlert from '@lib/alert';
import { useState } from 'react';
import Header from '@component/frame/Header';
import CustomForms from '@component/etc/CustomForms';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import LineChart from '../lineChart';
const HistoryScreen = ({ farmName = '' }) => {
	const handlerTest = () => {
		Swal.fire({
			icon: 'warning',
			title: '안내',
			text: `서비스 준비중입니다.`,
			confirmButtonText: '확인',
		}).then((res) => {});
	};

	const [checkDevice, setCheckDevice] = useState(false);

	const [registedDevices, setRegistedDevices] = useState([
		{ devName: '1열 좌측', devSerial: '1324234F324234234D' },
		{ devName: '1열 우측', devSerial: '5524AA4F324234234D' },
		{ devName: '2열 좌측', devSerial: '4424F34F324234234D' },
		{ devName: '2열 우측', devSerial: '552D234F324234234D' },
		{ devName: '우측 개폐기', devSerial: '3424F34F324234234D' },
		{ devName: '좌측 개폐기', devSerial: '252D234F324234234D' },
	]);

	const [unRegistedDevices, setUnRegistedDevices] = useState([
		{ devName: '조명 장치', devSerial: 'A424F34F324234234D' },
		{ devName: '조명 장치', devSerial: 'AA2D234F324234234D' },
	]);
	const [chartData1, setChartData1] = useState({
		max: 40,
		labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
		datasets: [
			{
				label: 'Data 1',
				data: [14, 18, 17, 17, 16, 16, 16, 18, 18, 17, 17, 16],
				borderColor: '#FFD3EB',
				backgroundColor: '#60C6FF',
				pointRadius: 5, // 포인트 크기
				pointBackgroundColor: '#fff', // 포인트 배경색
				pointBorderColor: '#FFD3EB', // 포인트 테두리 색
				pointHoverRadius: 7, // 호버 시 포인트 크기
				pointHoverBackgroundColor: '#FFD3EB', // 호버 시 포인트 배경색
				pointHoverBorderColor: '#FFD3EB', // 호버 시 포인트 테두리 색
				fill: false, // 라인 그래프에서 영역 채우기 비활성화
			},
			{
				label: 'Data 2',
				data: [18, 15, 19, 20, 23, 20, 20, 23, 22, 19, 20, 23],
				borderColor: '#60C6FF',
				backgroundColor: '#60C6FF',
				pointRadius: 5, // 포인트 크기0
				pointBackgroundColor: '#fff', // 포인트 배경색
				pointBorderColor: '#60C6FF', // 포인트 테두리 색
				pointHoverRadius: 7, // 호버 시 포인트 크기
				pointHoverBackgroundColor: '#60C6FF', // 호버 시 포인트 배경색
				pointHoverBorderColor: 'rgba(255, 255, 255, 1)', // 호버 시 포인트 테두리 색
				fill: false, // 라인 그래프에서 영역 채우기 비활성화
			},
		],
	});

	const [chartData2, setChartData2] = useState({
		max: 40,
		labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
		datasets: [
			{
				label: 'Data 1',
				data: [21, 27, 25, 26, 29, 27, 25, 25, 24, 23, 23, 22],
				borderColor: '#FFD3EB',
				backgroundColor: '#60C6FF',
				pointRadius: 5, // 포인트 크기
				pointBackgroundColor: '#fff', // 포인트 배경색
				pointBorderColor: '#FFD3EB', // 포인트 테두리 색
				pointHoverRadius: 7, // 호버 시 포인트 크기
				pointHoverBackgroundColor: '#FFD3EB', // 호버 시 포인트 배경색
				pointHoverBorderColor: '#FFD3EB', // 호버 시 포인트 테두리 색
				fill: false, // 라인 그래프에서 영역 채우기 비활성화
			},
			{
				label: 'Data 2',
				data: [28, 29, 27, 28, 28, 26, 24, 27, 28, 29, 25, 20],
				borderColor: '#60C6FF',
				backgroundColor: '#60C6FF',
				pointRadius: 5, // 포인트 크기
				pointBackgroundColor: '#fff', // 포인트 배경색
				pointBorderColor: '#60C6FF', // 포인트 테두리 색
				pointHoverRadius: 7, // 호버 시 포인트 크기
				pointHoverBackgroundColor: '#60C6FF', // 호버 시 포인트 배경색
				pointHoverBorderColor: 'rgba(255, 255, 255, 1)', // 호버 시 포인트 테두리 색
				fill: false, // 라인 그래프에서 영역 채우기 비활성화
			},
		],
	});
	const [chartData3, setChartData3] = useState({
		max: 800,
		labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
		datasets: [
			{
				label: 'Data 1',
				data: [614, 709, 667, 711, 508, 684, 592, 494, 723, 627, 548, 722],
				borderColor: '#FFD3EB',
				backgroundColor: '#60C6FF',
				pointRadius: 5, // 포인트 크기
				pointBackgroundColor: '#fff', // 포인트 배경색
				pointBorderColor: '#FFD3EB', // 포인트 테두리 색
				pointHoverRadius: 7, // 호버 시 포인트 크기
				pointHoverBackgroundColor: '#FFD3EB', // 호버 시 포인트 배경색
				pointHoverBorderColor: '#FFD3EB', // 호버 시 포인트 테두리 색
				fill: false, // 라인 그래프에서 영역 채우기 비활성화
			},
			{
				label: 'Data 2',
				data: [566, 545, 647, 592, 622, 546, 708, 514, 739, 661, 691, 473],
				borderColor: '#60C6FF',
				backgroundColor: '#60C6FF',
				pointRadius: 5, // 포인트 크기
				pointBackgroundColor: '#fff', // 포인트 배경색
				pointBorderColor: '#60C6FF', // 포인트 테두리 색
				pointHoverRadius: 7, // 호버 시 포인트 크기
				pointHoverBackgroundColor: '#60C6FF', // 호버 시 포인트 배경색
				pointHoverBorderColor: 'rgba(255, 255, 255, 1)', // 호버 시 포인트 테두리 색
				fill: false, // 라인 그래프에서 영역 채우기 비활성화
			},
		],
	});
	return (
		<div className="content_wrapper">
			<div className="page_container_gray">
				<Header
					classes="nonPadding bg_gray"
					title={farmName}
					LeftButton={() => <Button뒤로가기 />}
				/>
				<div className="history_info_wrap">
					<div className="history_title_wrap">
						<span>온도</span>
						<span>실내 14º</span>
						<span>실외 22º</span>
					</div>
					<div className="history_chart_wrap">
						<LineChart data={chartData1} />
					</div>
				</div>
				<div className="history_info_wrap">
					<div className="history_title_wrap">
						<span>습도</span>
						<span>실내 28%</span>
						<span>실외 30%</span>
					</div>
					<div className="history_chart_wrap">
						<LineChart data={chartData2} />
					</div>
				</div>
				<div className="history_info_wrap">
					<div className="history_title_wrap">
						<span>CO2</span>
						<span>실내 12</span>
						<span>실외 20</span>
					</div>
					<div className="history_chart_wrap">
						<LineChart data={chartData3} />
					</div>
				</div>
			</div>
		</div>
	);
};

HistoryScreen.Layout = Layout메인헤더;
HistoryScreen.isGnb = true;
HistoryScreen.pageName = '기록';
export default HistoryScreen;
