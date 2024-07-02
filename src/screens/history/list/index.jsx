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
const HistoryScreen = ({ farmName = '딸기농장' }) => {
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
	const [chartData, setChartData] = useState({
		labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'],
		datasets: [
			{
				label: 'Data 1',
				data: [0, 20, 30, 40, 50, 60, 0, 20, 30, 40, 50, 60],
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
				data: [0, 40, 20, 40, 50, 20, 54, 50, 20, 60, 90, 70],
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

	const handlerDeleteDevice = (name) => {
		CustomAlert.warning({ html: `${name}을 삭제하시겠습니까?`, callback: () => {} });
	};
	const handlerRegisterDevice = (name) => {
		CustomAlert.info({ html: `${name}을 등록하시겠습니까?`, callback: () => {} });
	};

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
						<span>실내 18º</span>
						<span>실외 23º</span>
					</div>
					<div className="history_chart_wrap">
						<LineChart data={chartData} />
					</div>
				</div>
				<div className="history_info_wrap">
					<div className="history_title_wrap">
						<span>습도</span>
						<span>실내 70%</span>
						<span>실외 40%</span>
					</div>
					<div className="history_chart_wrap">
						<LineChart data={chartData} />
					</div>
				</div>
				<div className="history_info_wrap">
					<div className="history_title_wrap">
						<span>CO2</span>
						<span>실내 70%</span>
						<span>실외 40%</span>
					</div>
					<div className="history_chart_wrap">
						<LineChart data={chartData} />
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
