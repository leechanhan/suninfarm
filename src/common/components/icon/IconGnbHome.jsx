import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
export const IconGnbHome = ({ activeVal = false, fill = null }) => {
	return (
		<img
			className="icon mid"
			src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_home.png`}
		/>
	);
};
