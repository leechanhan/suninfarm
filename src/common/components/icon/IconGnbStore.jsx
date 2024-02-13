import COLORS from '@constants/colors';

export const IconGnbStore = ({ fill = null }) => {
	return (
		<img
			className="icon"
			src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_nav_cctv.png`}
		/>
	);
};
