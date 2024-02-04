import { IconShare } from '@component/icon/IconShare';
const COLORS = require('@constants/colors');

const Button공유하기 = ({ className = '', fill = COLORS.GRAY7, onClick }) => {
	return (
		<button
			type="button"
			className={`btn_share ${className}`}
			onClick={() => onClick()}
		>
			<span className="icon_box">
				<IconShare fill={fill} />
			</span>
		</button>
	);
};

export default Button공유하기;
