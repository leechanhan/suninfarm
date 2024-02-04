import QueryBoundary from '@component/boundary/QueryBoundary';
import ReviewQuery from '@queries/review';
import { useState } from 'react';
import { uid } from 'react-uid';
import { MockViewer } from '../../../../mocks/utils';

const Review맘스픽탭영역 = () => {
	const [pickIdx, setPickIdx] = useState(0);
	return (
		<div className="tab_inner_wrapper pick">
			<h2 className="review_tab_title">
				<p>먼저 써본 엄마들의</p>
				<p className="strong">솔직한 체험 리뷰를 만나보세요</p>
			</h2>
			<QueryBoundary Skeleton={() => <>로딩중...</>}>
				<PickCategory
					pickIdx={pickIdx}
					setPickIdx={setPickIdx}
				/>
			</QueryBoundary>
			<QueryBoundary Skeleton={() => <>로딩중...</>}>
				<PickProductList pickIdx={pickIdx} />
			</QueryBoundary>
		</div>
	);
};

const PickCategory = ({ pickIdx, setPickIdx }) => {
	const { data: pickList } = ReviewQuery.usePicks({ suspense: true });

	return (
		<div>
			{pickList?.map((pick, idx) => (
				<button
					key={uid(pick)}
					className={idx === pickIdx ? 'active' : ''}
					onClick={() => setPickIdx(idx)}
				>
					{pick.subject}
				</button>
			))}
		</div>
	);
};

const PickProductList = ({ pickIdx }) => {
	const { data: pickList } = ReviewQuery.usePicks({ suspense: true });
	const targetPick = pickList?.[pickIdx];
	const { data: pickProductList } = ReviewQuery.usePickProductList({ pickIdx: targetPick.idx }, { suspense: true });
	return (
		<MockViewer
			dataName={targetPick.subject}
			response={pickProductList}
		/>
	);
};

export default Review맘스픽탭영역;
