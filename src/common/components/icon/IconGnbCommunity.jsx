import COLORS from '@constants/colors';

export const IconGnbCommunity = ({ activeVal = false, fill = null }) => {
	return (
		<img
			className="icon small"
			src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_light.png`}
		/>
	);
};
