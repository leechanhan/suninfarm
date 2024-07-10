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
const LightListScreen = ({ _lightList = [], farmName = '딸기농장' }) => {
	const [checkDevice, setCheckDevice] = useState(false);
	const CHANNEL_CNT = 3;

	const handlerDeleteDevice = (name) => {
		CustomAlert.warning({ html: `${name}을 삭제하시겠습니까?`, callback: () => {} });
	};

	const [values, setValues] = useState(new Map());

	const updateLightDiming = useCallback(
		debounce((newValue) => {
			// axios
			// 	.get(`http://example.com/api?value=${newValue}`)
			// 	.then((response) => {
			// 		console.log(response.data);
			// 	})
			// 	.catch((error) => {
			// 		console.error('API request failed', error);
			// 	});
		}, 300),
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
		console.log('123');

		if (key === 'master') {
			setValues((prevValues) => {
				const newValues = new Map(prevValues);

				newValues.set(`${ieee}ctr_ch1val`, Number(value));
				newValues.set(`${ieee}ctr_ch2val`, Number(value));
				newValues.set(`${ieee}ctr_ch3val`, Number(value));
				return newValues;
			});
		}
		//	updateLightDiming(newValue);
	};

	const [lightList, setLightList] = useState([
		{
			ctr_ieee: '01B213901D49',
			ctr_name: '조명 3',
			ctr_ch1val: '54',
			ctr_ch2val: '71',
			ctr_ch3val: '82',
		},
		{
			ctr_ieee: '04F8541DBE15',
			ctr_name: '조명 2',
			ctr_ch1val: '57',
			ctr_ch2val: '70',
			ctr_ch3val: '81',
		},
		{
			ctr_ieee: '431695DFC3C8',
			ctr_name: '조명 1',
			ctr_ch1val: '55',
			ctr_ch2val: '72',
			ctr_ch3val: '80',
		},
	]);

	useEffect(() => {
		lightList.forEach((item) => {
			handleChangeProgressValue(item.ctr_ieee, 'master', 50);
			handleChangeProgressValue(item.ctr_ieee, 'ctr_ch1val', item.ctr_ch1val);
			handleChangeProgressValue(item.ctr_ieee, 'ctr_ch2val', item.ctr_ch2val);
			handleChangeProgressValue(item.ctr_ieee, 'ctr_ch3val', item.ctr_ch3val);
		});
	}, [lightList]);
	return (
		<div className="content_wrapper">
			<div className="page_container_gray">
				<Header
					classes="nonPadding bg_gray"
					title={farmName}
					LeftButton={() => <Button뒤로가기 />}
				/>
				{lightList.map((item, index) => {
					return (
						<div
							className="light_info_wrap"
							key={item.ctr_ieee + index}
						>
							<ul className="light_list_wrap">
								<div className="light_title">{item.ctr_name}</div>
								<li
									className="light_item"
									key={index + 'master'}
								>
									<span className="light_value">{values.get(item.ctr_ieee + 'master')}%</span>
									<div className="ui_wrap">
										<span className="label_total">Total</span>
										<input
											className="light_progress total"
											type="range"
											min="0"
											max="100"
											value={values.get(item.ctr_ieee + 'master')}
											onChange={(e) => handleChangeProgressValue(item.ctr_ieee, 'master', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<div className="light_divider"></div>
								<li
									className="light_item"
									key={index + 'ctr_ch1val'}
								>
									<span className="light_value">{values.get(item.ctr_ieee + 'ctr_ch1val')}%</span>
									<div className="ui_wrap">
										<span className="label_white">W</span>
										<input
											className="light_progress white"
											type="range"
											min="0"
											max="100"
											value={values.get(item.ctr_ieee + 'ctr_ch1val')}
											onChange={(e) => handleChangeProgressValue(item.ctr_ieee, 'ctr_ch1val', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li
									className="light_item"
									key={index + 'ctr_ch2val'}
								>
									<span className="light_value">{values.get(item.ctr_ieee + 'ctr_ch2val')}%</span>
									<div className="ui_wrap">
										<span className="label_red">R</span>
										<input
											className="light_progress red"
											type="range"
											min="0"
											max="100"
											value={values.get(item.ctr_ieee + 'ctr_ch2val')}
											onChange={(e) => handleChangeProgressValue(item.ctr_ieee, 'ctr_ch2val', e.target.value)}
										/>
										<img
											className="icon_light_gray"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
											alt=""
										/>
									</div>
								</li>
								<li
									className="light_item"
									key={index + 'ctr_ch3val'}
								>
									<span className="light_value">{values.get(item.ctr_ieee + 'ctr_ch3val')}%</span>
									<div className="ui_wrap">
										<span className="label_blue">B</span>
										<input
											className="light_progress blue"
											type="range"
											min="0"
											max="100"
											value={values.get(item.ctr_ieee + 'ctr_ch3val')}
											onChange={(e) => handleChangeProgressValue(item.ctr_ieee, 'ctr_ch3val', e.target.value)}
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
					);
				})}
			</div>
		</div>
	);
};

LightListScreen.Layout = Layout메인헤더;
LightListScreen.isGnb = true;
LightListScreen.pageName = '조명제어';
export default LightListScreen;
