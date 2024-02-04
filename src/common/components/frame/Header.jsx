import React from 'react';
import Header메타설정 from '@component/etc/Header메타설정';

const Header = ({
	title = '',
	titleLogo = null,
	classes = '',
	description = '',
	LeftButton = null,
	RightButton = null,
	onlyTitle = false,
	onlyMeta = false,
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
							{titleLogo !== null ? (
								<img
									src={process.env.NEXT_PUBLIC_BASE_PATH + titleLogo}
									alt={title}
								/>
							) : (
								<>{title}</>
							)}
						</h1>
					)}

					{RightButton && <RightButton />}
				</header>
			)}
		</>
	);
};

export default Header;
