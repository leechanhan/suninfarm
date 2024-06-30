import React, { useState } from 'react';
import Nav하단메뉴 from '@component/frame/Nav하단메뉴';
import Header from '@component/frame/Header';
import Button메뉴 from '@component/frame/headerBtn/Button메뉴';
import Button알림 from '@component/frame/headerBtn/Button알림';
import useRouteOverlay from '@hooks/useRouteOverlay';
import Overlay모달컨테이너 from '../frame/Overlay모달컨테이너';
import Layout사이드바 from '../layout/Layout사이드바';
const Layout메인헤더 = ({ children, title, isGnb }) => {
	const openSidebar = () => {
		setIsShowModalOn(true);
	};
	const { open, close, isOverlayActive } = useRouteOverlay('recommender', 'on');
	const [isShowModalOn, setIsShowModalOn] = useState(false);
	return (
		<>
			<Overlay모달컨테이너
				isVisible={isOverlayActive}
				onClose={close}
				aniType="slideRight"
			>
				<Layout사이드바 />
			</Overlay모달컨테이너>

			<div className={`page_container ${isGnb ? 'is_gnb' : ''}`}>
				<header className={`header main_header`}>
					<Button메뉴 onOpen={open} />
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
