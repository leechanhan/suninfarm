import { useState } from 'react';
import Link from 'next/link';

const Main이벤트배너영역 = () => {
	const [banners, setBanners] = useState(testBannerList); // 이벤트배너 갯수가 여러개일 수 있음

	// 이벤트 디테일로 이동
	const handleMoveToEvent = (seqNo) => {
		console.log(seqNo, '이벤트 페이지로 이동');
	};

	return (
		<div className="main_event_banner_box">
			<ul className="banner_list">
				{banners.length > 0 &&
					banners.map((banner) => (
						<li
							key={banner.seqNo}
							className="img_box"
							onClick={() => handleMoveToEvent(banner.seqNo)}
						>
							<img
								src={banner.imgUrl}
								alt={banner.eventTitle}
							/>
						</li>
					))}
			</ul>

			<Link
				className="link"
				href={''}
			>
				이벤트 전체보기
			</Link>
		</div>
	);
};

export default Main이벤트배너영역;

const testBannerList = [
	{ seqNo: 1, imgUrl: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/temp/banner01.png`, eventTitle: '카톡플친추가 이벤트' },
	{ seqNo: 2, imgUrl: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/temp/banner02.jpg`, eventTitle: '프뢰벨 무료체험 이벤트' },
];
