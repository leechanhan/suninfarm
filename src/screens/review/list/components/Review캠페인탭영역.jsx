import BestReview from '@screens/review/list/components/BestReview';
import BestReviewer from '@screens/review/list/components/BestReviewer';
import QueryBoundary from '@component/boundary/QueryBoundary';
import { uid } from 'react-uid';
import Link from 'next/link';
import CustomImage from '@component/frame/CustomImage';
import { Else, If, Then } from 'react-if';
import { isEmpty } from 'lodash';
import { IconIvory } from '@icon/IconIvory';
import COLORS from '@constants/colors';
import Overlay모달컨테이너 from '@component/frame/Overlay모달컨테이너';
import useRouteOverlay from '@hooks/useRouteOverlay';
import ActiveCampaignList from '@screens/review/list/components/ActiveCampaignList';
import { MockViewer } from '../../../../mocks/utils';

const Review캠페인탭영역 = () => {
	const { open, close, isOverlayActive } = useRouteOverlay('recommender', 'on');
	return (
		<div className="tab_inner_wrapper campaign">
			<h2 className="review_tab_title">
				<p>요즘 뜨는 신상 육아템!</p>
				<p className="strong">특별한 체험 기회를 드립니다</p>
			</h2>
			{/*진행중인 캠페인*/}
			<QueryBoundary Skeleton={() => <>스켈레톤...</>}>
				<ActiveCampaignList.Root>
					{({ activeCampaignList }) => (
						<>
							<MockViewer
								response={activeCampaignList}
								dataName={'진행중인 캠페인'}
							/>
							<ul>
								{activeCampaignList.map((campaign) => (
									<Link
										key={uid(campaign)}
										href={`/review/join?seqNo=${campaign.campainSeqNo}`}
									>
										<div className="img_box">
											<CustomImage
												src={campaign.productListImg}
												width={320}
												height={435}
											/>
										</div>
										<div className="dday">D-{campaign.dDay ?? 0}</div>
										{campaign.campainName}
									</Link>
								))}
							</ul>
						</>
					)}
				</ActiveCampaignList.Root>
			</QueryBoundary>

			{/*상품 추천 하기*/}
			<div>
				<div>
					<p>체험하고 싶은 아이템을 추천해주세요</p>
					<h3>이 제품이 궁금해요!</h3>
					<div>추천 제품이 캠페인에 소개되면 체험 기회를 드립니다</div>
				</div>
				<div>
					<button onClick={open}>추천하기</button>
					<Overlay모달컨테이너
						isVisible={isOverlayActive}
						onClose={close}
						aniType="fadeIn"
					>
						<div style={{ height: '100vh', backgroundColor: 'white', width: '100%' }}>
							<header className="header">
								<button onClick={close}>뒤로가기</button>
								<h1 className="header_title">
									<img
										src={process.env.NEXT_PUBLIC_BASE_PATH + '/images/bitmap/logo_ivoryreview.png'}
										alt="아이보리뷰"
									/>
								</h1>
							</header>
							<h2>
								수많은 육아용품중
								<br />
								요즘 어떤 제품에 관심이 가나요?
								<br />
								아이보리 회원들과 함께 체험하고 싶은 제품을
								<br />
								추천해주세요.
							</h2>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<strong>브랜드,제품명,추천 이유를 자유롭게 적어주세요.</strong>
								<textarea></textarea>
							</div>
						</div>
					</Overlay모달컨테이너>
				</div>
			</div>

			{/*정성가득 리뷰어*/}
			<div>
				<h3>정성가득 리뷰어</h3>
				<QueryBoundary Skeleton={() => <>로딩중...</>}>
					<BestReviewer.Root>
						{({ bestReviewerList }) => (
							<>
								<BestReviewer.Demo />
								<ul
									style={{
										display: 'flex',
										flexWrap: 'nowrap',
										gap: '10px',
										overflowX: 'scroll',
									}}
								>
									{bestReviewerList.map((reviewer) => (
										<li
											key={uid(reviewer)}
											style={{ padding: '10px', minWidth: '100px' }}
										>
											<Link href={`/customer/profile?targetId=${reviewer.userId}`}>
												<div
													className="profile"
													style={{ minHeight: '100px' }}
												>
													<If condition={!isEmpty(reviewer?.userImg)}>
														<Then>
															<div className="img_box">
																<CustomImage
																	src={reviewer?.userImg}
																	alt="프로필 이미지"
																	width={100}
																	height={100}
																/>
															</div>
														</Then>
														<Else>
															<IconIvory fill={COLORS.PRIMARY} />
														</Else>
													</If>
												</div>
												<p style={{ marginBottom: '20px' }}>{reviewer.nickname}</p>
												<BestReviewer.Follow reviewer={reviewer}>
													{({ handleToggleFollow }) => <button onClick={handleToggleFollow}>팔로우</button>}
												</BestReviewer.Follow>
											</Link>
										</li>
									))}
								</ul>
							</>
						)}
					</BestReviewer.Root>
				</QueryBoundary>
			</div>
			<div>
				<h3>금주의 베스트 리뷰</h3>
				<QueryBoundary Skeleton={() => <>로딩중...</>}>
					<BestReview.Root>
						{({ bestReviewList }) => (
							<>
								<BestReview.Demo />
								<ul
									style={{
										display: 'flex',
										flexWrap: 'nowrap',
										gap: '10px',
										overflowX: 'scroll',
									}}
								>
									{bestReviewList.map((review) => (
										<li
											key={uid(review)}
											style={{ padding: '10px', minWidth: '100px' }}
										>
											<Link href={`/review/best?seqNo=${review.seqNo}`}>
												<div className="img_box">
													<CustomImage
														src={review.listImg}
														alt={review.sumReview}
														width={193}
														height={90}
													/>
												</div>
												<div
													className="profile"
													style={{ minHeight: '100px' }}
												>
													<If condition={!isEmpty(review?.userInfo?.userImg)}>
														<Then>
															<div className="img_box">
																<CustomImage
																	src={review?.userInfo?.userImg}
																	alt="프로필 이미지"
																	width={100}
																	height={100}
																/>
															</div>
														</Then>
														<Else>
															<IconIvory fill={COLORS.PRIMARY} />
														</Else>
													</If>
												</div>

												<p style={{ marginBottom: '20px' }}>{review.sumReview}</p>
												<p>{review.productName}</p>
											</Link>
										</li>
									))}
								</ul>
							</>
						)}
					</BestReview.Root>
				</QueryBoundary>
			</div>
		</div>
	);
};

export default Review캠페인탭영역;
