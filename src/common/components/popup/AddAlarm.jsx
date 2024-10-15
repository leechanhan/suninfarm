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
	const timerMinOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
	// const timerMinutesOptions = ['01', '10', '20', '30', '40', '50']; // 30분 단위
	const timerSecsOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

	const toggleDay = (index) => {
		const updatedDays = selectedDays.map((day, i) => (i === index ? !day : day));
		setSelectedDays(updatedDays);
	};

	// 시간을 처리하는 함수
	const handleSecChange = (sec) => {
		setTimer((prevTimer) => ({
			...prevTimer,
			sec: sec,
		}));
	};

	// 분을 처리하는 함수
	const handleMinuteChange = (minute) => {
		console.log('1');
		setTimer((prevTimer) => ({
			...prevTimer,
			minute: minute,
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
								value={timer.minute} // timer.hours를 기본값으로 설정
								onChange={(e) => handleMinuteChange(e.target.value)}
							>
								{timerMinOptions.map((option) => (
									<option
										key={option}
										value={option}
									>
										{option} 분
									</option>
								))}
							</select>
							<span className="semicolon">{': '}</span>
							<select
								value={timer.sec} // timer.minutes를 기본값으로 설정
								onChange={(e) => handleSecChange(e.target.value)}
							>
								{timerSecsOptions.map((option) => (
									<option
										key={option}
										value={option}
									>
										{option} 초
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
