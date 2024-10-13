// components/Popup.js
import React from 'react';
import Layout기본헤더 from '@component/layout/Layout기본헤더';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Header from '@component/frame/Header';
import { useEffect, useState } from 'react';
const AddAlarm = ({ isOpen, onClose, onSave, time, setTime, timer, setTimer, selectedDays, setSelectedDays, isEdit }) => {
	if (!isOpen) {
		return null;
	}
	// 타이머 콤보박스용 30분 단위 옵션
	const timerHoursOptions = Array.from({ length: 6 }, (_, i) => i); // 0~2시간 선택
	const timerMinutesOptions = ['00', '30']; // 30분 단위

	const toggleDay = (index) => {
		const updatedDays = selectedDays.map((day, i) => (i === index ? !day : day));
		setSelectedDays(updatedDays);
	};

	// 시간을 처리하는 함수
	const handleHourChange = (hour) => {
		setTimer((prevTimer) => ({
			...prevTimer,
			hours: hour,
		}));
	};

	// 분을 처리하는 함수
	const handleMinuteChange = (minute) => {
		setTimer((prevTimer) => ({
			...prevTimer,
			minutes: minute,
		}));
	};

	const handleTimeChange = (e) => setTime(e.target.value);
	const handleTimerChange = (e) => setTimer(e.target.value);
	return (
		<div className="popup-overlay">
			<div className="page_container  popup-content">
				<Header
					title={'양액 공급 시간 제어'}
					LeftButton={onClose}
				/>
				<div className="nutrient-supply-container">
					<div className="titleWrap">
						<img
							className="icon_clock"
							src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_clock.png`}
						/>
						<span className="title">양액공급 시작시간</span>
					</div>
					<div className="timezoneWrap">
						<div className="time-picker">
							<input
								type="time"
								value={time}
								onChange={handleTimeChange}
							/>
						</div>
					</div>

					<div className="titleWrap">
						<img
							className="icon_clock"
							src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_clock.png`}
						/>
						<span className="title">양액공급 타이머</span>
					</div>
					<div className="timezoneWrap">
						<div className="timer-picker">
							<select
								value={timer.hours} // timer.hours를 기본값으로 설정
								onChange={(e) => handleHourChange(e.target.value)}
							>
								{timerHoursOptions.map((option) => (
									<option
										key={option}
										value={option}
									>
										{option} 시간
									</option>
								))}
							</select>
							<span>{''}</span>
							<select
								value={timer.minutes} // timer.minutes를 기본값으로 설정
								onChange={(e) => handleMinuteChange(e.target.value)}
							>
								{timerMinutesOptions.map((option) => (
									<option
										key={option}
										value={option}
									>
										{option} 분
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="day-selector">
						<div className="titleWrap">
							<img
								className="icon_clock"
								src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_calender.png`}
							/>
							<span className="title">요일 선택</span>
						</div>
						<div className="days">
							{['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
								<button
									key={day}
									className={selectedDays[index] ? 'active' : ''}
									onClick={() => toggleDay(index)}
								>
									{day}
								</button>
							))}
						</div>
					</div>
					<div className="nutrient-supply-container">
						<button
							className="save-button"
							onClick={onSave}
						>
							{'저장'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AddAlarm;
