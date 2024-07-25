import { IconTriangleLeft } from '@component/icon/IconTriangleLeft';
import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
import React from 'react';

const ButtonFree = ({ className = '', imgPath = '/images/png/button_plus', routerPath = '/farm/list' }) => {
	const router = useRouter();

	return (
		<button
			type="button"
			className={`btn_back ${className}`}
			onClick={() => router.push(routerPath)}
		>
			<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}${imgPath}`} />
		</button>
	);
};

export default ButtonFree;
