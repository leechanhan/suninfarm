import { IconLinkArrow } from '@component/icon/IconLinkArrow';
import { useRouter } from 'next/router';
import React from 'react';

const Button섹션하단블록버튼 = ({ btnName, targetServiceName }) => {
	const router = useRouter();
	// 해당 서비스 이동
	const handleMoveService = () => {
		router.push(targetServiceName);
	};
	return (
		<button
			type="button"
			className="service_section_btn_block"
			onClick={handleMoveService}
		>
			<span>
				{btnName} <IconLinkArrow />
			</span>
		</button>
	);
};

export default Button섹션하단블록버튼;
