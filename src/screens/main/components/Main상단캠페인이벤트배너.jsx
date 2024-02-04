import React from 'react';
import { jsMediaQuery } from '@lib/function/util';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowSize from '@lib/hooks/windowSize';

/**
 * TODO
 * slide 2개 일 때 dulicate 되지 않는 문제
 * slide 1개 일 때 loop 옵션 컨트롤 되지 않는 문제
 */
const testSwiperLength = 3;

const Main상단캠페인이벤트배너 = () => {
	const { vw } = useWindowSize();

	const swiperLength = testSwiperLength; // 슬라이드 개수

	return (
		<div className="main_top_campaign_box">
			<Swiper
				spaceBetween={jsMediaQuery(20, vw)}
				centeredSlides={true}
				slidesPerView={1}
				loop
			>
				{[...Array(swiperLength)].map((_, i) => (
					<SwiperSlide key={i}>
						<div
							className="item_box"
							style={{
								backgroundColor: `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(
									Math.random() * 255,
								)},${Math.random().toFixed(1)})`,
								fontSize: '10em',
							}}
						>
							test {i + 1}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Main상단캠페인이벤트배너;
