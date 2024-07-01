import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const IntroScreen = () => {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push('/login');
		}, 2000);
	}, []);
	return (
		<div className="intro_wrap">
			<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_mid.png`} />
		</div>
	);
};

IntroScreen.Layout = Layout기본헤더없음;
IntroScreen.headerOptions = {
	title: '',
};

IntroScreen.isGnb = false;
export default IntroScreen;
