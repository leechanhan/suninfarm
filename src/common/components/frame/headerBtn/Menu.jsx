import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
import React from 'react';

const Menu = ({ className = '', fill = COLORS.GRAY7 }) => {
	const router = useRouter();

	const handlerMenu = () => {
		alert('서비스 준비중입니다.');
	};

	const handlerSetting = () => {
		router.push('/deviceSetting');
	};

	const handlerAlarm = () => {
		router.push('/alarm');
	};

	return (
		<>
			<button
				type="button"
				className={`btn_back ${className}`}
				onClick={handlerMenu}
			>
				<span className="icon_box">
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_menu.png`} />
				</span>
			</button>
			<button
				type="button"
				className={`btn_back ${className}`}
				onClick={handlerAlarm}
			>
				<span className="icon_box">
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm.png`} />
				</span>
			</button>
			<button
				type="button"
				className={`btn_back ${className}`}
				onClick={handlerSetting}
			>
				<span className="icon_box">
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_setting.png`} />
				</span>
			</button>
		</>
	);
};

export default Menu;
