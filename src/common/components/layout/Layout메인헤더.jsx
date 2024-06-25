import React from 'react';
import Nav하단메뉴 from '@component/frame/Nav하단메뉴';
import Header from '@component/frame/Header';
import Button메뉴 from '@component/frame/headerBtn/Button메뉴';
import Button알림 from '@component/frame/headerBtn/Button알림';
const Layout메인헤더 = ({ children, title, isGnb }) => {
	return (
		<>
			<div className={`page_container ${isGnb ? 'is_gnb' : ''}`}>
				<header className={`header main_header`}>
					<Button메뉴 />
					<img
						className="logo"
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_only.png`}
						alt=""
					/>
					<Button알림 />
				</header>
				{children}
				{isGnb && <Nav하단메뉴 />}
			</div>
		</>
	);
};
export default Layout메인헤더;
