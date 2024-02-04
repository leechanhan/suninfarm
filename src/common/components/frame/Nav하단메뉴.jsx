import React from 'react';
import { IconGnbCommunity } from '@component/icon/IconGnbCommunity';
import { IconGnbHome } from '@component/icon/IconGnbHome';
import { IconGnbMypage } from '@component/icon/IconGnbMypage';
import { IconGnbPcc } from '@component/icon/IconGnbPcc';
import { IconGnbStore } from '@component/icon/IconGnbStore';
import AndroidUtils from '@lib/utils/android';
import NativeBridge from '@lib/mobile/bridge';

const Nav하단메뉴 = () => {
	const moveIvoryLink = (url = '', isOuterLink = false) => {
		if (isOuterLink) {
			location.href = url;
		} else {
			// location.href = process.env.NEXT_PUBLIC_DOMAIN + '' + url;
			location.href = url;
		}
	};
	const ivoryOpenLinkExternally = (url, headerType) => {
		const UserAgent = navigator.userAgent;
		if (UserAgent.indexOf('ivory_3.0') === -1) {
			location.href = url;
			return;
		}

		if (AndroidUtils.isAndroidDevice()) {
			NativeBridge.openNewLink(url, headerType);
			window?.Android?.echossOpenLinkExternally(url, headerType);
		} else {
			const nativeParam = {};
			nativeParam.url = url;
			nativeParam.screenType = 'full'; /* modal or full*/
			nativeParam.headerType = 'show'; /* hide or show */
			nativeParam.naviType = 'hide'; /* hide or show */

			window?.webkit?.messageHandlers?.openLinkExternally?.postMessage(nativeParam);
		}
	};

	const icons = [
		{ icon: <IconGnbHome />, text: '홈', func: () => moveIvoryLink('/') },
		{ icon: <IconGnbPcc />, text: '서브테스트', func: () => moveIvoryLink('/test') }, // 서브헤더 테스트 페이지
		// { icon: <IconGnbPcc />, text: '산후조리원', func: () => moveIvoryLink('/review/pccList.do') },
		{ icon: <IconGnbCommunity />, text: '커뮤니티', func: () => moveIvoryLink('/community') },
		{ icon: <IconGnbStore />, text: '스토어', func: () => ivoryOpenLinkExternally('https://m.i-vory.shop', 'hide') },
		{ icon: <IconGnbMypage />, text: '마이페이지', func: () => moveIvoryLink('/customers/mypage.do') },
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
