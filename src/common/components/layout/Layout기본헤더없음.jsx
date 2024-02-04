import React from 'react';
import Nav하단메뉴 from '@component/frame/Nav하단메뉴';
import Header from '@component/frame/Header';

const Layout기본헤더없음 = ({ children, title, isGnb }) => {
	return (
		<>
			<div className={`page_container ${isGnb ? 'is_gnb' : ''}`}>
				<Header
					title={title}
					onlyMeta={true}
				/>
				{children}
				{isGnb && <Nav하단메뉴 />}
			</div>
		</>
	);
};

export default Layout기본헤더없음;
