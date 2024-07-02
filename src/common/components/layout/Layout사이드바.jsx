import CustomAlert from '@lib/alert';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';

const Layout사이드바 = ({ onClose }) => {
	const router = useRouter();
	const handleLogout = (event) => {
		onClose();
		CustomAlert.question({
			html: `로그아웃 하시겠습니까?`,
			callback: () => {
				openPage('/login', router);
			},
		});
	};

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
					<li onClick={() => router.push('/farm/detail')}>
						<span>재배 작물 선택</span>
					</li>
					<li onClick={() => router.push('/device/list')}>
						<span>디바이스 등록</span>
					</li>
					<li onClick={() => router.push('/farm/add')}>
						<span>농장 추가</span>
					</li>
					<li onClick={handleLogout}>
						<span>로그아웃</span>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Layout사이드바;
