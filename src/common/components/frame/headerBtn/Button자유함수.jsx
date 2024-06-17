import { IconTriangleLeft } from '@component/icon/IconTriangleLeft';
import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
import React from 'react';

const Button자유함수 = ({ className = '', fill = COLORS.GRAY7 }) => {
	const router = useRouter();

	return (
		<button
			type="button"
			className={`btn_back ${className}`}
			onClick={() => router.back()}
		>
			<span className="icon_box">
				<IconTriangleLeft fill={fill} />
			</span>
		</button>
	);
};

export default Button자유함수;
