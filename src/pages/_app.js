import '../../public/styles/globals.scss';
import IndexWrapper from '@component/wrapper/IndexWrapper';
import { useMsw } from '../mocks/utils';
import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import 'swiper/css';
import { useRouter } from 'next/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
export default function App({ Component, pageProps }) {
	const { isUseMsw, isMswPrepared } = useMsw();
	if (isUseMsw && !isMswPrepared) {
		return null;
	}

	const { Layout = Layout기본헤더없음, headerOptions = {}, footerOptions = {}, isGnb = false } = Component;
	const router = useRouter();
	return (
		<IndexWrapper>
			<Layout
				{...headerOptions}
				{...footerOptions}
				isGnb={isGnb}
			>
				<TransitionGroup>
					<CSSTransition
						key={router.pathname}
						classNames="page"
						timeout={300}
					>
						<Component {...pageProps} />
					</CSSTransition>
				</TransitionGroup>
			</Layout>
		</IndexWrapper>
	);
}
