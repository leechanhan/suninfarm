import { useRef } from 'react';
import QueryBoundary from '@component/boundary/QueryBoundary';
import { useRouter } from 'next/router';
import Main빠른바로가기영역 from '@screens/main/components/Main빠른바로가기영역';
import Main상단캠페인이벤트배너 from '@screens/main/components/Main상단캠페인이벤트배너';
import Main육아상담플로팅배너 from '@screens/main/components/Main육아상담플로팅배너';
import Main유저정보영역 from '@screens/main/components/Main유저정보영역';
import Main이벤트배너영역 from '@screens/main/components/Main이벤트배너영역';
import MainService커뮤니티 from '@screens/main/components/MainService커뮤니티';
import MainService아라쇼 from '@screens/main/components/MainService아라쇼';
import MainService기획전 from '@screens/main/components/MainService기획전';
import MainService아이보리뷰 from '@screens/main/components/MainService아이보리뷰';
import MainService육아정보 from '@screens/main/components/MainService육아정보';
import MainService브랜드딜 from '@screens/main/components/MainService브랜드딜';
import MainService할인중 from '@screens/main/components/MainService할인중';
import Main아라쇼플로팅배너 from './components/Main아라쇼플로팅배너';
import GatewayQuery from '@queries/gateway';
import { MockViewer } from '../../mocks/utils';
import { IconInstagram } from '@component/icon/IconInstagram';
import { IconNaverblog } from '@component/icon/IconNaverblog';

const MainIndexScreen = () => {
	const refCounselingScrollChecker = useRef(null);
	const refScrollContainer = useRef(null);
	const router = useRouter();

	return (
		<div
			className="content_wrapper"
			ref={refScrollContainer}
		>
			<div className="page_content main">
				<Main유저정보영역 />
				<Main아라쇼플로팅배너 />

				<Main빠른바로가기영역 />

				<QueryBoundary Skeleton={() => <></>}>
					<Main육아상담플로팅배너
						refScrollChecker={refCounselingScrollChecker}
						refScrollContainer={refScrollContainer}
					/>
				</QueryBoundary>

				<Main상단캠페인이벤트배너 />

				<div ref={refCounselingScrollChecker}>
					<Main이벤트배너영역 />
				</div>

				<MainService커뮤니티 />

				<QueryBoundary Skeleton={() => <></>}>
					<MainService아라쇼 />
				</QueryBoundary>

				<MainService기획전 />

				<MainService브랜드딜 />

				<MainService할인중 />

				<MainService아이보리뷰 />

				<QueryBoundary Skeleton={() => <>로딩</>}>
					<MainService육아정보 />
				</QueryBoundary>
				{/* <TipTest /> */}

				<div className="main_sns_box">
					<button
						type="button"
						className="btn_sns instagram"
					>
						<IconInstagram />
					</button>
					<button
						type="button"
						className="btn_sns naver_blog"
					>
						<IconNaverblog />
					</button>
				</div>
			</div>
		</div>
	);
};

const TipTest = () => {
	const { data } = GatewayQuery.useBebeTips({ suspense: true });
	return (
		<MockViewer
			dataName={'팁 테스트'}
			response={data}
		/>
	);
};

MainIndexScreen.headerOptions = {
	title: '메인',
};
MainIndexScreen.isGnb = true;

export default MainIndexScreen;
