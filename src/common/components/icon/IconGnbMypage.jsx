import COLORS from '@constants/colors';

export const IconGnbMypage = ({ fill = null }) => {
	return (
		<img
			className="icon"
			src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_setting.png`}
		/>
	);
};
