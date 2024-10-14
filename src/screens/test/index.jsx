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

const TestIndexScreen = () => {
	const CHANNEL_CNT = 3;
	const router = useRouter();
	const [lightInfo1, setLightInfo1] = useState({});
	const [lightInfo2, setLightInfo2] = useState({});
	const [lightInfo3, setLightInfo3] = useState({});

	const [lightInfo, setLightInfo] = useState(router?.query);

	const [masterDiming1, setMasterDiming1] = useState(0);
	const [masterDiming2, setMasterDiming2] = useState(0);
	const [masterDiming3, setMasterDiming3] = useState(0);

	const [lightKey, setLightKey] = useState({});

	useEffect(() => {
		LightService.getTestLight()
			.then((res) => {
				console.log('getTestLight', res);
				// 각 ieee 값으로 객체를 찾고 변수에 저장
				const lightInfo1 = findLightInfoByIeee('B43A31FFFE000001', res.ch_list.ch_item);
				const lightInfo2 = findLightInfoByIeee('B43A31FFFE000002', res.ch_list.ch_item);
				const lightInfo3 = findLightInfoByIeee('B43A31FFFE000003', res.ch_list.ch_item);

				setLightInfo1(lightInfo1);
				setLightInfo2(lightInfo2);
				setLightInfo3(lightInfo3);
			})
			.catch((err) => {
				console.log('getTestLight', err);
			});
	}, []);

	// 특정 ieee 값에 맞는 객체를 찾아주는 함수
	function findLightInfoByIeee(ieeeValue, responseArray) {
		return responseArray.find((item) => item.ieee === ieeeValue);
	}

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

	const handleMasterDiming1 = (value) => {
		setMasterDiming1(value);
	};

	const handleMasterDiming2 = (value) => {
		setMasterDiming2(value);
	};

	const handleMasterDiming3 = (value) => {
		setMasterDiming3(value);
	};

	const handleDragEndTotalG1 = (value) => {
		console.log('handleDragEndTotalG1');
		setLightInfo1((prevValues) => {
			const newValues = { ...prevValues };
			newValues.val1 = Number(value);
			newValues.val2 = Number(value);
			newValues.val3 = Number(value);
			newValues.val4 = Number(value);
			newValues.val5 = Number(value);
			newValues.val6 = Number(value);
			newValues.val = Number(value);
			debouncedPutLightGroupInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};
	const handleDragEndTotalG2 = (value) => {
		console.log('handleDragEndTotalG2');
		setLightInfo2((prevValues) => {
			const newValues = { ...prevValues };
			newValues.val1 = Number(value);
			newValues.val2 = Number(value);
			newValues.val3 = Number(value);
			newValues.val4 = Number(value);
			newValues.val5 = Number(value);
			newValues.val6 = Number(value);
			newValues.val = Number(value);
			debouncedPutLightGroupInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	const handleDragEndTotalG3 = (value) => {
		console.log('handleDragEndTotalG3');
		setLightInfo3((prevValues) => {
			const newValues = { ...prevValues };
			newValues.val1 = Number(value);
			newValues.val2 = Number(value);
			newValues.val3 = Number(value);
			newValues.val4 = Number(value);
			newValues.val5 = Number(value);
			newValues.val6 = Number(value);
			newValues.val = Number(value);
			debouncedPutLightGroupInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	useEffect(() => {
		// console.log('handleDragEndTotal2', lightInfo);
		//putLightInfo();
	}, [lightInfo]);
	// 디바운스된 putLightInfo 함수
	const debouncedPutLightGroupInfo = useCallback(
		debounce((updatedLightInfo) => {
			console.log();
			LightService.putTestLightGroup(updatedLightInfo)
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

	const debouncedPutLightInfo = useCallback(
		debounce((updatedLightInfo) => {
			console.log(updatedLightInfo);
			// LightService.putTestLight(updatedLightInfo)
			// 	.then((res) => {
			// 		if (res.result === 'success') {
			// 			console.log('조명 설정 완료');
			// 		} else {
			// 			console.log('조명 설정 실패', res?.reason);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log('putLightInfo err', err);
			// 		console.log('조명 설정 실패');
			// 	});
		}, 500),
		[],
	);
	// handleDimingWhite에서 상태 업데이트 후 디바운스 호출
	const handleDimingLight1 = (key, value) => {
		setLightInfo1((prevValues) => {
			const newValues = { ...prevValues };
			newValues[key] = Number(value);
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	// handleDimingRed에서 상태 업데이트 후 디바운스 호출
	const handleDimingLight2 = (key, value) => {
		setLightInfo2((prevValues) => {
			const newValues = { ...prevValues };
			newValues[key] = Number(value);
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	// handleDimingBlue에서 상태 업데이트 후 디바운스 호출
	const handleDimingLight3 = (key, value) => {
		setLightInfo3((prevValues) => {
			const newValues = { ...prevValues };
			newValues[key] = Number(value);
			debouncedPutLightInfo(newValues); // 최신 값으로 디바운스 호출
			return newValues;
		});
	};

	// 상태 값이 업데이트될 때마다 debounced 함수 호출
	//	useEffect(() => {
	// 	updateLightDiming(lightInfo);
	//}, [lightInfo, updateLightDiming]); // lightInfo가 변경될 때마다 호출

	const handleDragEndCh1 = () => {
		console.log('handleDragEndCh1');
	};

	const handleDragEndCh2 = () => {
		console.log('handleDragEndCh2');
	};
	const handleDragEndCh3 = () => {
		console.log('handleDragEndCh3');
	};
	const handleDragEndCh4 = () => {
		console.log('handleDragEndCh4');
	};
	const handleDragEndCh5 = () => {
		console.log('handleDragEndCh5');
	};
	const handleDragEndCh6 = () => {
		console.log('handleDragEndCh6');
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
					title={'개별 조명 제어'}
					LeftButton={() => <Button뒤로가기 />}
				/>
				{lightInfo && (
					<div className="light_info_wrap">
						<ul className="light_list_wrap">
							<div className="light_title">{lightInfo.ctr_name}</div>
							<li className="light_item">
								<span className="light_value">{masterDiming1}%</span>
								<div className="ui_wrap">
									<span className="label_blue">그룹1</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={masterDiming1}
										onMouseUp={(e) => handleDragEndTotalG1(e.target.value)}
										onTouchEnd={(e) => handleDragEndTotalG1(e.target.value)}
										onChange={(e) => handleMasterDiming1(e.target.value)}
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
								<span className="light_value">{lightInfo1.val1}%</span>
								<div className="ui_wrap">
									<span className="label_blue">CH1</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={lightInfo1.val1}
										onMouseUp={(e) => handleDragEndCh1(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh1(e.target.value)}
										onChange={(e) => handleDimingLight1('val1', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo1.val2}%</span>
								<div className="ui_wrap">
									<span className="label_blue">CH2</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={lightInfo1.val2}
										onMouseUp={(e) => handleDragEndCh2(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh2(e.target.value)}
										onChange={(e) => handleDimingLight1('val2', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo1.val3}%</span>
								<div className="ui_wrap">
									<span className="label_blue">CH3</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={lightInfo1.val3}
										onMouseUp={(e) => handleDragEndCh3(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh3(e.target.value)}
										onChange={(e) => handleDimingLight1('val3', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo1.val4}%</span>
								<div className="ui_wrap">
									<span className="label_blue">CH4</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={lightInfo1.val4}
										onMouseUp={(e) => handleDragEndCh4(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh4(e.target.value)}
										onChange={(e) => handleDimingLight1('val4', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo1.val5}%</span>
								<div className="ui_wrap">
									<span className="label_blue">CH5</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={lightInfo1.val5}
										onMouseUp={(e) => handleDragEndCh5(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh5(e.target.value)}
										onChange={(e) => handleDimingLight1('val5', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo1.val6}%</span>
								<div className="ui_wrap">
									<span className="label_blue">CH6</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={lightInfo1.val6}
										onMouseUp={(e) => handleDragEndCh6(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh6(e.target.value)}
										onChange={(e) => handleDimingLight1('val6', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
						</ul>

						<ul className="light_list_wrap">
							<div className="light_title">{lightInfo.ctr_name}</div>
							<li className="light_item">
								<span className="light_value">{masterDiming2}%</span>
								<div className="ui_wrap">
									<span className="label_white">그룹2</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={masterDiming2}
										onMouseUp={(e) => handleDragEndTotalG2(e.target.value)}
										onTouchEnd={(e) => handleDragEndTotalG2(e.target.value)}
										onChange={(e) => handleMasterDiming2(e.target.value)}
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
								<span className="light_value">{lightInfo2.val1}%</span>
								<div className="ui_wrap">
									<span className="label_white">CH1</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={lightInfo2.val1}
										onMouseUp={(e) => handleDragEndCh1(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh1(e.target.value)}
										onChange={(e) => handleDimingLight2('val1', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo2.val2}%</span>
								<div className="ui_wrap">
									<span className="label_white">CH2</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={lightInfo2.val2}
										onMouseUp={(e) => handleDragEndCh2(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh2(e.target.value)}
										onChange={(e) => handleDimingLight2('val2', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo2.val3}%</span>
								<div className="ui_wrap">
									<span className="label_white">CH3</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={lightInfo2.val3}
										onMouseUp={(e) => handleDragEndCh3(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh3(e.target.value)}
										onChange={(e) => handleDimingLight2('val3', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo2.val4}%</span>
								<div className="ui_wrap">
									<span className="label_white">CH4</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={lightInfo2.val4}
										onMouseUp={(e) => handleDragEndCh4(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh4(e.target.value)}
										onChange={(e) => handleDimingLight2('val4', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo2.val5}%</span>
								<div className="ui_wrap">
									<span className="label_white">CH5</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={lightInfo2.val5}
										onMouseUp={(e) => handleDragEndCh5(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh5(e.target.value)}
										onChange={(e) => handleDimingLight2('val5', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo2.val6}%</span>
								<div className="ui_wrap">
									<span className="label_white">CH6</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={lightInfo2.val6}
										onMouseUp={(e) => handleDragEndCh6(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh6(e.target.value)}
										onChange={(e) => handleDimingLight2('val6', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
						</ul>
						<ul className="light_list_wrap">
							<div className="light_title">{lightInfo.ctr_name}</div>
							<li className="light_item">
								<span className="light_value">{masterDiming3}%</span>
								<div className="ui_wrap">
									<span className="label_red">그룹3</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={masterDiming3}
										onMouseUp={(e) => handleDragEndTotalG3(e.target.value)}
										onTouchEnd={(e) => handleDragEndTotalG3(e.target.value)}
										onChange={(e) => handleMasterDiming3(e.target.value)}
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
								<span className="light_value">{lightInfo3.val1}%</span>
								<div className="ui_wrap">
									<span className="label_red">CH1</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={lightInfo3.val1}
										onMouseUp={(e) => handleDragEndCh1(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh1(e.target.value)}
										onChange={(e) => handleDimingLight3('val1', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo3.val2}%</span>
								<div className="ui_wrap">
									<span className="label_red">CH2</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={lightInfo3.val2}
										onMouseUp={(e) => handleDragEndCh2(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh2(e.target.value)}
										onChange={(e) => handleDimingLight3('val2', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo3.val3}%</span>
								<div className="ui_wrap">
									<span className="label_red">CH3</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={lightInfo3.val3}
										onMouseUp={(e) => handleDragEndCh3(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh3(e.target.value)}
										onChange={(e) => handleDimingLight3('val3', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo3.val4}%</span>
								<div className="ui_wrap">
									<span className="label_red">CH4</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={lightInfo3.val4}
										onMouseUp={(e) => handleDragEndCh4(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh4(e.target.value)}
										onChange={(e) => handleDimingLight3('val4', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo3.val5}%</span>
								<div className="ui_wrap">
									<span className="label_red">CH5</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={lightInfo3.val5}
										onMouseUp={(e) => handleDragEndCh5(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh5(e.target.value)}
										onChange={(e) => handleDimingLight3('val5', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{lightInfo3.val6}%</span>
								<div className="ui_wrap">
									<span className="label_red">CH6</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={lightInfo3.val6}
										onMouseUp={(e) => handleDragEndCh6(e.target.value)}
										onTouchEnd={(e) => handleDragEndCh6(e.target.value)}
										onChange={(e) => handleDimingLight3('val6', e.target.value)}
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

TestIndexScreen.isGnb = false;
TestIndexScreen.pageName = '조명제어';
export default TestIndexScreen;
