import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout서브헤더영역 from '@component/layout/Layout서브헤더영역';
import Menu from '@component/frame/headerBtn/Menu';
import { useState } from 'react';
const AlarmScreen = () => {
	const [alarmList, setAlarmList] = useState([
		{ alarmType: '조도', value: '500 ~ 1000', unit: 'lux', swichOn: true },
		{ alarmType: '온도', value: '20 ~ 40', unit: "'C", swichOn: true },
		{ alarmType: '습도', value: '50 ~ 80', unit: '%', swichOn: true },
		{ alarmType: 'CO₂', value: '100 ~ 700', unit: 'ppm', swichOn: true },
		{ alarmType: 'PAR', value: '10 ~ 20', unit: 'umol', swichOn: false },
	]);

	const [unRegistedDevices, setUnRegistedDevices] = useState([
		{ devName: '조명 장치', devSerial: 'A424F34F324234234D' },
		{ devName: '조명 장치', devSerial: 'AA2D234F324234234D' },
	]);

	const alarmTypeMap = {
		조도: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_illum.png`,
		온도: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_temper.png`,
		습도: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_moisture.png`,
		'CO₂': `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_co2.png`,
		PAR: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_par.png`,
	};
	return (
		<div className="content_wrapper">
			<div className="page_content">
				<ui className="">
					{alarmList.map((item, index) => {
						return (
							<li
								className="alarm_item_wrap"
								key={index}
							>
								<img
									className="alarm_icon"
									src={alarmTypeMap[item.alarmType]}
								/>
								{/* <span className='alarm_value'>{item.alarmType}</span>  */}
								<div className="alarm_textbox_wrap">
									<span className="alarm_value">{item.value}</span>
									<span className="alarm_unit">{item.unit}</span>
									<img
										className="alarm_switch"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_horiz_checkbox_on.png`}
									/>
								</div>
							</li>
						);
					})}
				</ui>
			</div>
		</div>
	);
};

AlarmScreen.Layout = Layout서브헤더영역;
AlarmScreen.headerOptions = {
	subtitle: '알림 설정',
	LeftButton: () => <Menu />,
};
AlarmScreen.isGnb = true;
AlarmScreen.pageName = '알림';
AlarmScreen.subtitle = true;

export default AlarmScreen;
