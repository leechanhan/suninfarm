import { IconSearch } from '@component/icon/IconSearch';
import COLORS from '@constants/colors';
import React from 'react';

const Button아이보리뷰검색팝업 = ({ className = '', fill = COLORS.GRAY7 }) => {
	return (
		<button
			type="button"
			className={`btn_back ${className}`}
		>
			<span className="icon_box">
				<IconSearch fill={fill} />
			</span>
		</button>
	);
};

export default Button아이보리뷰검색팝업;
