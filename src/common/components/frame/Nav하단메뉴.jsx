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
import CookieUtils from '@lib/utils/cookie';
const Nav하단메뉴 = ({ pageName }) => {
	const [iconArray, setIconArray] = useState({ 홈: false, 농장선택: false, 조명제어: false, 기록: false, 기타제어: false });
	const [prevActivePage, setPrevActivePage] = useState('홈');
	const router = useRouter();

	const handlerNavigation = (routerName, name) => {
		router.push(routerName);
		const prevPage = prevActivePage;
		setIconArray((prevState) => ({ ...prevState, [prevPage]: false }));
		setPrevActivePage(name);
		setIconArray((prevState) => ({ ...prevState, [name]: true }));
		console.log(iconArray);
	};

	useEffect(() => {
		console.log(iconArray);
		if (pageName !== '') {
			setIconArray((prevState) => ({ ...prevState, [pageName]: true }));
		}
	}, []);

	return (
		<>
			<nav className="gnb_container">
				<ul>
					{/* {icons.map((icon) => {
						return (
							<li key={icon.text}>
								<button
									type="button"
									onClick={icon.func}
								>
									<div className="icon_box">{icon.icon}</div>
								<span className={iconArray['홈'] ? 'icon_text_active' : 'icon_text'}>{icon.text}</span>
								</button>
							</li>
						);
					})} */}
					<li key={'홈'}>
						<button
							type="button"
							onClick={() => handlerNavigation('/farm/detail', '홈')}
						>
							<div className="icon_box">
								<img
									className="icon mid"
									src={
										iconArray['홈']
											? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_color_home.png`
											: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_home.png`
									}
								/>
							</div>
							<span className={iconArray['홈'] ? 'icon_text_active' : 'icon_text'}>{'홈'}</span>
						</button>
					</li>
					<li key={'농장선택'}>
						<button
							type="button"
							onClick={() => handlerNavigation('/farm/list', '농장선택')}
						>
							<div className="icon_box">
								<img
									className="icon mid"
									src={
										iconArray['농장선택']
											? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_select_color_farm.png`
											: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_select_farm.png`
									}
								/>
							</div>
							<span className={iconArray['농장선택'] ? 'icon_text_active' : 'icon_text'}>{'농장선택'}</span>
						</button>
					</li>
					<li key={'조명제어'}>
						<button
							type="button"
							onClick={() => handlerNavigation('/light/list', '조명제어')}
						>
							<div className="icon_box">
								<img
									className="icon mid"
									src={
										iconArray['조명제어']
											? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_color_light.png`
											: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_light.png`
									}
								/>
							</div>
							<span className={iconArray['조명제어'] ? 'icon_text_active' : 'icon_text'}>{'조명제어'}</span>
						</button>
					</li>
					<li key={'기록'}>
						<button
							type="button"
							onClick={() => handlerNavigation('/history/list', '기록')}
						>
							<div className="icon_box">
								<img
									className="icon mid"
									src={
										iconArray['기록']
											? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_color_history.png`
											: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_history.png`
									}
								/>
							</div>
							<span className={iconArray['기록'] ? 'icon_text_active' : 'icon_text'}>{'기록'}</span>
						</button>
					</li>
					<li key={'기타제어'}>
						<button
							type="button"
							onClick={() => handlerNavigation('/setting/list', '기타제어')}
						>
							<div className="icon_box">
								<img
									className="icon mid"
									src={
										iconArray['기타제어']
											? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_color_setting.png`
											: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/gnb/icon_nav_setting.png`
									}
								/>
							</div>
							<span className={iconArray['기타제어'] ? 'icon_text_active' : 'icon_text'}>{'기타제어'}</span>
						</button>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Nav하단메뉴;
