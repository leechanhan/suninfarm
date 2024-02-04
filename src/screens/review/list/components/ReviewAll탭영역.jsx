import Tab from '@component/frame/Tab';
import QueryBoundary from '@component/boundary/QueryBoundary';
import ReviewAll카테고리탭영역 from '@screens/review/list/components/ReviewAll카테고리탭영역';
import ReviewAll브랜드탭영역 from '@screens/review/list/components/ReviewAll브랜드탭영역';

const ReviewAll탭영역 = () => {
	return (
		<div className="tab_inner_wrapper all">
			<h2 className="review_tab_title">
				<p>아이보리 체험 캠페인의</p>
				<p className="strong">생생한 리뷰를 모두 모았어요</p>
			</h2>
			<Tab.Root defaultState="category">
				<Tab.Header className={'tab_header'}>
					<Tab.Link
						className="tab_link"
						value="category"
						activeClass={'active'}
					>
						카테고리로 보기
					</Tab.Link>
					<Tab.Link
						value="brand"
						activeClass={'active'}
						className="tab_link"
					>
						브랜드로 보기
					</Tab.Link>
				</Tab.Header>
				<Tab.Panel
					activeState="category"
					className="tab_panel"
				>
					<QueryBoundary Skeleton={() => <>스켈레톤...</>}>
						<ReviewAll카테고리탭영역 />
					</QueryBoundary>
				</Tab.Panel>
				<Tab.Panel
					activeState="brand"
					className="tab_panel"
				>
					<QueryBoundary Skeleton={() => <>스켈레톤...</>}>
						<ReviewAll브랜드탭영역 />
					</QueryBoundary>
				</Tab.Panel>
			</Tab.Root>
		</div>
	);
};

export default ReviewAll탭영역;
