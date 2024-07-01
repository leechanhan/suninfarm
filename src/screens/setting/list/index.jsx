import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout메인헤더 from '@component/layout/Layout메인헤더';
import Menu from '@component/frame/headerBtn/Menu';
import Swal from 'sweetalert2';
import CustomAlert from '@lib/alert';
import { useState } from 'react';
import Header from '@component/frame/Header';
import CustomForms from '@component/etc/CustomForms';
const SettingScreen = ({ farmName = '딸기농장' }) => {
	const handlerTest = () => {
		Swal.fire({
			icon: 'warning',
			title: '안내',
			text: `서비스 준비중입니다.`,
			confirmButtonText: '확인',
		}).then((res) => {});
	};

	const handlerDeleteDevice = (name) => {
		CustomAlert.warning({ html: `${name}을 삭제하시겠습니까?`, callback: () => {} });
	};
	const handlerRegisterDevice = (name) => {
		CustomAlert.info({ html: `${name}을 등록하시겠습니까?`, callback: () => {} });
	};

	return (
		<div className="content_wrapper">
			<div className="page_container_gray">
				<Header
					classes="nonPadding bg_gray"
					title={farmName}
					LeftButton={() => <Button뒤로가기 />}
				/>
				<div className="setting_info_wrap">
					<div className="setting_tab_indicator_wrap">
						<span className="active">양액공급</span>
						<span>냉난방</span>
						<span>교반기/환기팬</span>
						<span>유동팬</span>
					</div>
					<div className="setting_tab_wrap">
						<div className="setting_title_wrap">
							<span className="setting_title">양액 공급 시간</span>
						</div>
						<div className="water_time_wrap">
							<div className="water_time_item">
								<p className="area">1구역 공급시간</p>
								<p className="time">00:00:00</p>
							</div>
							<div className="water_time_item">
								<p className="area">2구역 공급시간</p>
								<p className="time">00:00:00</p>
							</div>
						</div>
						<div className="add_water_time_wrap">
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

SettingScreen.Layout = Layout메인헤더;
SettingScreen.isGnb = true;
export default SettingScreen;
