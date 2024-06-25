import COLORS from '@constants/colors';

export const IconGnbCommunity = ({ fill = null }) => {
	return (
		<img
			className="icon"
			src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_light.png`}
		/>
	);
};
