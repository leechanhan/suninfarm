import React, { useState } from 'react';
import Service섹션영역 from './section/Service섹션영역';
import GatewayQuery from '@queries/gateway';
import { handleParseDate, handleParseDateForMonthDateDay } from './liveUtil';
import DateUtils from '@lib/utils/date';
import { useRouter } from 'next/router';
import Overlay모달컨테이너 from '@component/frame/Overlay모달컨테이너';
import { IconClose } from '@component/icon/IconClose';
import { IconAlarmFill } from '@component/icon/IconAlarmFill';
import useRouteOverlay from '@hooks/useRouteOverlay';
import CustomImage from '@component/frame/CustomImage';

const MainService아라쇼 = () => {
	const { data: nextLiveList } = GatewayQuery.useLiveShowBroadCastSchedules({ suspense: true });
	const { isOverlayActive: isLiveshowModalOn, open: openLiveshowModal, close: closeLiveshowModal } = useRouteOverlay('liveshowModal', 'on');
	const [targetLiveShow, setTargetLiveShow] = useState(null);

	// 방송중 체크
	const handleCheckLiveOn = (start, end) => {
		const nowDate = new Date();
		const startDate = new Date(DateUtils.parseForIOSDateTime(start));
		const endDate = new Date(DateUtils.parseForIOSDateTime(end));

		return nowDate > startDate && nowDate < endDate;
	};

	// 라이브 캘린더 클릭 이벤트
	const handleClickLiveCalendar = (live) => {
		/**
		 * TODO
		 * 라이브 방송 링크가 없을 때(레거시프로젝트 gbnCd '9')에도 팝업 콜
		 */
		if (handleCheckLiveOn(live.liveStDt + live.liveStTm, live.liveEndDt + live.liveEndTm)) {
			// 네이티브 새창 웹 페이지 이동
		} else {
			// 예약알림팝업
			setTargetLiveShow(live);
			openLiveshowModal();
		}
	};

	return (
		<Service섹션영역
			serviceName="liveshow"
			serviceNameKor="아이보리 라이브 쇼핑"
		>
			<div className="service_section_content">
				<h3 className="content_title">생생한 소통! 특별한 혜택!</h3>

				<div className="logo_box">
					<CustomImage
						src={process.env.NEXT_PUBLIC_BASE_PATH + '/images/bitmap/logo_liveshow.png'}
						alt="아라쇼"
						width={88}
						height={44}
					/>
				</div>

				<div className="drag_list_wrapper">
					<ul className="drag_list">
						{nextLiveList.map((live) => (
							<li
								className="drag_item"
								key={live.seqNo}
								onClick={() => handleClickLiveCalendar(live)}
							>
								<div className="img_box">
									<CustomImage
										src={live.imgUrl}
										alt={live.liveTitle}
										width={214}
										height={324}
									/>
								</div>

								<div className="text_box">
									{live.isAfter === 1 ? (
										<div className="after_box">
											<span className="sale">SALE</span>
											<span className="after_date">~ {handleParseDateForMonthDateDay(live.liveEndDt)}</span>
										</div>
									) : (
										<p className="date">{handleParseDate(live.liveStDt + live.liveStTm)}</p>
									)}
									<p className="title">{live.liveSbj}</p>
								</div>

								{handleCheckLiveOn(live.liveStDt + live.liveStTm, live.liveEndDt + live.liveEndTm) && <LiveShow라이브온 />}
							</li>
						))}
						<li className="empty_item" />
					</ul>
				</div>
			</div>
			<Overlay모달컨테이너
				isVisible={isLiveshowModalOn}
				aniType="slideUp"
				onClose={closeLiveshowModal}
			>
				<Modal알림팝업 liveShow={targetLiveShow} />
			</Overlay모달컨테이너>
		</Service섹션영역>
	);
};

export default MainService아라쇼;

const LiveShow라이브온 = () => {
	return (
		<div className="liveon_animation_box">
			{'LIVEON'.split('').map((text, i) => (
				<span
					className={`animation_key_${i + 1} ${text === 'O' ? 'left_margin' : ''}`}
					key={i}
				>
					{text}
				</span>
			))}
		</div>
	);
};

const Modal알림팝업 = ({ liveShow }) => {
	const router = useRouter();

	// 알림팝업
	const handleCallAlarm = () => {
		console.log(liveShow.seqNo, '알림 받기 로직');
	};

	return (
		<div className="liveshow_alarm_popup">
			<button
				type="button"
				className="btn_close"
				onClick={() => router.back()}
			>
				<IconClose fill="#000" />
			</button>
			<div className="popup_container">
				<h1 className="popup_title">
					<p>
						아이보리 <span>라이브쇼</span>
					</p>
				</h1>
				<div className="popup_sub_title">
					<p>
						<span>라이브를 켜라!</span>
					</p>{' '}
					스위치 ON!
				</div>
				<p className="popup_desc_1">
					<span>라이브 알림받기 예약</span>하고
					<br />
					라이브 시작알림을 받아보세요
				</p>
				<div className="popup_product_box">
					<div className="img_box">
						{liveShow && (
							<CustomImage
								src={liveShow.imgUrl}
								alt={liveShow.liveSbj}
								width={220}
								height={220}
							/>
						)}
					</div>
					<p className="date">{liveShow && `${liveShow.liveStDt.substring(4, 6)}/${liveShow.liveStDt.substring(6, 8)}`}</p>
					<p className="time">{liveShow && `${liveShow.liveStTm.substring(0, 2)}:${liveShow.liveStTm.substring(2, 4)}`}</p>
					<p className="brand_name">{liveShow && liveShow.liveSbj}</p>
				</div>
				<div className="popup_desc_2">
					{liveShow && liveShow.liveSbj}{' '}
					<p>
						<span>아라쇼 방송</span>
					</p>
					에서
					<br />
					특가로 상품 구매하기
				</div>
				<button
					type="button"
					className="popup_btn_block"
					onClick={handleCallAlarm}
				>
					<IconAlarmFill />
					<span>라이브 알림 받기</span>
				</button>
			</div>
		</div>
	);
};
