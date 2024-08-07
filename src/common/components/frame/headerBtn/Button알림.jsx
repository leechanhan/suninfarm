import { IconTriangleLeft } from '@component/icon/IconTriangleLeft';
import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
import React from 'react';

const Button알림 = ({ className = '', fill = COLORS.GRAY7 }) => {
	const router = useRouter();

	return (
		<button
			type="button"
			className={`btn_back ${className}`}
			onClick={() => router.push('/alarm')}
		>
			<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/header/icon_alarm.png`} />
		</button>
	);
};

export default Button알림;
