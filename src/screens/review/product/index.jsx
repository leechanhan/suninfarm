import { useRouter } from 'next/router';
import QueryBoundary from '@component/boundary/QueryBoundary';
import CampaignQuery from '@queries/campaign';
import { MockViewer } from '../../../mocks/utils';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Header from '@component/frame/Header';
import COLORS from '@constants/colors';
import { useLayoutEffect, useRef, useState, Fragment } from 'react';
import useScroll from '@hooks/useScroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import CustomImage from '@component/frame/CustomImage';
import { jsMediaQuery } from '@lib/function/util';
import useWindowSize from '@lib/hooks/windowSize';
import Button공유하기 from './components/Button공유하기';
import Button좋아요추가 from './components/Button좋아요추가';
import Progress별점박스 from '@component/etc/Progress별점박스';
import { IconLinkArrow } from '@component/icon/IconLinkArrow';
import { IconGrade } from '@component/icon/IconGrade';
import { IconTriangleLeft } from '@component/icon/IconTriangleLeft';
import { IconIvory } from '@component/icon/IconIvory';
import Overlay모달컨테이너 from '@component/frame/Overlay모달컨테이너';
import useRouteOverlay from '@hooks/useRouteOverlay';
import { IconClose } from '@component/icon/IconClose';

const ReviewProductScreen = () => {
	const router = useRouter();
	const [title, setTitle] = useState('scroll_top');
	const refScrollContainer = useRef(null);
	const { isOverlayActive: isReviewShareModalOn, close: closeReviewShareModal } = useRouteOverlay('reviewShareModal', 'on');

	return (
		<>
			<ScrollHideHeader
				title={title}
				refScrollContainer={refScrollContainer}
			/>
			<div
				className="content_wrapper review_product"
				ref={refScrollContainer}
			>
				<div className="page_content">
					<QueryBoundary Skeleton={() => <>로딩중...</>}>
						<Product setTitle={setTitle} />
					</QueryBoundary>
				</div>
			</div>

			{/* 공유하기 슬라이드 */}
			<Overlay모달컨테이너
				isVisible={isReviewShareModalOn}
				aniType="slideUp"
				onClose={closeReviewShareModal}
				className="position_bottom"
			>
				<div className="review_share_slide">
					<h2>공유로 함께해요</h2>
					<div className="icon_box">
						<button>카카오톡</button>
						<button>메일</button>
						<button>URl복사</button>
					</div>
				</div>
			</Overlay모달컨테이너>
		</>
	);
};

const ScrollHideHeader = ({ title, refScrollContainer }) => {
	const [hideClass, setHideClass] = useState({
		className: 'scroll_top',
		scrollY: 0,
	});
	const { scrollY } = useScroll(refScrollContainer);
	const { open: openReviewShareModal } = useRouteOverlay('reviewShareModal', 'on');

	useLayoutEffect(() => {
		if (refScrollContainer.current) {
			const targetPadding = window.getComputedStyle(refScrollContainer.current).paddingTop;
			const targetHeight = refScrollContainer.current?.offsetTop + parseInt(targetPadding);
			setHideClass((prev) => {
				if (prev.scrollY < scrollY + targetHeight) {
					return {
						className: 'scroll_up',
						scrollY: scrollY,
					};
				} else {
					return {
						className: 'scroll_top',
						scrollY: scrollY,
					};
				}
			});
		}
	}, [scrollY, refScrollContainer]);

	return (
		<Header
			title={`제품 리뷰 - ${title}`}
			classes={`transparent floating ${hideClass.className}`}
			onlyTitle={true}
			LeftButton={() => <Button뒤로가기 fill={COLORS.PRIMARY} />}
			RightButton={() => (
				<div className="btn_group">
					<Button공유하기 onClick={openReviewShareModal} />
					<Button좋아요추가 />
				</div>
			)}
		/>
	);
};

const Product = ({ setTitle }) => {
	const router = useRouter();
	const { productCode } = router.query;
	const {
		data: { product, reviewList = [] },
	} = CampaignQuery.useProduct({ productCode }, { suspense: true });
	const { vw, vh } = useWindowSize();
	const {
		isOverlayActive: isProductDetailModalOn,
		open: openProductDetailModal,
		close: closeProductDetailModal,
	} = useRouteOverlay('productDetailModal', 'on');

	console.log('product : ', product);
	console.log('reviewList : ', reviewList);

	useLayoutEffect(() => {
		setTitle(product.productName);
	}, []);

	return (
		<>
			{/* 제품 슬라이드 이미지 */}
			<div className="product_slide_wrapper">
				<Swiper
					modules={[Pagination]}
					pagination={{
						el: '#slidePagination',
						type: 'bullets',
						bulletClass: 'pagination_bullet',
						bulletActiveClass: 'active',
						clickable: true,
					}}
				>
					{product.productSlideImageList.split('^').map((item, index) => (
						<SwiperSlide key={index}>
							<CustomImage
								src={item}
								width={jsMediaQuery(640, vw) || vw}
								height={vh}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div
					id="slidePagination"
					className="pagination_box"
				></div>
				<Progress별점박스 grade={product.gradeAverage} />
			</div>

			<div className="detail_wrapper">
				{/* 제품 제목 및 해시태그 */}
				<h2 className="product_name">{product.productName}</h2>
				<ul className="hash_tag_list">
					{product.hashtagList.map((item, index) => (
						<li
							className="hash_tag_item"
							key={index}
						>
							<button
								type="button"
								onClick={() => console.log('검색창 해시태그 전달 후 검색')}
							>
								#{item}
							</button>
						</li>
					))}
				</ul>

				{/* 브랜드 정보 */}
				<div className="brand_info_box">
					<button
						type="button"
						className="btn_brand_info"
						onClick={() => openProductDetailModal()}
					>
						<span>제품 정보 보기</span>
						<IconLinkArrow />
					</button>
					<div className="brand_info_detail">
						<div className="brand_info">
							<div className="brand_logo">
								<CustomImage
									src={product.brandImg}
									width={140}
									height={72}
								/>
							</div>
							<div className="brand_text">
								<p className="brand_name">{product.brandName}</p>
								<p className="brand_follow_count">팔로워 {product.brandFollowCnt}</p>
							</div>
						</div>
						<button
							type="button"
							className={`btn_follow ${product.brandFollowStCd !== 0 ? 'followed' : ''}`}
							onClick={() => console.log('팔로우')}
						>
							{product.brandFollowStCd !== 0 ? '팔로잉' : '팔로우'}
						</button>
					</div>
				</div>

				{/* 리뷰하기 버튼 */}
				<button
					type="button"
					className="btn_block review"
					onClick={() => console.log('리뷰하기 작성 이동')}
				>
					이 제품 리뷰하기
				</button>

				{/* 별점영역 */}
				<div className="grade_wrapper">
					<div className="total_grade_box">
						<Progress별점박스 grade={product.gradeAverage} />
						<p className="review_count">
							<IconGrade />
							<span>{product.cntReview}</span>
						</p>
					</div>
					<ul className="detail_grade_box">
						{product.productItemList.split('^').map((item, index) => (
							<li
								className="grade_option"
								key={index}
							>
								<p className="option_title">{item}</p>
								<Progress별점박스 grade={(Math.random() * 5).toFixed(1)} />
								{/* gradeArr 값 필요
                                <Progress별점박스 grade={product.gradeArr.split('^')[index]} />
                                */}
							</li>
						))}
					</ul>
				</div>

				{/* 별점 구간 별 분포도 */}
				<Wrapper별점구간별분포도
					product={product}
					reviewList={reviewList}
				/>
			</div>

			{/* 제품정보 상세 모달 */}
			<Overlay모달컨테이너
				isVisible={isProductDetailModalOn}
				aniType="slideLeft"
				onClose={closeProductDetailModal}
			>
				<div className="review_detail_popup">
					<button
						type="button"
						className="btn_close"
						onClick={closeProductDetailModal}
					>
						<IconClose fill={COLORS.GRAY5} />
					</button>
					<div className="detail_header">
						<div className="img_box">
							<CustomImage
								src={product.productImg}
								width={100}
								height={100}
							/>
						</div>
						<h2>
							<small>IVORY View</small>
							{product.productName}
						</h2>
					</div>
					<dl className="detail_wrapper">
						{product.infoSubjectList.map((subject, index) => (
							<Fragment key={index}>
								<dt>{subject}</dt>
								<dd>{product.infoContentList[index]}</dd>
							</Fragment>
						))}
					</dl>
				</div>
			</Overlay모달컨테이너>
			{/* <MockViewer
				response={product}
				dataName={'product'}
			/>
			<MockViewer
				response={reviewList}
				dataName={'reviewList'}
			/> */}
		</>
	);
};

const Wrapper별점구간별분포도 = ({ product, reviewList }) => {
	const [currentGrade, setCurrentGrade] = useState(5.0);
	const handleChangeCurrentGrade = (grade) => {
		console.log(grade);
		setCurrentGrade(parseFloat(grade));
	};

	const filteredReviewList = reviewList.filter((item) => parseFloat(item.totGrade).toFixed(1) === parseFloat(currentGrade).toFixed(1));

	return (
		<>
			<ul className="grade_graph_wrapper">
				{product.cntGradeList.map((value, index) => (
					<li
						key={index}
						className={`grade_graph_item grade_${index + 1} ${
							parseFloat(currentGrade).toFixed(1) === parseFloat(index + 1).toFixed(1) ? 'active' : ''
						}`}
					>
						<p className="value">
							{value}/<small>{product.cntReview}</small>
						</p>
						<div className="graph_background">
							<div
								className="graph_foreground"
								style={{ height: `${((value / product.cntReview) * 100).toFixed(1)}%` }}
							/>
						</div>
						<p className="grade">{parseFloat(index + 1).toFixed(1)}</p>
						<button
							type="button"
							className="btn_filter"
							onClick={() => handleChangeCurrentGrade(parseFloat(index + 1).toFixed(1))}
						>
							<IconTriangleLeft fill="#fff" />
						</button>
					</li>
				))}
			</ul>
			{/* 리뷰 리스트 */}
			<ul className="filtered_review_list">
				{filteredReviewList.length > 0 ? (
					filteredReviewList.map((review) => (
						<li
							key={review.seqNo}
							className="filtered_review_item"
						>
							<button
								type="button"
								onClick={() => console.log('리뷰상세 이동')}
							>
								<div className="img_box">
									<CustomImage
										src={review.listImg}
										width={224}
										height={172}
									/>
								</div>
								<div className="review_info_box">
									<div className="text_box">
										<p className="content">{review.sumReview}</p>
										<p className="brand_name">{review.productName}</p>
									</div>
									<div className="grade_box">
										{/* averageGrade 필요 */}
										<Progress별점박스 grade={(Math.random() * 5).toFixed(1)} />
									</div>
									<div className="profile_box">
										{/* 유저 프로필 이미지? */}
										<CustomImage
											src={review.listImg}
											width={72}
											height={72}
										/>
										{/* <IconIvory /> */}
									</div>
								</div>
							</button>
						</li>
					))
				) : (
					<li className="empty_list_box">
						<IconIvory fill={COLORS.PRIMARY} />
						<span>리뷰가 없습니다.</span>
					</li>
				)}
			</ul>
		</>
	);
};
export default ReviewProductScreen;
