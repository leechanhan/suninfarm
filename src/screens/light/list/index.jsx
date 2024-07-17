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
const LightListScreen = ({ farmName = '딸기농장' }) => {
	const [checkDevice, setCheckDevice] = useState(false);
	const [lightInfo, setLightInfo] = useState(null);
	const CHANNEL_CNT = 3;
	const router = useRouter();

	const handlerDeleteDevice = (name) => {
		CustomAlert.warning({ html: `${name}을 삭제하시겠습니까?`, callback: () => {} });
	};
	const [values, setValues] = useState(new Map());
	const updateLightDiming = useCallback(
		debounce((data) => {
			lightInfo.ctr_chval1 = 'values';

			//lightInfo.ctr_chval2 = values.get(`${lightInfo.ctr_ieee}ctr_ch1va2`);
			//lightInfo.ctr_chval3 = values.get(`${lightInfo.ctr_ieee}ctr_ch1va3`);

			LightService.putLightInfo(lightInfo)
				.then((res) => {
					console.log('putLightInfo', res);
					// setFarmDetailInfo(res);
				})
				.catch((err) => {
					console.log('putLightInfo err', err);
				});
		}, 1300),
		[],
	);

	const handleChangeProgressValue = (ieee, key, value) => {
		const lightKey = ieee + key;
		setValues((prevValues) => {
			const newValues = new Map(prevValues);
			if (!newValues.has(lightKey)) {
				newValues.set(lightKey, value);
			}
			newValues.set(lightKey, Number(value));
			return newValues;
		});

		if (key === 'master') {
			setValues((prevValues) => {
				const newValues = new Map(prevValues);

				newValues.set(`${ieee}ctr_ch1val`, Number(value));
				newValues.set(`${ieee}ctr_ch1va2`, Number(value));
				newValues.set(`${ieee}ctr_ch1va3`, Number(value));
				return newValues;
			});
		}
		// updateLightDiming(values);
		// updateLightDiming(newValue);
	};

	useEffect(() => {
		const { query } = router;

		setLightInfo(query);

		console.log('getLightInfo', query);
		handleChangeProgressValue(query.ctr_ieee, 'master', 50);
		handleChangeProgressValue(query.ctr_ieee, 'ctr_ch1val', query.ctr_ch1val);
		handleChangeProgressValue(query.ctr_ieee, 'ctr_ch1va2', query.ctr_ch1va2);
		handleChangeProgressValue(query.ctr_ieee, 'ctr_ch1va3', query.ctr_ch1va3);
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
								<span className="light_value">{values.get(lightInfo.ctr_ieee + 'master')}%</span>
								<div className="ui_wrap">
									<span className="label_total">Total</span>
									<input
										className="light_progress total"
										type="range"
										min="0"
										max="100"
										value={values.get(lightInfo.ctr_ieee + 'master')}
										onChange={(e) => handleChangeProgressValue(lightInfo.ctr_ieee, 'master', e.target.value)}
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
								<span className="light_value">{values.get(lightInfo.ctr_ieee + 'ctr_ch1val')}%</span>
								<div className="ui_wrap">
									<span className="label_white">W</span>
									<input
										className="light_progress white"
										type="range"
										min="0"
										max="100"
										value={values.get(lightInfo.ctr_ieee + 'ctr_ch1val')}
										onChange={(e) => handleChangeProgressValue(lightInfo.ctr_ieee, 'ctr_ch1val', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{values.get(lightInfo.ctr_ieee + 'ctr_ch1va2')}%</span>
								<div className="ui_wrap">
									<span className="label_red">R</span>
									<input
										className="light_progress red"
										type="range"
										min="0"
										max="100"
										value={values.get(lightInfo.ctr_ieee + 'ctr_ch1va2')}
										onChange={(e) => handleChangeProgressValue(lightInfo.ctr_ieee, 'ctr_ch1va2', e.target.value)}
									/>
									<img
										className="icon_light_gray"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
										alt=""
									/>
								</div>
							</li>
							<li className="light_item">
								<span className="light_value">{values.get(lightInfo.ctr_ieee + 'ctr_ch1va3')}%</span>
								<div className="ui_wrap">
									<span className="label_blue">B</span>
									<input
										className="light_progress blue"
										type="range"
										min="0"
										max="100"
										value={values.get(lightInfo.ctr_ieee + 'ctr_ch1va3')}
										onChange={(e) => handleChangeProgressValue(lightInfo.ctr_ieee, 'ctr_ch1va3', e.target.value)}
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

LightListScreen.Layout = Layout메인헤더;
LightListScreen.isGnb = true;
LightListScreen.pageName = '조명제어';
export default LightListScreen;
