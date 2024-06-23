import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomAlert from '@lib/alert';
import SelectVegetablePopup from '@component/popup/SelectVegetable';

import Button팝업종료 from '@component/frame/headerBtn/Button팝업종료';
const AddFarmScreen = () => {
	const router = useRouter();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [agreeAll, setAgreeAll] = useState(false);
	const [agreeService, setAgreeService] = useState(false);
	const [agreePersnal, setAgreePersnal] = useState(false);
	const [agreeLocateInfo, setAGreeLocateInfo] = useState(false);
	const [agreeLocateService, setAgreeLocateService] = useState(false);

	const [formData, setFormData] = useState({
		id: '',
		mac: '',
		farm_nm: '',
		ssid: '',
		pw: '',
		vebetable: '',
	});

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
		CustomAlert.question({
			html: `${formData.farm_nm} 농장 추가가 되었습니다.\nAI가 추천하는 ${formData.farm_nm} 데이터를 사용할까요?`,
			callback: () => {
				openPage('/farm/list', router);
			},
		});
	};

	useEffect(() => {}, []);
	return (
		<div className="content_wrapper">
			<div className="add_farm_wrap">
				<div className="add_form_wrap">
					<div className="logo">
						<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_color_mid.png`} />
					</div>
					<span className="formTitle">Gateway 설정 정보</span>
					<input
						type="text"
						placeholder="ID"
						name="id"
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="MAC"
						name="mac"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="농장 이름 등록"
						name="farm_nm"
						onChange={handleChange}
					/>
				</div>
				<div className="add_form_wrap">
					<span className="formTitle">WI-FI 설정 정보</span>
					<input
						type="text"
						placeholder="SSID"
						name="ssid"
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="PW"
						name="pw"
						onChange={handleChange}
					/>
				</div>
				<div className="add_form_wrap">
					<span className="formTitle">재배 작물 선택</span>
					<button
						className="select_vagetable_btn"
						onClick={() => setIsPopupOpen(true)}
					>
						작물을 선택하세요
					</button>
				</div>

				<div className="add_form_wrap">
					<div className="submit_wrap">
						<button>취 소</button>
						<button onClick={() => handleSubmit()}>확 인</button>
					</div>
				</div>
				<SelectVegetablePopup
					isOpen={isPopupOpen}
					onClose={() => <Button팝업종료 popupClose={onClosePopup} />}
					title={'재배 작물 선택'}
				>
					<h2>Popup Content</h2>
					<p>This is the content of the popup.</p>
				</SelectVegetablePopup>
			</div>
		</div>
	);
};

AddFarmScreen.Layout = Layout기본헤더없음;
AddFarmScreen.headerOptions = {
	title: '',
};

AddFarmScreen.isGnb = false;
export default AddFarmScreen;
