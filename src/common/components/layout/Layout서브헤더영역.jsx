import React from 'react';
import Header from '@component/frame/Header';
import Nav하단메뉴 from '@component/frame/Nav하단메뉴';

const Layout서브헤더영역 = ({ children, title, titleLogo, LeftButton, RightButton, subtitle, isGnb }) => {
	return (
		<>
			<div className={`page_container ${isGnb ? 'is_gnb' : ''}`}>
				<Header
					title={title}
					titleLogo={titleLogo}
					LeftButton={LeftButton}
					RightButton={RightButton}
					subtitle={subtitle}
				/>
				{children}
				{isGnb && <Nav하단메뉴 />}
			</div>
		</>
	);
};

export default Layout서브헤더영역;
