import React, { useLayoutEffect, useRef, useState } from 'react';
import CounselingQuery from '@queries/counseling';
import { MockViewer } from '../../../mocks/utils';
import { IconClose } from '@component/icon/IconClose';
import useScroll from '@hooks/useScroll';

const Main육아상담플로팅배너 = ({ refScrollChecker, refScrollContainer }) => {
	const { data: copyright } = CounselingQuery.useCopyright({ suspense: true });
	const { bannerContent } = copyright.customerCounselingInfo;

	const [isMinimum, setIsMinimum] = useState(false); // 플로팅배너 최소화 상태

	const { scrollY } = useScroll(refScrollContainer);

	// 육아상담으로 이동
	const handleMoveCounseling = () => {
		console.log('육아상담 이동');
	};

	// 배너 최소화하기
	const handleMinimumBanner = () => {
		setIsMinimum(true);
	};

	return (
		<div className={`main_floating_counseling_box ${scrollY > refScrollChecker.current?.offsetTop ? 'visible' : ''} ${isMinimum ? 'minimum' : ''}`}>
			<button
				type="button"
				className="btn_close"
				onClick={handleMinimumBanner}
			>
				<IconClose />
			</button>
			<button
				type="button"
				className="btn_move"
				onClick={handleMoveCounseling}
			>
				<div className="text_box">
					<p className="sub_title">{bannerContent}</p>
					<p className="main_title">AI 육아 매니저 보리가 도와드릴게요!</p>
				</div>
				<div className="icon_box">
					<img
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/bitmap/icon_main_floating_bot.png`}
						alt="육아매니저 보리"
					/>
				</div>
			</button>
		</div>
	);
};

export default Main육아상담플로팅배너;
