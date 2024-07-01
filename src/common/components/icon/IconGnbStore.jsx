import COLORS from '@constants/colors';

export const IconGnbStore = ({ activeVal = false, fill = null }) => {
	return (
		<img
			className="icon mid"
			src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_history.png`}
		/>
	);
};
