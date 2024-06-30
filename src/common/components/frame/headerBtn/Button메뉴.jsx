import { IconTriangleLeft } from '@component/icon/IconTriangleLeft';
import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
import React from 'react';

const Button메뉴 = ({ onOpen }) => {
	const router = useRouter();

	return (
		<button
			type="button"
			className={`btn_back `}
			onClick={() => onOpen()}
		>
			<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/header/icon_menu.png`} />
		</button>
	);
};

export default Button메뉴;
