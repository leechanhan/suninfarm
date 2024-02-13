import React from 'react';
import Header메타설정 from '@component/etc/Header메타설정';
import SubHeader from './SubHeader';
const Header = ({
	title = '',
	subtitle = null,
	titleLogo = null,
	classes = '',
	description = '',
	LeftButton = null,
	RightButton = null,
	onlyTitle = false,
	onlyMeta = false,
	test,
}) => {
	return (
		<>
			<Header메타설정
				title={title}
				description={description}
			/>
			{!onlyMeta && (
				<header className={`header ${classes}`}>
					{LeftButton && <LeftButton />}
					{!onlyTitle && (
						<h1 className="header_title">
							<img
								src={process.env.NEXT_PUBLIC_BASE_PATH + '/images/png/img_logo_white.png'}
								alt={title}
							/>
						</h1>
					)}

					{RightButton && <RightButton />}
				</header>
			)}
			{subtitle && <SubHeader subtitle={subtitle} />}
		</>
	);
};

export default Header;
