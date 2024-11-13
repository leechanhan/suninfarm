import Header from '@component/frame/Header';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import Layout메인헤더 from '@component/layout/Layout메인헤더';
import CustomAlert from '@lib/alert';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import LightService from '@service/LightService';
import AddTestAlarm from '@component/popup/AddTestAlarm';
import Button팝업종료 from '@component/frame/headerBtn/Button팝업종료';
const TestIndexScreen = () => {
	const CHANNEL_CNT = 3;
	const router = useRouter();
	const [isEditMode, setIsEditMode] = useState({ isEdit: false, alarmNo: null });
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [lightInfo1, setLightInfo1] = useState({});
	const [lightInfo2, setLightInfo2] = useState({});
	const [lightInfo3, setLightInfo3] = useState({});

	const [alarm1List, setAlarm1List] = useState([]);
	const [alarm2List, setAlarm2List] = useState([]);
	const [alarm3List, setAlarm3List] = useState([]);

	const [lightInfo, setLightInfo] = useState(router?.query);

	const [masterDiming1, setMasterDiming1] = useState(0);
	const [masterDiming2, setMasterDiming2] = useState(0);
	const [masterDiming3, setMasterDiming3] = useState(0);

	const [lightKey, setLightKey] = useState({});
	const [tActive, settActive] = useState('조명');
	const [active, setActive] = useState(1);

	const [alarmList, setAlarmList] = useState([
		{ alm_no: '1', alm_time: '1010', alm_week: '1111000', alm_enable: '1', alm_val1: '12', ieee: 'B43A31FFFE000001' },
		{ alm_no: '1', alm_time: '1010', alm_week: '1111000', alm_enable: '1', alm_val1: '12', ieee: 'B43A31FFFE000002' },
	]);

	const [popupIeee, setPopupIeee] = useState('B43A31FFFE000001');
	const [time, setTime] = useState('07:00');
	const [timer, setTimer] = useState('00:01');
	const [selectedDays, setSelectedDays] = useState([false, false, false, false, false, false, false]);

	useEffect(() => {
		LightService.getTestLight()
			.then((res) => {
				console.log('getTestLight', res);
				// 각 ieee 값으로 객체를 찾고 변수에 저장
				const lightInfo1 = findLightInfoByIeee('B43A31FFFE000001', res.ch_list.ch_item);
				const lightInfo2 = findLightInfoByIeee('B43A31FFFE000002', res.ch_list.ch_item);
				const lightInfo3 = findLightInfoByIeee('B43A31FFFE000003', res.ch_list.ch_item);

				setLightInfo1(lightInfo1);
				setLightInfo2(lightInfo2);
				setLightInfo3(lightInfo3);
			})
			.catch((err) => {
				console.log('getTestLight', err);
			});
	}, []);

	const getAlarmList = async () => {
		try {
			console.log('123');
			const ieeeList = ['B43A31FFFE000001', 'B43A31FFFE000002', 'B43A31FFFE000003'];

			const res1 = await LightService.getTestAlarmList({ ieee: 'B43A31FFFE000001' });
			const res2 = await LightService.getTestAlarmList({ ieee: 'B43A31FFFE000002' });
			const res3 = await LightService.getTestAlarmList({ ieee: 'B43A31FFFE000003' });

			setAlarm1List(res1?.alm_list?.alm_item ?? []);
			setAlarm2List(res2?.alm_list?.alm_item ?? []);
			setAlarm3List(res3?.alm_list?.alm_item ?? []);

			// setAlarm3List([
			// 	{
			// 		alm_no: '1',
			// 		alm_mac: 'B43A31FFFE000002',
			// 		alm_time: '11:30:00',
			// 		alm_enable: '1',
			// 		alm_week: '1111111',
			// 	},
			// 	{
			// 		alm_no: '2',
			// 		alm_mac: 'B43A31FFFE000002',
			// 		alm_time: '11:50:00',
			// 		alm_enable: '1',
			// 		alm_week: '1111111',
			// 	},
			// ]);
			console.log(res1);
			console.log(res3);
		} catch (error) {
			console.error('Error fetching alarm list:', error);
		}
		// const res1 = await LightService.putTestAlarmList({ ieee: 'B43A31FFFE000001' });
		// setAlarm1List(res1?.alm_list?.alm_item ?? []);
		// const res2 = await LightService.putTestAlarmList({ ieee: 'B43A31FFFE000002' });
		// setAlarm2List(res2?.alm_list?.alm_item ?? []);
		// const res3 = await LightService.putTestAlarmList({ ieee: 'B43A31FFFE000003' });
		// setAlarm3List(res3?.alm_list?.alm_item ?? []);
	};

	// 특정 ieee 값에 맞는 객체를 찾아주는 함수
	function findLightInfoByIeee(ieeeValue, responseArray) {
		return responseArray.find((item) => item.ieee === ieeeValue);
	}
	const onDelete = (alm_no, time, ieee) => {
		CustomAlert.info({
			html: getGroupName(ieee) + ' ' + formatTime(time) + ' 알람을 삭제하시겠습니까?.',
			callback: () => {
				LightService.deleteTestAlarm({ alm_no: alm_no, ieee: ieee })
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

	const handlerDeleteDevice = (name) => {
		CustomAlert.warning({ html: `${name}을 삭제하시겠습니까?`, callback: () => {} });
	};
	const putLightInfo = () => {
		const data = Object.assign({}, lightKey, lightInfo);
		console.log('Merged State:', data);
		LightService.putLightInfo(data)
			.then((res) => {
				if (res.result === 'success') {
					console.log('조명 설정 완료');
				} else {
					console.log('조명 설정 실패', res?.reason);
				}
			})
			.catch((err) => {
				console.log('putLightInfo err', err);
				console.log('조명 설정 실패');
			});
	};
	function allFalse(arr) {
		return arr.every((value) => value === false);
	}

	const onSave = () => {
		console.log('123');
		const totalSeconds = convertToSeconds(timer.minute, timer.sec);
		if (totalSeconds === 0) {
			CustomAlert.info({ html: '타이머 시간은 최소 1초입니다.', callback: () => {} });
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

		const data = { ieee: popupIeee, time: time?.replace(':', ''), week: binaryString };
		LightService.addTestAlarm(data)
			.then((res) => {
				CustomAlert.info({ html: '알람이 추가되었습니다.', callback: () => {} });
				getAlarmList();
			})
			.catch((err) => {
				console.log('geteway addAlarm err', err);
			});
	};

	const handleMasterDiming1 = (value) => {
		setMasterDiming1(value);
	};

	const handleMasterDiming2 = (value) => {
		setMasterDiming2(value);
	};

	const handleMasterDiming3 = (value) => {
		setMasterDiming3(value);
	};

	const handleDragEndTotalG1 = (value) => {
		console.log('handleDragEndTotalG1');
		setLightInfo1((prevValues) => {
			const newValues = { ...prevValues };
			newValues.val1 = value;
			newValues.val2 = value;
			newValues.val3 = value;
			newValues.val4 = value;
			newValues.val5 = value;
			newValues.val6 = value;
			newValues.val = value;
			debouncedPutLightGroupInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};
	const handleDragEndTotalG2 = (value) => {
		console.log('handleDragEndTotalG2');
		setLightInfo2((prevValues) => {
			const newValues = { ...prevValues };
			newValues.val1 = value;
			newValues.val2 = value;
			newValues.val3 = value;
			newValues.val4 = value;
			newValues.val5 = value;
			newValues.val6 = value;
			newValues.val = value;
			debouncedPutLightGroupInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	const handleDragEndTotalG3 = (value) => {
		console.log('handleDragEndTotalG3');
		setLightInfo3((prevValues) => {
			const newValues = { ...prevValues };
			newValues.val1 = value;
			newValues.val2 = value;
			newValues.val3 = value;
			newValues.val4 = value;
			newValues.val5 = value;
			newValues.val6 = value;
			newValues.val = value;
			debouncedPutLightGroupInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	useEffect(() => {
		// console.log('handleDragEndTotal2', lightInfo);
		//putLightInfo();
	}, [lightInfo]);
	// 디바운스된 putLightInfo 함수
	const debouncedPutLightGroupInfo = useCallback(
		debounce((updatedLightInfo) => {
			console.log();
			LightService.putTestLightGroup(updatedLightInfo)
				.then((res) => {
					if (res.result === 'success') {
						console.log('조명 설정 완료');
					} else {
						console.log('조명 설정 실패', res?.reason);
					}
				})
				.catch((err) => {
					console.log('putLightInfo err', err);
					console.log('조명 설정 실패');
				});
		}, 500),
		[],
	);

	const debouncedPutLightInfo = useCallback(
		debounce((updatedLightInfo) => {
			console.log(updatedLightInfo);
			LightService.putTestLight(updatedLightInfo)
				.then((res) => {
					if (res.result === 'success') {
						console.log('조명 설정 완료');
					} else {
						console.log('조명 설정 실패', res?.reason);
					}
				})
				.catch((err) => {
					console.log('putLightInfo err', err);
					console.log('조명 설정 실패');
				});
		}, 500),
		[],
	);
	// handleDimingWhite에서 상태 업데이트 후 디바운스 호출
	const handleDimingLight1 = (key, value) => {
		setLightInfo1((prevValues) => {
			const newValues = { ...prevValues };
			newValues[key] = value;
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	// handleDimingRed에서 상태 업데이트 후 디바운스 호출
	const handleDimingLight2 = (key, value) => {
		setLightInfo2((prevValues) => {
			const newValues = { ...prevValues };
			newValues[key] = value;
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	// handleDimingBlue에서 상태 업데이트 후 디바운스 호출
	const handleDimingLight3 = (key, value) => {
		setLightInfo3((prevValues) => {
			const newValues = { ...prevValues };
			newValues[key] = value;
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	// 상태 값이 업데이트될 때마다 debounced 함수 호출
	//	useEffect(() => {
	// 	updateLightDiming(lightInfo);
	//}, [lightInfo, updateLightDiming]); // lightInfo가 변경될 때마다 호출

	const handleDragEndCh1 = () => {
		console.log('handleDragEndCh1');
	};

	const handleDragEndCh2 = () => {
		console.log('handleDragEndCh2');
	};
	const handleDragEndCh3 = () => {
		console.log('handleDragEndCh3');
	};
	const handleDragEndCh4 = () => {
		console.log('handleDragEndCh4');
	};
	const handleDragEndCh5 = () => {
		console.log('handleDragEndCh5');
	};
	const handleDragEndCh6 = () => {
		console.log('handleDragEndCh6');
	};
	// Function to handle button click
	const handleClick = (index) => {
		setActive(index);
	};
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

	function convertToSeconds(min, sec) {
		const minutesInSeconds = parseInt(min, 10) * 60; // 1분 = 60초
		const seconds = parseInt(sec, 10); // 초는 그대로
		const totalSeconds = minutesInSeconds + seconds;

		return totalSeconds;
	}

	function getGroupName(ieee) {
		if (ieee === 'B43A31FFFE000001') {
			return '그룹1';
		}
		if (ieee === 'B43A31FFFE000002') {
			return '그룹2';
		}
		if (ieee === 'B43A31FFFE000003') {
			return '그룹3';
		}
	}

	function boolArrayToBinaryString(boolArray) {
		return boolArray.map((value) => (value ? '1' : '0')).join('');
	}

	function binaryStringToBoolArray(binaryString) {
		return binaryString.split('').map((char) => char === '1');
	}

	const handleTabClick = (name) => {
		settActive(name);

		if (name === '알람') {
			getAlarmList();
		}
	};

	const onAddAlarm = () => {
		setIsEditMode({ isEdit: false, alm_no: null });
		reset();
		setIsPopupOpen(true);
	};
	const onClosePopup = () => {
		setIsPopupOpen(false);
	};
	const reset = () => {
		// set time
		setTime('12:00');
		setTimer({ minute: '00', sec: '01' });
		// set week
		setSelectedDays([false, false, false, false, false, false, false]);
		setIsPopupOpen(true);
	};
	useEffect(() => {
		// 현재 URL의 쿼리 스트링을 가져옴
		const queryParams = new URLSearchParams(window.location.search);
		const ctr_ieee = queryParams.get('ctr_ieee');
		const gtw_id = queryParams.get('gtw_id');
		setLightKey({ ctr_ieee, gtw_id });
	}, []);

	return (
		<div className="content_wrapper">
			<div className="page_container_gray">
				<Header
					classes="nonPadding bg_gray"
					title={'개별 조명 제어'}
					LeftButton={() => <div style={{ width: 38, height: 38 }}></div>}
				/>
				<div className="tab-group">
					<button
						className={`button ${tActive === '조명' ? 'active' : ''}`}
						onClick={() => handleTabClick('조명')}
					>
						조명
					</button>
					<button
						className={`button ${tActive === '알람' ? 'active' : ''}`}
						onClick={() => handleTabClick('알람')}
					>
						알람
					</button>
				</div>
				{tActive === '알람' ? (
					<div className="setting_info_wrap">
						<div className="setting_tab_wrap">
							<div
								className="setting_title_wrap"
								onClick={onAddAlarm}
							>
								<span className="setting_title">알람 추가</span>
								<img
									className="setting_plus"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_plus.png`}
								/>
							</div>
							<div className="schedule">
								{alarm1List &&
									alarm1List.map((alarm, index) => (
										<div
											key={alarm.alm_no}
											className="schedule-item"
										>
											<img
												onClick={(e) => onDelete(alarm.alm_no, alarm.alm_time, alarm.alm_mac)}
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
															//handleToggle(alarm.alm_no);
														}} // 상태 변경 핸들러
													/>
													<span className="slider"></span>
												</label>
												<span
													className="checkbox-overlay"
													onClick={(e) => {
														e.stopPropagation(); // 부모 이벤트 전파 중지
														//onModify(alarm.alm_no); // 상태 변경 핸들러 호출
													}}
												></span>
											</div>
											<div className="schedule-item-row">
												<div className="days">{getGroupName(alarm.alm_mac)}</div>
											</div>
										</div>
									))}

								{alarm2List &&
									alarm2List.map((alarm, index) => (
										<div
											key={alarm.alm_no}
											className="schedule-item"
										>
											<img
												onClick={(e) => onDelete(alarm.alm_no, alarm.alm_time, alarm.alm_mac)}
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
															//handleToggle(alarm.alm_no);
														}} // 상태 변경 핸들러
													/>
													<span className="slider"></span>
												</label>
												<span
													className="checkbox-overlay"
													onClick={(e) => {
														e.stopPropagation(); // 부모 이벤트 전파 중지
														// 	onModify(alarm.alm_no); // 상태 변경 핸들러 호출
													}}
												></span>
											</div>
											<div className="schedule-item-row">
												<div className="days">{getGroupName(alarm.alm_mac)}</div>
											</div>
										</div>
									))}
								{alarm3List &&
									alarm3List.map((alarm, index) => (
										<div
											key={alarm.alm_no}
											className="schedule-item"
										>
											<img
												onClick={(e) => onDelete(alarm.alm_no, alarm.alm_time, alarm.alm_mac)}
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
															//	handleToggle(alarm.alm_no);
														}} // 상태 변경 핸들러
													/>
													<span className="slider"></span>
												</label>
												<span
													className="checkbox-overlay"
													onClick={(e) => {
														e.stopPropagation(); // 부모 이벤트 전파 중지
														//	onModify(alarm.alm_no); // 상태 변경 핸들러 호출
													}}
												></span>
											</div>
											<div className="schedule-item-row">
												<div className="days">{getGroupName(alarm.alm_mac)}</div>
											</div>
										</div>
									))}
								<AddTestAlarm
									isOpen={isPopupOpen}
									onClose={() => <Button팝업종료 popupClose={onClosePopup} />}
									setPopupIeee={setPopupIeee}
									popupIeee={popupIeee}
									onSave={onSave}
									isEdit={isEditMode}
									time={time}
									title={'알람 추가'}
									setTime={setTime}
									timer={timer}
									setTimer={setTimer}
									selectedDays={selectedDays}
									setSelectedDays={setSelectedDays}
								/>
							</div>
						</div>
					</div>
				) : (
					lightInfo && (
						<div className="light_info_wrap">
							<ul className="light_list_wrap">
								<li className="light_item">
									<span className="light_value">{masterDiming1}%</span>
									<div className="ui_wrap">
										<span className="label_blue">그룹1</span>
										<input
											className="light_progress blue"
											type="range"
											min="0"
											max="100"
											value={masterDiming1}
											onMouseUp={(e) => handleDragEndTotalG1(e.target.value)}
											onTouchEnd={(e) => handleDragEndTotalG1(e.target.value)}
											onChange={(e) => handleMasterDiming1(e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<div className="light_divider"></div>
								<li className="light_item">
									<span className="light_value">{lightInfo1.val1}%</span>
									<div className="ui_wrap">
										<span className="label_blue">CH1</span>
										<input
											className="light_progress blue"
											type="range"
											min="0"
											max="100"
											value={lightInfo1.val1}
											onMouseUp={(e) => handleDragEndCh1(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh1(e.target.value)}
											onChange={(e) => handleDimingLight1('val1', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo1.val2}%</span>
									<div className="ui_wrap">
										<span className="label_blue">CH2</span>
										<input
											className="light_progress blue"
											type="range"
											min="0"
											max="100"
											value={lightInfo1.val2}
											onMouseUp={(e) => handleDragEndCh2(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh2(e.target.value)}
											onChange={(e) => handleDimingLight1('val2', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo1.val3}%</span>
									<div className="ui_wrap">
										<span className="label_blue">CH3</span>
										<input
											className="light_progress blue"
											type="range"
											min="0"
											max="100"
											value={lightInfo1.val3}
											onMouseUp={(e) => handleDragEndCh3(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh3(e.target.value)}
											onChange={(e) => handleDimingLight1('val3', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo1.val4}%</span>
									<div className="ui_wrap">
										<span className="label_blue">CH4</span>
										<input
											className="light_progress blue"
											type="range"
											min="0"
											max="100"
											value={lightInfo1.val4}
											onMouseUp={(e) => handleDragEndCh4(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh4(e.target.value)}
											onChange={(e) => handleDimingLight1('val4', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo1.val5}%</span>
									<div className="ui_wrap">
										<span className="label_blue">CH5</span>
										<input
											className="light_progress blue"
											type="range"
											min="0"
											max="100"
											value={lightInfo1.val5}
											onMouseUp={(e) => handleDragEndCh5(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh5(e.target.value)}
											onChange={(e) => handleDimingLight1('val5', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo1.val6}%</span>
									<div className="ui_wrap">
										<span className="label_blue">CH6</span>
										<input
											className="light_progress blue"
											type="range"
											min="0"
											max="100"
											value={lightInfo1.val6}
											onMouseUp={(e) => handleDragEndCh6(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh6(e.target.value)}
											onChange={(e) => handleDimingLight1('val6', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
							</ul>

							<ul className="light_list_wrap">
								<div className="light_title">{lightInfo.ctr_name}</div>
								<li className="light_item">
									<span className="light_value">{masterDiming2}%</span>
									<div className="ui_wrap">
										<span className="label_white">그룹2</span>
										<input
											className="light_progress white"
											type="range"
											min="0"
											max="100"
											value={masterDiming2}
											onMouseUp={(e) => handleDragEndTotalG2(e.target.value)}
											onTouchEnd={(e) => handleDragEndTotalG2(e.target.value)}
											onChange={(e) => handleMasterDiming2(e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<div className="light_divider"></div>
								<li className="light_item">
									<span className="light_value">{lightInfo2.val1}%</span>
									<div className="ui_wrap">
										<span className="label_white">CH1</span>
										<input
											className="light_progress white"
											type="range"
											min="0"
											max="100"
											value={lightInfo2.val1}
											onMouseUp={(e) => handleDragEndCh1(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh1(e.target.value)}
											onChange={(e) => handleDimingLight2('val1', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo2.val2}%</span>
									<div className="ui_wrap">
										<span className="label_white">CH2</span>
										<input
											className="light_progress white"
											type="range"
											min="0"
											max="100"
											value={lightInfo2.val2}
											onMouseUp={(e) => handleDragEndCh2(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh2(e.target.value)}
											onChange={(e) => handleDimingLight2('val2', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo2.val3}%</span>
									<div className="ui_wrap">
										<span className="label_white">CH3</span>
										<input
											className="light_progress white"
											type="range"
											min="0"
											max="100"
											value={lightInfo2.val3}
											onMouseUp={(e) => handleDragEndCh3(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh3(e.target.value)}
											onChange={(e) => handleDimingLight2('val3', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo2.val4}%</span>
									<div className="ui_wrap">
										<span className="label_white">CH4</span>
										<input
											className="light_progress white"
											type="range"
											min="0"
											max="100"
											value={lightInfo2.val4}
											onMouseUp={(e) => handleDragEndCh4(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh4(e.target.value)}
											onChange={(e) => handleDimingLight2('val4', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo2.val5}%</span>
									<div className="ui_wrap">
										<span className="label_white">CH5</span>
										<input
											className="light_progress white"
											type="range"
											min="0"
											max="100"
											value={lightInfo2.val5}
											onMouseUp={(e) => handleDragEndCh5(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh5(e.target.value)}
											onChange={(e) => handleDimingLight2('val5', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo2.val6}%</span>
									<div className="ui_wrap">
										<span className="label_white">CH6</span>
										<input
											className="light_progress white"
											type="range"
											min="0"
											max="100"
											value={lightInfo2.val6}
											onMouseUp={(e) => handleDragEndCh6(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh6(e.target.value)}
											onChange={(e) => handleDimingLight2('val6', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
							</ul>
							<ul className="light_list_wrap">
								<div className="light_title">{lightInfo.ctr_name}</div>
								<li className="light_item">
									<span className="light_value">{masterDiming3}%</span>
									<div className="ui_wrap">
										<span className="label_red">그룹3</span>
										<input
											className="light_progress red"
											type="range"
											min="0"
											max="100"
											value={masterDiming3}
											onMouseUp={(e) => handleDragEndTotalG3(e.target.value)}
											onTouchEnd={(e) => handleDragEndTotalG3(e.target.value)}
											onChange={(e) => handleMasterDiming3(e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<div className="light_divider"></div>
								<li className="light_item">
									<span className="light_value">{lightInfo3.val1}%</span>
									<div className="ui_wrap">
										<span className="label_red">CH1</span>
										<input
											className="light_progress red"
											type="range"
											min="0"
											max="100"
											value={lightInfo3.val1}
											onMouseUp={(e) => handleDragEndCh1(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh1(e.target.value)}
											onChange={(e) => handleDimingLight3('val1', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo3.val2}%</span>
									<div className="ui_wrap">
										<span className="label_red">CH2</span>
										<input
											className="light_progress red"
											type="range"
											min="0"
											max="100"
											value={lightInfo3.val2}
											onMouseUp={(e) => handleDragEndCh2(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh2(e.target.value)}
											onChange={(e) => handleDimingLight3('val2', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo3.val3}%</span>
									<div className="ui_wrap">
										<span className="label_red">CH3</span>
										<input
											className="light_progress red"
											type="range"
											min="0"
											max="100"
											value={lightInfo3.val3}
											onMouseUp={(e) => handleDragEndCh3(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh3(e.target.value)}
											onChange={(e) => handleDimingLight3('val3', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo3.val4}%</span>
									<div className="ui_wrap">
										<span className="label_red">CH4</span>
										<input
											className="light_progress red"
											type="range"
											min="0"
											max="100"
											value={lightInfo3.val4}
											onMouseUp={(e) => handleDragEndCh4(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh4(e.target.value)}
											onChange={(e) => handleDimingLight3('val4', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo3.val5}%</span>
									<div className="ui_wrap">
										<span className="label_red">CH5</span>
										<input
											className="light_progress red"
											type="range"
											min="0"
											max="100"
											value={lightInfo3.val5}
											onMouseUp={(e) => handleDragEndCh5(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh5(e.target.value)}
											onChange={(e) => handleDimingLight3('val5', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li className="light_item">
									<span className="light_value">{lightInfo3.val6}%</span>
									<div className="ui_wrap">
										<span className="label_red">CH6</span>
										<input
											className="light_progress red"
											type="range"
											min="0"
											max="100"
											value={lightInfo3.val6}
											onMouseUp={(e) => handleDragEndCh6(e.target.value)}
											onTouchEnd={(e) => handleDragEndCh6(e.target.value)}
											onChange={(e) => handleDimingLight3('val6', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
							</ul>
						</div>
					)
				)}
				;
			</div>
		</div>
	);
};

TestIndexScreen.isGnb = false;
TestIndexScreen.pageName = '조명제어';
export default TestIndexScreen;
