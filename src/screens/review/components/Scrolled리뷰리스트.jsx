import { uid } from 'react-uid';
import CustomImage from '@component/frame/CustomImage';
import { isEmpty } from 'lodash';
import DateUtils from '@lib/utils/date';
import Link from 'next/link';
import OPTIONS from '@constants/options';
import { When } from 'react-if';
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertNewlineToJSX } from '@toss/react';
import { useEffect } from 'react';
import Progress별점박스 from '@component/etc/Progress별점박스';

const getBabyMonth = (babyGbnCd, babyMonthArr) => {
	if (babyGbnCd === 1 || babyGbnCd === '1') {
		const babyMonth = babyMonthArr.map((bItem, index) => (index === babyMonthArr.length - 1 ? `${bItem}개월 아기 엄마` : `${bItem}개월`)).join(',');

		return babyMonth;
	}

	return babyGbnCd === -1 || babyGbnCd === '-1' ? '예비엄마' : '알 수 없음';
};

const Scrolled리뷰리스트 = ({ reviewList = [], targetId }) => {
	const handleClickFollow = () => {
		console.log('팔로우!');
	};

	const handleClickLike = () => {
		console.log('좋아요!');
	};

	//scroll spy
	useEffect(() => {
		if (targetId) {
			const targetCard = document.getElementById(`card${targetId}`);
			if (targetCard) {
				targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}, [reviewList]);

	return (
		<ul>
			{reviewList.map((review) => (
				<li
					key={uid(review)}
					id={`card${review.seqNo}`}
					style={{
						marginBottom: '10px',
						minHeight: '100px',
						padding: '20px',
						borderBottom: '1px solid lightgray',
						minWidth: '100%',
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div
							style={{
								display: 'flex',
							}}
						>
							<div className="profile_img">
								<CustomImage
									src={review?.userInfo?.userImg ?? '기본 이미지'}
									alt="프로필 이미지"
									width={100}
									height={100}
								/>
							</div>
							<div>
								<p>{isEmpty(review?.userInfo?.nickname) ? review.frcsCustNo : review?.userInfo?.nickname}</p>
								<div>{DateUtils.addDotDate(isEmpty(review.modDt) ? review.regDt : review.modDt)}</div>
								<div>{getBabyMonth(review?.userInfo?.babyGbnCd, review?.userInfo?.babyMonthArr)}</div>
							</div>
						</div>
						<div>
							<Progress별점박스 grade={Number(review.totGrade)} />
							<button
								className={review.followStCd !== 0 ? 'followed' : ''}
								onClick={handleClickFollow}
							>
								팔로우
							</button>
						</div>
					</div>
					<div>
						<h2>{review.sumReview}</h2>
						<div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<h3>{review.itemName}</h3>
								<Link href={`${OPTIONS.쇼핑몰_상품_상세_경로}?product_code=${review.refSeqNo}`}>제품 보러가기</Link>
							</div>
							<div>
								{review.itemList.map((평가_기준) => (
									<div key={uid(평가_기준)}>
										<strong>{평가_기준.item}</strong>
										<p>{평가_기준.review}</p>
										<p>{평가_기준.grade} 별표시</p>
									</div>
								))}
							</div>
							<When condition={(review.imgList || []).length > 0}>
								<Swiper initialSlide={0}>
									{review.imgList.map((리뷰_이미지, idx) => (
										<SwiperSlide key={uid(리뷰_이미지)}>
											<CustomImage
												src={리뷰_이미지}
												alt={`리뷰이미지${idx + 1}`}
												width={200}
												height={200}
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</When>
							<div>
								<button>신고하기</button>
								<button>공유하기</button>
								<button>댓글쓰기</button>
								<button onClick={handleClickLike}>좋아요</button>
							</div>
							<div>{convertNewlineToJSX(review.totReview)}</div>
							<div>
								{review.hashtagList.map((tag) => (
									<span key={uid(tag)}>#{tag}</span>
								))}
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default Scrolled리뷰리스트;
