import { IconTriangleLeft } from '@component/icon/IconTriangleLeft';
import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
import React from 'react';

const Button팝업종료 = ({ popupClose }) => {
	const router = useRouter();

	return (
		<button
			type="button"
			className={`btn_back`}
			onClick={() => popupClose()}
		>
			<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_left.png`} />
		</button>
	);
};

export default Button팝업종료;
