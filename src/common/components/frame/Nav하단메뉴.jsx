import React, { useEffect, useState } from 'react';
import { IconGnbCommunity } from '@component/icon/IconGnbCommunity';
import { IconGnbHome } from '@component/icon/IconGnbHome';
import { IconGnbMypage } from '@component/icon/IconGnbMypage';
import { IconGnbPcc } from '@component/icon/IconGnbPcc';
import { IconGnbStore } from '@component/icon/IconGnbStore';
import AndroidUtils from '@lib/utils/android';
import NativeBridge from '@lib/mobile/bridge';
import CustomAlert from '@lib/alert';
import { useRouter } from 'next/router';
import next from 'next';

const Nav하단메뉴 = () => {
	const [iconActiveArray, setIconActiveArray] = useState({
		'/farm/detail': false,
		'/farm/list': false,
		'/light/list': false,
		'/history/list': false,
		'/setting/list': false,
	});

	const router = useRouter();
	const handlerNavigation = (routerName) => {
		const nowPath = router.pathname;
		const nextPath = routerName;

		if (nowPath === nextPath) {
			return false;
		}

		setIconActiveArray((prev) => ({
			...prev,
			[routerName]: !prev[routerName],
			[nowPath]: !prev[routerName],
		}));
		//console.log(router.pathname);
		//console.log(routerName);

		router.push(routerName);
	};
	useEffect(() => {
		//console.log('123', iconActiveArray);
	}, [iconActiveArray]);
	// /farm/detail
	// /light/list
	// /farm/list
	// /farm/detail
	// /setting/list

	const handlerLogout = (url = '', isOuterLink = false) => {
		CustomAlert.question({ html: '로그아웃 하시겠습니까?', callback: () => {} });
	};

	const icons = [
		{ icon: <IconGnbHome activeVal={iconActiveArray} />, text: '홈', func: () => handlerNavigation('/farm/detail') },
		{ icon: <IconGnbPcc activeVal={iconActiveArray} />, text: '농장선택', func: () => handlerNavigation('/farm/list') },
		{ icon: <IconGnbCommunity activeVal={iconActiveArray} />, text: '조명제어', func: () => handlerNavigation('/light/list') },
		{ icon: <IconGnbStore activeVal={iconActiveArray} />, text: '기록', func: () => handlerNavigation('/history/list') },
		{ icon: <IconGnbMypage activeVal={iconActiveArray} />, text: '기타제어', func: () => handlerNavigation('/setting/list') },
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
