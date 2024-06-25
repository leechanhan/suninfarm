import React from 'react';
import { IconGnbCommunity } from '@component/icon/IconGnbCommunity';
import { IconGnbHome } from '@component/icon/IconGnbHome';
import { IconGnbMypage } from '@component/icon/IconGnbMypage';
import { IconGnbPcc } from '@component/icon/IconGnbPcc';
import { IconGnbStore } from '@component/icon/IconGnbStore';
import AndroidUtils from '@lib/utils/android';
import NativeBridge from '@lib/mobile/bridge';
import CustomAlert from '@lib/alert';
import { useRouter } from 'next/router';

const Nav하단메뉴 = () => {
	const router = useRouter();
	const handlerNavigation = (routerName) => {
		router.push(routerName);
	};

	const handlerLogout = (url = '', isOuterLink = false) => {
		CustomAlert.question({ html: '로그아웃 하시겠습니까?', callback: () => {} });
	};

	const icons = [
		{ icon: <IconGnbHome />, text: '홈', func: () => handlerNavigation('/farm/detail') },
		{ icon: <IconGnbPcc />, text: '농장선택', func: () => handlerNavigation('/farm/list') },
		{ icon: <IconGnbCommunity />, text: '조명제어', func: () => handlerNavigation('/light/list') },
		{ icon: <IconGnbStore />, text: '기록', func: () => handlerNavigation('/history/list') },
		{ icon: <IconGnbMypage />, text: '기타제어', func: () => handlerNavigation('/setting/list') },
	];
	return (
		<>
			<nav className="gnb_container">
				<ul>
					{icons.map((icon) => {
						return (
							<li key={icon.text}>
								<button
									type="button"
									onClick={icon.func}
								>
									<div className="icon_box">{icon.icon}</div>
									<span className="icon_text">{icon.text}</span>
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
};

export default Nav하단메뉴;
