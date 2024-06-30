import '../../public/styles/globals.scss';
import IndexWrapper from '@component/wrapper/IndexWrapper';
import { useMsw } from '../mocks/utils';
import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import 'swiper/css';
export default function App({ Component, pageProps }) {
	// const { isUseMsw, isMswPrepared } = useMsw();
	// if (isUseMsw && !isMswPrepared) {
	// 	return null;
	// }

	const { Layout = Layout기본헤더없음, headerOptions = {}, footerOptions = {}, isGnb = false } = Component;
	return (
		<IndexWrapper>
			<Layout
				{...headerOptions}
				{...footerOptions}
				isGnb={isGnb}
			>
				<Component {...pageProps} />
			</Layout>
		</IndexWrapper>
	);
}
