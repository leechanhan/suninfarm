import React from 'react';
import Service섹션영역 from './section/Service섹션영역';
import GatewayQuery from '@queries/gateway';
import CustomImage from '@component/frame/CustomImage';

const MainService육아정보 = () => {
	const { data: tipResult } = GatewayQuery.useBebeTips({ suspense: true });
	const tipList = tipResult.data.result;
	console.log(tipList);

	const handleMoveTipDetail = (seqNo) => {
		console.log(seqNo);
	};

	return (
		<Service섹션영역
			serviceName="tip"
			serviceNameKor="아이보리 육아정보"
			blockBtnName="육아정보 더보기"
			targetServiceName="tip"
		>
			<div className="service_section_content">
				<h3 className="content_title">{'이용자닉네임'}님을 위한 꿀TIP!</h3>

				<p className="content_sub_title">출산 후 궁금했던 정보, 지금 확인해보세요!</p>

				<div className="drag_list_wrapper">
					<ul className="drag_list">
						{tipList.map((tip) => (
							<li
								key={tip.tipSeqNo}
								className="drag_item"
								onClick={() => handleMoveTipDetail(tip.tipSeqNo)}
							>
								<div className="img_box">
									<CustomImage
										src={tip.thumbImgLink}
										width={256}
										height={256}
										alt={tip.tipNm}
									/>
								</div>
								<p className="text_box">{tip.tipNm}</p>
							</li>
						))}
						<li className="empty_item" />
					</ul>
				</div>
			</div>
		</Service섹션영역>
	);
};

export default MainService육아정보;
