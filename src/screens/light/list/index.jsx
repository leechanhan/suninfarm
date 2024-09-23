import Layout메인헤더 from '@component/layout/Layout메인헤더';
import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import Header from '@component/frame/Header';

import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import LightService from '@service/LightService';
import GatewayService from '@service/GtwayService';
import CookieUtils from '@lib/utils/cookie';
import StringUtils from '@lib/utils/string';

const LightListScreen = ({ farmName = '딸기농장', seqNo }) => {
	const router = useRouter();

	const [lightInfo, setLightInfo] = useState(router?.query);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [gtwId, setGtwId] = useState();
	const [farmDetailInfo, setFarmDetailInfo] = useState({});
	const [masterDiming, setMasterDiming] = useState(0);

	useEffect(() => {
		getLightInfo();
	}, [gtwId]);

	const getLightInfo = () => {
		const gtw_id = CookieUtils.getCookie('gtw_id');
		if (gtw_id?.length > 0) {
			setGtwId(gtw_id);
			GatewayService.getGatewayDetail({ gtw_id })
				.then((res) => {
					console.log('geteway home', res);
					setFarmDetailInfo(res);
				})
				.catch((err) => {
					console.log('geteway home err', err);
				});
		}
	};

	const handleMasterDiming = (value) => {
		setMasterDiming(value);
	};

	const handleDragEnd = () => {
		const gtw_id = CookieUtils.getCookie('gtw_id');
		console.log('put gateway lightInfo', gtw_id, masterDiming);
		LightService.putGtwayLightInfo({ gtw_id, ctr_allval: masterDiming })
			.then((res) => {
				if (res.result === 'success') {
					getLightInfo();
				} else {
					console.log('조명 설정 실패', res?.reason);
				}
			})
			.catch((err) => {
				console.log('putLightInfo err', err);
				console.log('조명 설정 실패');
			});
	};

	const onClickLight = (lightInfo) => {
		const data = { ...lightInfo, ...{ gtw_id: gtwId } };
		const queryString = new URLSearchParams(data).toString();
		openPage(`/light/single?${queryString}`, router);
	};
	return (
		<div className="content_wrapper">
			<div className="page_container_gray">
				<Header
					classes="nonPadding bg_gray"
					title={farmName}
					LeftButton={() => <Button뒤로가기 />}
				/>
				<div className="light_list_wrap">
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
								onMouseUp={() => handleDragEnd()}
								onTouchEnd={() => handleDragEnd()}
								onChange={(e) => handleMasterDiming(e.target.value)}
							/>
							<img
								className="icon_light_gray"
								src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/light/icon_light_gray.png`}
								alt=""
							/>
						</div>
					</li>
				</div>
				<div className="farm_detail_wrap">
					<div className="farm_light_wrap">
						{farmDetailInfo?.ctr_list?.ctr_item.map((item, index) => (
							<ul
								className="data_wrap"
								key={index}
								onClick={() => onClickLight(item)}
							>
								<span className="data_title">{item.ctr_name}</span>
								<div className="data_chart_wrap">
									<li className="data_item">
										<CircularProgressbarWithChildren
											value={item.ctr_ch1val ?? 0}
											styles={buildStyles({
												textColor: '#3e98c7',
												pathColor: '#3e98c7',
												trailColor: '#d6d6d6',
											})}
										>
											<div className="info_wrap">
												<strong>{parseInt(item.ctr_ch1val)}%</strong>
											</div>
										</CircularProgressbarWithChildren>
									</li>
									<li className="data_item">
										<CircularProgressbarWithChildren
											value={item.ctr_ch2val ?? 0}
											styles={buildStyles({
												textColor: '#3e98c7',
												pathColor: '#3e98c7',
												trailColor: '#d6d6d6',
											})}
										>
											<div className="info_wrap">
												<strong>{parseInt(item.ctr_ch2val)}%</strong>
											</div>
										</CircularProgressbarWithChildren>
									</li>
									<li className="data_item">
										<CircularProgressbarWithChildren
											value={item.ctr_ch3val ?? 0}
											styles={buildStyles({
												textColor: '#3e98c7',
												pathColor: '#3e98c7',
												trailColor: '#d6d6d6',
											})}
										>
											<div className="info_wrap">
												<strong>{parseInt(item.ctr_ch3val)}%</strong>
											</div>
										</CircularProgressbarWithChildren>
									</li>
								</div>
							</ul>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

LightListScreen.Layout = Layout메인헤더;
LightListScreen.headerOptions = {
	title: 'FarmDetailScreen',
};

LightListScreen.isGnb = true;
LightListScreen.pageName = '홈';
export default LightListScreen;
