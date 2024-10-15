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
	const [lightKey, setLightKey] = useState({});

	const handlerDeleteDevice = (name) => {
		CustomAlert.warning({ html: `${name}을 삭제하시겠습니까?`, callback: () => {} });
	};
	const putLightInfo = () => {
		const data = Object.assign({}, lightKey, lightInfo);
		console.log('Merged State:', data);
		LightService.putLightInfo(data)
			.then((res) => {
				if (res.result === 'success') {
					console.log('조명 설정 완료');
				} else {
					console.log('조명 설정 실패', res?.reason);
				}
			})
			.catch((err) => {
				console.log('putLightInfo err', err);
				console.log('조명 설정 실패');
			});
	};

	const handleMasterDiming = (value) => {
		setMasterDiming(value);
	};

	const handleDragEndTotal = (value) => {
		console.log('handleDragEndTotal1');
		setLightInfo((prevValues) => {
			const newValues = { ...prevValues };
			newValues.ctr_ch1val = value;
			newValues.ctr_ch2val = value;
			newValues.ctr_ch3val = value;
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	useEffect(() => {
		// console.log('handleDragEndTotal2', lightInfo);
		//putLightInfo();
	}, [lightInfo]);
	// 디바운스된 putLightInfo 함수
	const debouncedPutLightInfo = useCallback(
		debounce((updatedLightInfo) => {
			const data = Object.assign({}, lightKey, updatedLightInfo);
			LightService.putLightInfo(data)
				.then((res) => {
					if (res.result === 'success') {
						console.log('조명 설정 완료');
					} else {
						console.log('조명 설정 실패', res?.reason);
					}
				})
				.catch((err) => {
					console.log('putLightInfo err', err);
					console.log('조명 설정 실패');
				});
		}, 500),
		[],
	);

	// handleDimingWhite에서 상태 업데이트 후 디바운스 호출
	const handleDimingWhite = (value) => {
		setLightInfo((prevValues) => {
			const newValues = { ...prevValues };
			newValues.ctr_ch1val = value;
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	// handleDimingRed에서 상태 업데이트 후 디바운스 호출
	const handleDimingRed = (value) => {
		setLightInfo((prevValues) => {
			const newValues = { ...prevValues };
			newValues.ctr_ch2val = value;
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	// handleDimingBlue에서 상태 업데이트 후 디바운스 호출
	const handleDimingBlue = (value) => {
		setLightInfo((prevValues) => {
			const newValues = { ...prevValues };
			newValues.ctr_ch3val = value;
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};
	// 상태 값이 업데이트될 때마다 debounced 함수 호출
	//	useEffect(() => {
	// 	updateLightDiming(lightInfo);
	//}, [lightInfo, updateLightDiming]); // lightInfo가 변경될 때마다 호출

	const handleDragEndWhite = () => {
		console.log('handleDragEndWhite');
	};

	const handleDragEndRed = () => {
		console.log('handleDragEndRed');
	};

	const handleDragEndBlue = () => {
		console.log('handleDragEndBlue');
	};

	useEffect(() => {
		// 현재 URL의 쿼리 스트링을 가져옴
		const queryParams = new URLSearchParams(window.location.search);
		const ctr_ieee = queryParams.get('ctr_ieee');
		const gtw_id = queryParams.get('gtw_id');
		setLightKey({ ctr_ieee, gtw_id });
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
										onMouseUp={(e) => handleDragEndTotal(e.target.value)}
										onTouchEnd={(e) => handleDragEndTotal(e.target.value)}
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
										onMouseUp={(e) => handleDragEndWhite(e.target.value)}
										onTouchEnd={(e) => handleDragEndWhite(e.target.value)}
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
										onMouseUp={(e) => handleDragEndRed(e.target.value)}
										onTouchEnd={(e) => handleDragEndRed(e.target.value)}
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
										onMouseUp={(e) => handleDragEndBlue(e.target.value)}
										onTouchEnd={(e) => handleDragEndBlue(e.target.value)}
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
