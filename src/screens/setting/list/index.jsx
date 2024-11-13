import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout메인헤더 from '@component/layout/Layout메인헤더';
import Menu from '@component/frame/headerBtn/Menu';
import Swal from 'sweetalert2';
import Button팝업종료 from '@component/frame/headerBtn/Button팝업종료';
import CustomAlert from '@lib/alert';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@component/frame/Header';

import GatewayService from '@service/GtwayService';
import CookieUtils from '@lib/utils/cookie';
import StringUtils from '@lib/utils/string';
import AddAlarm from '@component/popup/AddAlarm';

const SettingScreen = ({ farmName = '' }) => {
	const router = useRouter();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [gtwId, setGtwId] = useState();
	const [isEditMode, setIsEditMode] = useState({ isEdit: false, alarmNo: null });

	const [farmDetailInfo, setFarmDetailInfo] = useState({});
	const [alarmList, setAlarmList] = useState(null);

	const [time, setTime] = useState('07:00');
	const [timer, setTimer] = useState('00:01');
	const [selectedDays, setSelectedDays] = useState([false, false, false, false, false, false, false]);

	// 요일 배열 (월, 화, 수, 목, 금, 토, 일 순서)
	const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

	// alm_week 값을 바탕으로 요일 문자열을 생성하는 함수
	const getWeekString = (alm_week) => {
		return alm_week
			.split('') // 문자열을 배열로 변환
			.map((day, index) => (day === '1' ? weekDays[index] : null)) // '1'이면 해당 요일 추가
			.filter(Boolean) // null 값 제거
			.join(', '); // 요일들을 ', '로 구분하여 문자열로 만듦
	};

	// 초(:00) 제거하는 함수
	const formatTime = (time) => {
		return time.slice(0, 5); // 시, 분까지만 가져옴
	};
	const getAlarmList = async () => {
		GatewayService.getAlarmList({ ieee: 'B43A31FFFEFF7E21' })
			.then((res) => {
				console.log('geteway getAlarmList', res.alm_list);
				setAlarmList(res.alm_list.alm_item);
			})
			.catch((err) => {
				console.log('geteway getAlarmList err', err);
			});
	};
	useEffect(() => {
		const gtw_id = CookieUtils.getCookie('gtw_id');
		if (gtw_id?.length > 0) {
			setGtwId(gtw_id);
			GatewayService.getGatewayDetail({ gtw_id })
				.then((res) => {
					console.log('geteway home', res);
					setFarmDetailInfo(res);
				})
				.catch((err) => {
					console.log('geteway home err', err);
				});
			getAlarmList();
		}
	}, [gtwId]);

	const handleToggle = async (alm_no) => {
		const alarmIndex = alarmList.findIndex((alarm) => alarm.alm_no === alm_no);

		if (alarmIndex === -1) {
			console.error('해당 알람을 찾을 수 없습니다.');
			return;
		}

		// 선택된 알람 가져오기
		const alarm = alarmList[alarmIndex];

		// alm_enable 값을 토글하고 새로운 객체 생성
		const updatedAlarm = {
			...alarm,
			alm_enable: alarm.alm_enable === '1' ? '0' : '1',
		};
		console.log('alarm old', alarm);
		console.log('alarm new', updatedAlarm);
		// alarmList 상태 업데이트
		const updatedAlarmList = [...alarmList];
		updatedAlarmList[alarmIndex] = updatedAlarm;
		setAlarmList(updatedAlarmList); // 상태 업데이트

		updateAlarmStatus(updatedAlarm); // 변경된 상태를 서버로 전송
	};

	// 변경된 알람 상태를 서버에 전송하는 함수
	const updateAlarmStatus = async (alarm) => {
		const data = { ...{ alm_ieee: 'B43A31FFFEFF7E21' }, ...alarm };
		data.alm_time = formatTime(data.alm_time).replace(':', '');
		console.log('alarm modify', data);
		GatewayService.modifyAlarm(data)
			.then((res) => {
				console.log('geteway updateAlarmStatus', res);
			})
			.catch((err) => {
				console.log('geteway updateAlarmStatus err', err);
			});
	};

	function convertToSeconds(min, sec) {
		const minutesInSeconds = parseInt(min, 10) * 60; // 1분 = 60초
		const seconds = parseInt(sec, 10); // 초는 그대로
		const totalSeconds = minutesInSeconds + seconds;

		return totalSeconds;
	}

	function convertToHoursAndMinutes(totalSeconds) {
		// 총 초에서 분 값을 계산 (0~59 분 사이로 설정)
		const minutes = Math.floor(totalSeconds / 60);
		const validMinutes = Math.min(Math.max(minutes, 0), 59); // 분은 0~59 사이로 제한

		// 남은 초 계산 (0~59 초 사이로 설정)
		const remainingSeconds = totalSeconds - validMinutes * 60;
		const validSeconds = Math.min(Math.max(remainingSeconds, 0), 59); // 초는 0~59 사이로 제한

		// 수정된 객체 구조
		const date = {
			minute: validMinutes.toString().padStart(2, '0'), // 분 값을 minute로 저장
			sec: validSeconds.toString().padStart(2, '0'), // 초 값을 sec로 저장
		};

		console.log('time:', date);
		return date;
	}

	function convertToHoursAndMinutesText(totalSeconds) {
		// 총 초에서 분 값을 계산 (0~59 분 사이로 설정)
		const minutes = Math.floor(totalSeconds / 60);
		const validMinutes = Math.min(Math.max(minutes, 0), 59); // 분은 0~59 사이로 제한

		// 남은 초 계산 (0~59 초 사이로 설정)
		const remainingSeconds = totalSeconds - validMinutes * 60;
		const validSeconds = Math.min(Math.max(remainingSeconds, 0), 59); // 초는 0~59 사이로 제한

		// 수정된 객체 구조
		const date = {
			minute: validMinutes.toString().padStart(2, '0'), // 분 값을 minute로 저장
			sec: validSeconds.toString().padStart(2, '0'), // 초 값을 sec로 저장
		};

		return '타이머 시간 : ' + date.minute + ' 분 ' + date.sec + '초';
	}

	function boolArrayToBinaryString(boolArray) {
		return boolArray.map((value) => (value ? '1' : '0')).join('');
	}

	function binaryStringToBoolArray(binaryString) {
		return binaryString.split('').map((char) => char === '1');
	}

	const onAddAlarm = () => {
		setIsEditMode({ isEdit: false, alm_no: null });
		reset();
		setIsPopupOpen(true);
	};

	const onClosePopup = () => {
		setIsPopupOpen(false);
	};

	const onDelete = (alm_no, time) => {
		CustomAlert.info({
			html: formatTime(time) + ' 알람을 삭제하시겠습니까?.',
			callback: () => {
				GatewayService.deleteAlarm({ alm_no: alm_no })
					.then((res) => {
						getAlarmList();
						console.log('geteway deleteAlarm', res);
					})
					.catch((err) => {
						console.log('geteway deleteAlarm err', err);
					});
			},
		});
	};

	function allFalse(arr) {
		return arr.every((value) => value === false);
	}

	const onModify = (alm_no) => {
		const alarmIndex = alarmList.findIndex((alarm) => alarm.alm_no === alm_no);

		if (alarmIndex === -1) {
			console.error('해당 알람을 찾을 수 없습니다.');
			return;
		}

		// 선택된 알람 가져오기
		const alarm = alarmList[alarmIndex];

		// set time
		setTime(formatTime(alarm.alm_time));
		// set timer

		setTimer(convertToHoursAndMinutes(alarm.alm_val1));
		// set week
		setSelectedDays(binaryStringToBoolArray(alarm.alm_week));
		setIsEditMode({ isEdit: true, alm_no: alm_no });
		setIsPopupOpen(true);
	};

	const reset = () => {
		// set time
		setTime('12:00');

		setTimer({ minute: '00', sec: '01' });
		// set week
		setSelectedDays([false, false, false, false, false, false, false]);
		setIsPopupOpen(true);
	};

	const onEdit = () => {};

	const onSave = () => {
		const totalSeconds = convertToSeconds(timer.minute, timer.sec);
		if (totalSeconds === 0) {
			CustomAlert.info({ html: '양액공급 타이머 시간은 최소 1초입니다.', callback: () => {} });
			return;
		}

		if (allFalse(selectedDays)) {
			CustomAlert.info({ html: '요일을 선택해주세요.', callback: () => {} });
			return;
		}

		if (totalSeconds) {
			onClosePopup();
		}
		console.log(time);
		console.log(timer.minute);
		console.log(timer.sec);
		console.log(selectedDays);

		const binaryString = boolArrayToBinaryString(selectedDays);

		if (isEditMode.isEdit) {
			const data = {
				alm_gtwid: gtwId,
				alm_ieee: 'B43A31FFFEFF7E21',
				alm_no: isEditMode.alm_no,
				alm_time: time.replace(':', ''),
				alm_week: binaryString,
				alm_val1: totalSeconds,
			};
			GatewayService.modifyAlarm(data)
				.then((res) => {
					CustomAlert.info({ html: '알람정보가 수정 되었습니다.', callback: () => {} });
					getAlarmList();
				})
				.catch((err) => {
					console.log('geteway addAlarm err', err);
				});
		} else {
			const data = { alm_gtwid: gtwId, alm_ieee: 'B43A31FFFEFF7E21', alm_time: time.replace(':', ''), alm_week: binaryString, alm_val1: totalSeconds };
			GatewayService.addAlarm(data)
				.then((res) => {
					CustomAlert.info({ html: '알람이 추가되었습니다.', callback: () => {} });
					getAlarmList();
				})
				.catch((err) => {
					console.log('geteway addAlarm err', err);
				});
		}
	};

	return (
		<div className="content_wrapper">
			<div className="page_container_gray">
				<Header
					classes="nonPadding bg_gray"
					title={farmDetailInfo.gtw_name}
					LeftButton={() => <Button뒤로가기 />}
				/>
				<div className="setting_info_wrap">
					<div></div>
					<div className="setting_tab_indicator_wrap">
						<span className="active">양액공급</span>
						<span>냉난방</span>
						<span>유동팬</span>
					</div>

					<div className="setting_tab_wrap">
						<div
							className="setting_title_wrap"
							onClick={onAddAlarm}
						>
							<span className="setting_title">양액 공급 시간</span>
							<img
								className="setting_plus"
								src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_plus.png`}
							/>
						</div>
						<div className="schedule">
							{alarmList &&
								alarmList.map((alarm, index) => (
									<div
										key={alarm.alm_no}
										className="schedule-item"
									>
										<img
											onClick={(e) => onDelete(alarm.alm_no, alarm.alm_time)}
											className="delete-overlay"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_delete_red.png`}
										/>
										<div className="schedule-item-row">
											{/* 알람 시간 표시 (초 제거) */}
											<div className="time">{formatTime(alarm.alm_time)}</div>

											{/* 선택된 요일 표시 */}
											<div className="days">{getWeekString(alarm.alm_week)}</div>

											{/* 스위치 (알람 활성화 여부) */}
											<label className="switch">
												<input
													type="checkbox"
													checked={alarm.alm_enable === '1'} // 알람 활성화 여부
													onChange={() => {
														handleToggle(alarm.alm_no);
													}} // 상태 변경 핸들러
												/>
												<span className="slider"></span>
											</label>
											<span
												className="checkbox-overlay"
												onClick={(e) => {
													e.stopPropagation(); // 부모 이벤트 전파 중지
													onModify(alarm.alm_no); // 상태 변경 핸들러 호출
												}}
											></span>
										</div>
										<div className="schedule-item-row">
											<div className="days">{convertToHoursAndMinutesText(alarm.alm_val1)}</div>
										</div>
									</div>
								))}

							<AddAlarm
								isOpen={isPopupOpen}
								onClose={() => <Button팝업종료 popupClose={onClosePopup} />}
								onSave={onSave}
								isEdit={isEditMode}
								time={time}
								setTime={setTime}
								title={'양액공급 추가'}
								timer={timer}
								setTimer={setTimer}
								selectedDays={selectedDays}
								setSelectedDays={setSelectedDays}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

SettingScreen.Layout = Layout메인헤더;
SettingScreen.isGnb = true;
SettingScreen.pageName = '기타제어';
export default SettingScreen;
