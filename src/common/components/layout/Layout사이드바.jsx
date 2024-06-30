import React from 'react';

const Layout사이드바 = ({ children, title, titleLogo, LeftButton, RightButton, subtitle, isGnb }) => {
	return (
		<>
			<div className="sidebar_wrap">
				<div className="logo_wrap">
					<img
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_color_mid.png`}
						alt=""
					/>
				</div>
				<div className="farm_name_wrap">
					<span>딸기농장</span>
				</div>
				<ul className="menu_list_wrap">
					<li>
						<span>재배 작물 선택</span>
					</li>
					<li>
						<span>디바이스 등록</span>
					</li>
					<li>
						<span>농장 추가</span>
					</li>
					<li>
						<span>로그아웃</span>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Layout사이드바;
