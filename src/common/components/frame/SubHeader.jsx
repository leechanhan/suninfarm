import React from 'react';
import { useRouter } from 'next/router';
const SubHeader = ({ subtitle = '' }) => {
	const router = useRouter();
	return (
		<div className="subheader_wrap">
			<img
				className="button_right"
				src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`}
				alt={subtitle}
			/>
			<button
				className="subtitle"
				onClick={() => router.back()}
			>
				{subtitle}
			</button>
		</div>
	);
};

export default SubHeader;
