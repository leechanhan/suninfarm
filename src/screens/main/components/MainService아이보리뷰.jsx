import React from 'react';
import Service섹션영역 from './section/Service섹션영역';

const MainService아이보리뷰 = () => {
	return (
		<Service섹션영역
			serviceName="review"
			serviceNameKor="아이보리뷰"
			blockBtnName="리뷰페이지 바로가기"
			targetServiceName="/review/list"
		>
			아이보리뷰
		</Service섹션영역>
	);
};

export default MainService아이보리뷰;
