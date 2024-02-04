import React from 'react';
import Service섹션헤더 from './Service섹션헤더';
import Button섹션하단블록버튼 from './Button섹션하단블록버튼';

const Service섹션영역 = ({ children, serviceName, serviceNameKor = null, blockBtnName = null, targetServiceName }) => {
	return (
		<section className={`service_section ${serviceName}`}>
			{serviceNameKor !== null && <Service섹션헤더 title={serviceNameKor} />}
			{children}
			{blockBtnName !== null && (
				<Button섹션하단블록버튼
					btnName={blockBtnName}
					targetServiceName={targetServiceName}
				/>
			)}
		</section>
	);
};

export default Service섹션영역;
