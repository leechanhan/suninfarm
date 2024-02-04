import ReviewQuery from '@queries/review';
import { uid } from 'react-uid';
import QueryBoundary from '@component/boundary/QueryBoundary';
import CampaignProductList from '@screens/review/list/components/CampaingProductList';
import RealTimeReview from '@screens/review/list/components/RealTimeReview';
import { useState } from 'react';
import Link from 'next/link';
import CustomImage from '@component/frame/CustomImage';
import Progress별점박스 from '@component/etc/Progress별점박스';
import CustomForms from '@component/etc/CustomForms';
import { IconIvory } from '@component/icon/IconIvory';
import COLORS from '@constants/colors';
import { IconLinkArrow } from '@component/icon/IconLinkArrow';

const ReviewAll카테고리탭영역 = () => {
	const [categoryNo, setCategoryNo] = useState(undefined); //undefined : 전체 카테고리

	const { data: categories } = ReviewQuery.useCategories({ suspense: true });

	const withoutAllCategories = categories.filter((category) => category?.categoryNo !== 0) ?? [];
	return (
		<div className="tab_inner_wrapper depth2">
			{/* <h2>카테고리</h2>
				<MockViewer
					dataName={'카테고리 목록'}
					response={categories}
				/> */}
			<ul className="review_category_list">
				<li className={`review_category_item ${!categoryNo ? 'active' : ''}`}>
					<button onClick={() => setCategoryNo(undefined)}>
						<div className="active_effect_box" />
						<div className="img_box">
							<IconIvory fill={COLORS.PRIMARY} />
							{/* <CustomImage
								src="https://iandna-ivory.com/resources/assets/img/review/icon_all_category_01.png"
								alt={'나중에 이미지 작업 해야함'}
								width={72}
								height={72}
							/> */}
						</div>
						<p className="text_box">All</p>
					</button>
				</li>
				{withoutAllCategories.map((category) => (
					<li
						className={`review_category_item ${categoryNo === category.expCategoryNo ? 'active' : ''}`}
						key={uid(category)}
					>
						<button
							onClick={() => {
								setCategoryNo(Number(category.expCategoryNo));
							}}
						>
							<div className="active_effect_box" />
							<div className="img_box">
								<CustomImage
									src={category.expCategoryImgUrl}
									width={72}
									height={72}
								/>
							</div>
							<p className="text_box">{category.expCategoryName}</p>
						</button>
					</li>
				))}
			</ul>

			{/* <h2>캠페인 상품 목록</h2> */}
			<QueryBoundary Skeleton={() => <>스켈레톤...</>}>
				<CampaignProductList.Root categoryNo={categoryNo}>
					{/*api 명세*/}
					{/* <CampaignProductList.Demo
						categories={categories}
						categoryNo={categoryNo}
					/> */}

					<div className="text_with_check">
						<CampaignProductList.Trigger구매가능상품보기>
							{({ isShowOnlyPurchaseAble, handleToggleIsShowOnlyPurchaseAble }) => (
								<CustomForms.Form체크박스
									label="구매 가능 제품만 모아보기"
									id="onlyPurchaseAble"
									onChange={handleToggleIsShowOnlyPurchaseAble}
									value={isShowOnlyPurchaseAble}
								/>
							)}
						</CampaignProductList.Trigger구매가능상품보기>
					</div>

					{/*상품 상위 6개*/}
					<CampaignProductList.Latest>
						{({ latestProductList }) => (
							<ul className="review_product_list new">
								{latestProductList.map((product) => (
									<ReviewAll상품아이템
										key={uid(product)}
										product={product}
									/>
								))}
							</ul>
						)}
					</CampaignProductList.Latest>

					{/*실시간 리뷰*/}
					<div className="review_realtime_previw_wrapper">
						<h2 className="review_realtime_title">실시간 리뷰</h2>
						<QueryBoundary Skeleton={() => <>스켈레톤</>}>
							<RealTimeReview.Root>
								{({ realTimeReviewList }) => (
									<>
										{/* <RealTimeReview.Demo /> */}
										{realTimeReviewList.length > 0 && (
											<>
												<Link
													className="btn_view_all"
													href={`/review/realtime?seqNo=${realTimeReviewList[0].seqNo}`}
												>
													<span>리뷰 전체보기</span>
													<IconLinkArrow />
												</Link>

												<ul className="review_realtime_preview_list">
													{realTimeReviewList.map((review) => (
														<li
															key={uid(review)}
															className="realtime_preview_item"
														>
															<Link href={`/review/realtime?seqNo=${review.seqNo}`}>
																<div className="text_box">
																	<p className="review_preview">{review.sumReview}</p>

																	<Progress별점박스 grade={review.gradeAverage} />
																</div>
																<div className="profile_box">
																	<div className="img_box product">
																		<CustomImage
																			src={review.listImg}
																			alt={review.productName}
																			width={124}
																			height={112}
																		/>
																	</div>
																	<div className="img_box user">
																		{review.userImg ? (
																			<CustomImage
																				src={review.userImg}
																				alt={review.nickname || review.userId}
																				width={44}
																				height={44}
																			/>
																		) : (
																			<IconIvory fill="#fff" />
																		)}
																	</div>
																</div>
															</Link>
														</li>
													))}
												</ul>
											</>
										)}
									</>
								)}
							</RealTimeReview.Root>
						</QueryBoundary>
					</div>

					{/*상품 나머지*/}
					<CampaignProductList.Others>
						{({ otherProductList }) => (
							<ul className="review_product_list">
								{otherProductList.map((product) => (
									<ReviewAll상품아이템
										key={uid(product)}
										product={product}
									/>
								))}
							</ul>
						)}
					</CampaignProductList.Others>
				</CampaignProductList.Root>
			</QueryBoundary>
		</div>
	);
};

export default ReviewAll카테고리탭영역;

const ReviewAll상품아이템 = ({ product }) => {
	return (
		<li className="review_product_item">
			<Link href={`/review/product?productCode=${product.productCode}`}>
				<div className="img_box">
					<CustomImage
						src={product.productListImg}
						alt={product.productName}
						width={266}
						height={360}
					/>
				</div>
				<div className="text_box">
					<p className="product_name">{product.productName}</p>
					<Progress별점박스 grade={product.productGradeAverage} />
				</div>
			</Link>
		</li>
	);
};
