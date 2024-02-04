import QueryBoundary from '@component/boundary/QueryBoundary';
import CampaignQuery from '@queries/campaign';
import useNativeRouter from '@hooks/useNativeRouter';
import { MockViewer } from '../../../mocks/utils';

const ReviewCampaignJoinScreen = () => {
	return (
		<div className="content_wrapper">
			<div className="page_content">
				<QueryBoundary Skeleton={() => <>로딩중...</>}>
					<Campaign />
				</QueryBoundary>
			</div>
		</div>
	);
};

const Campaign = () => {
	const router = useNativeRouter();
	const { seqNo } = router.query;
	const { data } = CampaignQuery.useCampaignGuide({ campaignSeqNo: seqNo }, { suspense: true });
	const { campaign, reviewList } = data;
	return (
		<>
			<MockViewer
				response={campaign}
				dataName={'campaign'}
			/>
			<MockViewer
				response={reviewList}
				dataName={'reviewList'}
			/>
		</>
	);
};

export default ReviewCampaignJoinScreen;
