import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
import React from 'react';

const Menu = ({ className = '', fill = COLORS.GRAY7 }) => {
	const router = useRouter();

	return (
		<>
			<button
				type="button"
				className={`btn_back ${className}`}
				onClick={{}}
			>
				<span className="icon_box">
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_menu.png`} />
				</span>
			</button>
			<button
				type="button"
				className={`btn_back ${className}`}
				onClick={{}}
			>
				<span className="icon_box">
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_setting.png`} />
				</span>
			</button>
		</>
	);
};

export default Menu;
