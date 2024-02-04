import { MockViewer } from '../../../../mocks/utils';
import { createContext, useContext } from 'react';
import ReviewQuery from '@queries/review';

const RealTimeReviewContext = createContext();
const Root = ({ children }) => {
	const { data: realTimeReviewList } = ReviewQuery.useRealtimeReviewListSummary({ suspense: true });
	return <RealTimeReviewContext.Provider value={{ realTimeReviewList }}>{children({ realTimeReviewList })}</RealTimeReviewContext.Provider>;
};

const Demo = () => {
	const { realTimeReviewList } = useContext(RealTimeReviewContext);
	console.log('realTimeReiviewList : ', realTimeReviewList);
	return (
		<MockViewer
			response={realTimeReviewList}
			dataName="실시간 리뷰"
		/>
	);
};

const RealTimeReview = {
	Root,
	Demo,
};

export default RealTimeReview;
