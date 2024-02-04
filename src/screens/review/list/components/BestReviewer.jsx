import ReviewQuery from '@queries/review';
import { MockViewer } from '../../../../mocks/utils';
import { createContext, useContext } from 'react';

const BestReviewerContext = createContext();

const Root = ({ children }) => {
	const { data: bestReviewerList } = ReviewQuery.useBestReviewer({ suspense: true });
	return (
		<BestReviewerContext.Provider value={{ bestReviewerList }}>
			{typeof children === 'function' ? children({ bestReviewerList }) : children}
		</BestReviewerContext.Provider>
	);
};

const Demo = () => {
	const { bestReviewerList } = useContext(BestReviewerContext);
	return (
		<MockViewer
			dataName={'정성가득 리뷰어'}
			response={bestReviewerList}
		/>
	);
};

const Follow = ({ reviewer, children }) => {
	const handleToggleFollow = (e) => {
		e.preventDefault();
		console.log('팔로우! ');
		console.log('뮤테이션 발생 : ', reviewer);
	};

	return children({ handleToggleFollow });
};

const BestReviewer = {
	Root,
	Demo,
	Follow,
};

export default BestReviewer;
