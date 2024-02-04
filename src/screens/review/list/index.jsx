import React, { useRef } from 'react';
import ReviewAll탭영역 from '@screens/review/list/components/ReviewAll탭영역';
import Review캠페인탭영역 from '@screens/review/list/components/Review캠페인탭영역';
import Review맘스픽탭영역 from '@screens/review/list/components/Review맘스픽탭영역';
import NestedTab from '@component/frame/NestedTab';
import Layout서브헤더영역 from '@component/layout/Layout서브헤더영역';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import COLORS from '@constants/colors';
import Button아이보리뷰검색팝업 from './components/Button아이보리뷰검색팝업';
import Review탭헤더영역 from './components/Review탭헤더영역';

const ReviewIndexScreen = () => {
	const refScrollContainer = useRef(null);
	return (
		<div
			className="content_wrapper"
			ref={refScrollContainer}
		>
			<div className="page_content review">
				<NestedTab.Root
					defaultState="all"
					queryParam="tabMode"
				>
					<Review탭헤더영역 refScrollContainer={refScrollContainer}>
						<NestedTab.Header className="tab_header depth1">
							<NestedTab.Link
								value="all"
								activeClass="active"
								className="tab_link"
							>
								#ALL
							</NestedTab.Link>
							<NestedTab.Link
								value="campaign"
								activeClass="active"
								className="tab_link"
							>
								#CAMPAIGN
							</NestedTab.Link>
							<NestedTab.Link
								value="momsPick"
								activeClass="active"
								className="tab_link"
							>
								#MOM&#39;S PICK
							</NestedTab.Link>
						</NestedTab.Header>

						<div className="current_active_category">
							{/*
                                TODO: 
                                #all탭 > depth2 카테고리 탭 활성화 일때 선택된 현재 카테고리 명 표시 필요함
                            */}
							{'카테고리'}
						</div>
					</Review탭헤더영역>

					<NestedTab.Panel
						className="tab_panel depth1"
						activeState="all"
					>
						<ReviewAll탭영역 />
					</NestedTab.Panel>
					<NestedTab.Panel
						className="tab_panel depth1"
						activeState="campaign"
					>
						<Review캠페인탭영역 />
					</NestedTab.Panel>
					<NestedTab.Panel
						className="tab_panel depth1"
						activeState="momsPick"
					>
						<Review맘스픽탭영역 />
					</NestedTab.Panel>
				</NestedTab.Root>
			</div>
		</div>
	);
};

ReviewIndexScreen.Layout = Layout서브헤더영역;
ReviewIndexScreen.headerOptions = {
	title: '아이보리뷰',
	titleLogo: '/images/bitmap/logo_ivoryreview.png',
	LeftButton: () => <Button뒤로가기 fill={COLORS.PRIMARY} />,
	RightButton: () => <Button아이보리뷰검색팝업 fill={COLORS.GRAY7} />,
};
ReviewIndexScreen.isGnb = true;

export default ReviewIndexScreen;
