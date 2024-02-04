import QueryBoundary from '@component/boundary/QueryBoundary';
import { useRouter } from 'next/router';
import ReviewQuery from '@queries/review';
import Scrolled리뷰리스트 from '@screens/review/components/Scrolled리뷰리스트';

const ReviewBestScreen = () => {
	return (
		<div className="content_wrapper">
			<div className="page_content">
				<h2>Review</h2>
				<QueryBoundary Skeleton={() => <>로딩중...</>}>
					<List />
				</QueryBoundary>
			</div>
		</div>
	);
};

const List = () => {
	const router = useRouter();
	const { seqNo } = router.query;
	const { data: reviewList } = ReviewQuery.useBestReview({ detailYn: 'Y' }, { suspense: true });

	return (
		<Scrolled리뷰리스트
			reviewList={reviewList}
			targetId={seqNo}
		/>
	);
};

export default ReviewBestScreen;
