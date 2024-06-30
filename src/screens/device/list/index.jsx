import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout메인헤더 from '@component/layout/Layout메인헤더';
import Menu from '@component/frame/headerBtn/Menu';
import Swal from 'sweetalert2';
import CustomAlert from '@lib/alert';
import { useState } from 'react';
import Header from '@component/frame/Header';
import CustomForms from '@component/etc/CustomForms';
const DeviceListScreen = ({ farmName = '딸기농장' }) => {
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
				<div className="device_info_wrap">
					<div className="device_title">등록 디바이스</div>
					<ul className="device_list_wrap">
						{registedDevices.map((item, index) => {
							return (
								<li
									className="device_item"
									key={index}
								>
									<span className="device_name">{item.devName}</span>
									<span className="device_serial">{item.devSerial}</span>
									<CustomForms.Form체크박스
										id="agreeService"
										onChange={setCheckDevice}
										value={!checkDevice}
									/>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="device_info_wrap">
					<div className="device_title">등록 디바이스</div>
					<ul className="device_list_wrap">
						{unRegistedDevices.map((item, index) => {
							return (
								<li
									className="device_item"
									key={index}
								>
									<span className="device_name">{item.devName}</span>
									<span className="device_serial">{item.devSerial}</span>
									<CustomForms.Form체크박스
										id="agreeService"
										onChange={setCheckDevice}
										value={!checkDevice}
									/>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

DeviceListScreen.Layout = Layout메인헤더;
DeviceListScreen.isGnb = true;
export default DeviceListScreen;
