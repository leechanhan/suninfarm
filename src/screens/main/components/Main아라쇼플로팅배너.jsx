import React, { useState } from 'react';
import { handleParseDate } from './liveUtil';

const Main아라쇼플로팅배너 = () => {
	const [isLive, setIsLive] = useState(false); // 라이브 플로팅 데이터가 있으먼 스테이트 변경
	const { data: liveBannerData } = testdata;

	return (
		<div className={`main_livebanner_box ${isLive ? 'active' : ''}`}>
			<div className="img_box">
				<img
					src={process.env.NEXT_PUBLIC_BASE_PATH + '/images/bitmap/bg_main_floating_livebanner.gif'}
					alt="아라쇼 플로팅 배너"
				/>
			</div>
			<p className="brand">{liveBannerData.imgLiveTitle}</p>
			<p className="date">{handleParseDate(liveBannerData.imgLiveStDate)}</p>
		</div>
	);
};

export default Main아라쇼플로팅배너;

const testdata = {
	data: {
		imgLiveTitle: '브랜드명',
		imgLiveStDate: '20240124140000',
	},
};
