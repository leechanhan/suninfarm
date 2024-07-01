import COLORS from '@constants/colors';
import { useRouter } from 'next/router';
export const IconGnbHome = ({ activeVal = false, fill = null }) => {
	const router = useRouter();
	const nowPath = router.pathname;
	const value = activeVal['/farm/detail'];
	//console.log('now', nowPath);

	if (nowPath === '/farm/detail') {
		console.log('123 같다');
	} else {
		console.log('123 다르다');
	}

	return (
		<img
			className="icon mid"
			src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_home.png`}
		/>
	);
};
