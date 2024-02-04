import { IconHeartOutline } from '@component/icon/IconHeartOutline';
const COLORS = require('@constants/colors');

const Button좋아요추가 = ({ className = '', fill = COLORS.GRAY7 }) => {
	return (
		<button
			type="button"
			className={`btn_share ${className}`}
			onClick={() => console.log('좋아요')}
		>
			<span className="icon_box">
				<IconHeartOutline fill={fill} />
			</span>
		</button>
	);
};

export default Button좋아요추가;
