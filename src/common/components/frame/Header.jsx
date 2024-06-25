import React from 'react';
const Header = ({ title = '', classes = '', LeftButton = null, RightButton = null }) => {
	return (
		<>
			{title && (
				<>
					<header className={`header ${classes}`}>
						{LeftButton && <LeftButton />}
						<h1 className="header_title">{/* <>{title}</> */}</h1>
						{RightButton && <RightButton />}
					</header>
				</>
			)}
		</>
	);
};

export default Header;
