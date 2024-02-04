import ReviewQuery from '@queries/review';
import { createContext, useContext } from 'react';
import { MockViewer } from '../../../../mocks/utils';

const BestReviewContext = createContext();

const Root = ({ children }) => {
	const { data: bestReviewList } = ReviewQuery.useBestReview({ detailYn: undefined }, { suspense: true });
	return (
		<BestReviewContext.Provider value={{ bestReviewList }}>
			{typeof children === 'function' ? children({ bestReviewList }) : children}
		</BestReviewContext.Provider>
	);
};

const Demo = () => {
	const { bestReviewList } = useContext(BestReviewContext);
	return (
		<MockViewer
			response={bestReviewList}
			dataName="베스트리뷰"
		/>
	);
};

const BestReview = {
	Root,
	Demo,
};
export default BestReview;
