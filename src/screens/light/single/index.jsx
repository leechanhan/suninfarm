import Header from '@component/frame/Header';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import Layout메인헤더 from '@component/layout/Layout메인헤더';
import CustomAlert from '@lib/alert';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import LightService from '@service/LightService';
const LightScreen = ({ farmName = '딸기농장' }) => {
	const CHANNEL_CNT = 3;
	const router = useRouter();

	const [lightInfo, setLightInfo] = useState(router?.query);
	const [masterDiming, setMasterDiming] = useState(0);

	const handlerDeleteDevice = (name) => {
		CustomAlert.warning({ html: `${name}을 삭제하시겠습니까?`, callback: () => {} });
	};
	const updateLightDiming = useCallback(
		debounce((data) => {
			LightService.putLightInfo(lightInfo)
				.then((res) => {
					console.log('putLightInfo', res);
				})
				.catch((err) => {
					console.log('putLightInfo err', err);
				});
		}, 1300),
		[],
	);

	const handleMasterDiming = (value) => {
		setLightInfo((prevValues) => {
			const newValues = { ...prevValues }; // 기존 값을 복사하여 새 객체 생성

			console.log('123');
			newValues.ctr_ch1val = Number(value);
			newValues.ctr_ch2val = Number(value);
			newValues.ctr_ch3val = Number(value);

			return newValues;
		});

		setMasterDiming(value);
		updateLightDiming();
	};

	const handleDimingWhite = (value) => {
		setLightInfo((prevValues) => {
			const newValues = { ...prevValues };
			newValues.ctr_ch1val = Number(value);
			updateLightDiming();
			return newValues;
		});
	};

	const handleDimingRed = (value) => {
		setLightInfo((prevValues) => {
			const newValues = { ...prevValues };
			newValues.ctr_ch2val = Number(value);
			updateLightDiming();
			return newValues;
		});
	};

	const handleDimingBlue = (value) => {
		setLightInfo((prevValues) => {
			const newValues = { ...prevValues };
			newValues.ctr_ch3val = Number(value);
			updateLightDiming();
			return newValues;
		});
	};

	useEffect(() => {
		const { query } = router;
	}, []);

	return (
		<div className="content_wrapper">
			<div className="page_container_gray">
				<Header
					classes="nonPadding bg_gray"
					title={farmName}
					LeftButton={() => <Button뒤로가기 />}
				/>
				{lightInfo && (
					<div className="light_info_wrap">
						<ul className="light_list_wrap">
							<div className="light_title">{lightInfo.ctr_name}</div>
							<li className="light_item">
								<span className="light_value">{masterDiming}%</span>
								<div className="ui_wrap">
									<span className="label_total">Total</span>
									<input
										className="light_progress total"
										type="range"
										min="0"
										max="100"
										value={masterDiming}
										onChange={(e) => handleMasterDiming(e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<div className="light_divider"></div>
							<li className="light_item">
								<span className="light_value">{lightInfo.ctr_ch1val}%</span>
								<div className="ui_wrap">
									<span className="label_white">W</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={lightInfo.ctr_ch1val}
										onChange={(e) => handleDimingWhite(e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo.ctr_ch2val}%</span>
								<div className="ui_wrap">
									<span className="label_red">R</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={lightInfo.ctr_ch2val}
										onChange={(e) => handleDimingRed(e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo.ctr_ch3val}%</span>
								<div className="ui_wrap">
									<span className="label_blue">B</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={lightInfo.ctr_ch3val}
										onChange={(e) => handleDimingBlue(e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

LightScreen.Layout = Layout메인헤더;
LightScreen.isGnb = true;
LightScreen.pageName = '조명제어';
export default LightScreen;
