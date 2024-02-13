import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout서브헤더영역 from '@component/layout/Layout서브헤더영역';
import Menu from '@component/frame/headerBtn/Menu';
import Swal from 'sweetalert2';
import CustomAlert from '@lib/alert';
import { useState } from 'react';
const DeviceSetting = () => {
	const handlerTest = () => {
		Swal.fire({
			icon: 'warning',
			title: '안내',
			text: `서비스 준비중입니다.`,
			confirmButtonText: '확인',
		}).then((res) => {});
	};
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

	const handlerDeleteDevice = (name) => {
		CustomAlert.warning({ html: `${name}을 삭제하시겠습니까?`, callback: () => {} });
	};
	const handlerRegisterDevice = (name) => {
		CustomAlert.info({ html: `${name}을 등록하시겠습니까?`, callback: () => {} });
	};
	return (
		<div className="content_wrapper">
			<div className="page_content">
				<h3 className="device_list_title">등록 디바이스</h3>
				<ul className="device_wrap">
					{registedDevices.map((item, index) => {
						return (
							<li
								className="device_list_wrap"
								key={index}
							>
								<span className="device_name">{item.devName}</span>
								<span className="device_serial">{item.devSerial}</span>
								<span onClick={() => handlerDeleteDevice(item.devName)}>
									<img
										className="icon"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_delete.png`}
									/>{' '}
								</span>
							</li>
						);
					})}
				</ul>
				<h3 className="device_list_title">미등록 디바이스</h3>
				<ul>
					{unRegistedDevices.map((item, index) => {
						return (
							<li
								className="device_list_wrap"
								key={index}
							>
								<span className="device_name">{item.devName}</span>
								<span className="device_serial">{item.devSerial}</span>
								<span onClick={() => handlerRegisterDevice(item.devName)}>
									<img
										className="icon"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_checked.png`}
									/>{' '}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

DeviceSetting.Layout = Layout서브헤더영역;
DeviceSetting.headerOptions = {
	subtitle: '장치 관리',
	LeftButton: () => <Menu />,
};
DeviceSetting.isGnb = true;
DeviceSetting.subtitle = true;

export default DeviceSetting;
