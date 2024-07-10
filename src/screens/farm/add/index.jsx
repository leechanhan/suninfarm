import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomAlert from '@lib/alert';
import SelectVegetablePopup from '@component/popup/SelectVegetable';
import Button팝업종료 from '@component/frame/headerBtn/Button팝업종료';
import VegetableList from '../components/VegetableList';
import CookieUtils from '@lib/utils/cookie';
import GatewayService from '@service/GatewayService';
import { vegetableArray } from '@constants/static';
vegetableArray;
const AddFarmScreen = () => {
	const router = useRouter();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [userId, setUserId] = useState('ID');
	const [formData, setFormData] = useState({
		usr_id: '',
		gtw_mac: '',
		gtw_name: '',
		gtw_addr: '',
		gtw_ssid: '',
		gtw_pw: '',
		gtw_crop: '',
	});

	const saveVegetable = (item) => {
		setSelectedItem(item);
		onClosePopup();
		console.log(item);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log('join', name, value);
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const onClosePopup = () => {
		setIsPopupOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log('11');

		if (selectedItem == null) {
			CustomAlert.error({
				html: `재배 작물을 선택해 해주세요.`,
				callback: () => {
					setIsPopupOpen(true);
				},
			});
			return;
		}
		GatewayService.postGateway(formData)
			.then((res) => {
				CustomAlert.success({
					html: `${formData.gtw_name} 농장 추가가 되었습니다.\nAI가 추천하는 데이터를 사용할까요?`,
					callback: () => {
						openPage('/farm/list', router);
					},
				});
			})
			.catch((err) => {
				CustomAlert.question({
					html: `${formData.gtw_name} 농장 추가가 되었습니다.\nAI가 추천하는 데이터를 사용할까요?`,
					callback: () => {
						openPage('/farm/list', router);
					},
				});
				console.log('gateway add err', err);
			});
	};

	useEffect(() => {
		const userId = CookieUtils.getCookie('usr_id');
		setUserId(userId);
		setFormData({
			...formData,
			['usr_id']: userId,
		});
	}, []);
	return (
		<div className="content_wrapper">
			<form
				onSubmit={handleSubmit}
				className="add_farm_wrap"
			>
				<div className="add_form_wrap">
					<div className="logo">
						<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_color_mid.png`} />
					</div>
					<span className="formTitle">Gateway 설정 정보</span>
					<input
						required
						className="userId"
						type="text"
						placeholder="ID"
						name="usr_id"
						readOnly
						value={userId}
					/>
					<input
						required
						type="password"
						placeholder="MAC"
						name="gtw_mac"
						onChange={handleChange}
					/>
					<input
						required
						type="text"
						placeholder="농장 이름 등록"
						name="gtw_name"
						onChange={handleChange}
					/>
					<input
						required
						type="text"
						placeholder="농장 주소 등록"
						name="gtw_addr"
						onChange={handleChange}
					/>
					<input
						type="hidden"
						required
						name="gtw_crop"
						value={selectedItem?.no}
					/>
				</div>
				<div className="add_form_wrap">
					<span className="formTitle">WI-FI 설정 정보</span>
					<input
						required
						type="text"
						placeholder="SSID"
						name="gtw_ssid"
						onChange={handleChange}
					/>
					<input
						required
						type="password"
						placeholder="PW"
						name="gtw_pw"
						onChange={handleChange}
					/>
				</div>
				<div className="add_form_wrap">
					<span className="formTitle">재배 작물 선택</span>
					<span
						className="select_vagetable_btn"
						onClick={() => setIsPopupOpen(true)}
					>
						{selectedItem == null ? '작물을 선택하세요.' : selectedItem.name}
					</span>
				</div>
				<div className="add_form_wrap">
					<div className="submit_wrap">
						<button onClick={() => router.back()}>취 소</button>
						<button type="submit">확 인</button>
					</div>
				</div>
				<SelectVegetablePopup
					isOpen={isPopupOpen}
					onClose={() => <Button팝업종료 popupClose={onClosePopup} />}
					title={'재배 작물 선택'}
				>
					<VegetableList
						onSelectItem={saveVegetable}
						onClose={() => <Button팝업종료 popupClose={onClosePopup} />}
					/>
				</SelectVegetablePopup>
			</form>
		</div>
	);
};

AddFarmScreen.Layout = Layout기본헤더없음;
AddFarmScreen.headerOptions = {
	title: '',
};

AddFarmScreen.isGnb = false;
export default AddFarmScreen;
