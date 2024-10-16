import Layout메인헤더 from '@component/layout/Layout메인헤더';
import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Header from '@component/frame/Header';

import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import SelectVegetablePopup from '@component/popup/SelectVegetable';
import Button팝업종료 from '@component/frame/headerBtn/Button팝업종료';
import VegetableList from '../components/VegetableList';
import GatewayService from '@service/GtwayService';
import CookieUtils from '@lib/utils/cookie';
import StringUtils from '@lib/utils/string';

const FarmDetailScreen = ({ farmName = '', seqNo }) => {
	const router = useRouter();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [gtwId, setGtwId] = useState();
	const [farmDetailInfo, setFarmDetailInfo] = useState({});
	useEffect(() => {
		const isVisible = new URLSearchParams(window.location.search).get('selectVegetable');
		if (isVisible === 'Y') {
			setIsPopupOpen(true);
		}
	}, []);

	useEffect(() => {
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
	}, [gtwId]);

	const onClosePopup = () => {
		setIsPopupOpen(false);
	};

	const saveVegetable = (item) => {
		onClosePopup();
		console.log(item);
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
					title={farmDetailInfo.gtw_name}
					LeftButton={() => <Button뒤로가기 />}
				/>
				<div className="farm_detail_wrap">
					<div className="weather_wrap">
						<div className="weather_img_wrap">
							<img
								src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/weather/rain20.png`}
								alt=""
							/>
						</div>
						<div className="weather_text_wrap">
							<div className="location_wrap">
								<img
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_location.png`}
									alt=""
								/>
								<span>{farmDetailInfo.gtw_addr}</span>
							</div>
							<div className="temper_wrap">
								<span>
									{'14'}º / {'20'}º
								</span>
							</div>
							<div className="moisture_wrap">
								<span>강수확률 : 20%, 습도 : {'35'}%</span>
							</div>
						</div>
						{/* <div className="weather_text_wrap">
							<div className="location_wrap">
								<img
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_location.png`}
									alt=""
								/>
								<span>{farmDetailInfo.gtw_addr}</span>
							</div>
							<div className="temper_wrap">
								<span>
									{parseInt(farmDetailInfo.rcd_itemp ?? '0')}º /{parseInt(farmDetailInfo.rcd_itemp) + 8}º
								</span>
							</div>
							<div className="moisture_wrap">
								<span>
									강수량 : {StringUtils.getRandom(10, 100)}mm, 습도 : {parseInt(farmDetailInfo.rcd_ihumi ?? '0')}%
								</span>
							</div>
						</div> */}
					</div>
					<div className="farm_data_wrap">
						<span className="subtitle">{farmDetailInfo.gtw_name} 현재 상태 &#62;</span>
						<ul className="data_wrap">
							<li className="data_item">
								<img
									className="mid"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_temper.png`}
									alt=""
								/>
								<span className="blue">{parseInt(farmDetailInfo.rcd_itemp) ?? '0'}º</span>
							</li>
							<li className="data_item">
								<img
									className="mid"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_moisture.png`}
									alt=""
								/>
								<span className="green">{parseInt(farmDetailInfo.rcd_ihumi ?? '0')}%</span>
							</li>
							<li className="data_item">
								<img
									className="sm"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_co2.png`}
									alt=""
								/>
								<span className="pink">{farmDetailInfo.rcd_co2 ?? '0'}</span>
							</li>
						</ul>
						<ul className="data_wrap">
							<li className="data_item">
								<img
									className="xm"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_par.png`}
									alt=""
								/>

								<span className="blue">{farmDetailInfo.rcd_par ?? '0'}</span>
							</li>
							<li className="data_item">
								<img
									className="mid"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_ec.png`}
									alt=""
								/>
								<span className="blue">{StringUtils.getRandom(10, 200)}</span>
								{/* <span className="green">{farmDetailInfo.ec ?? '0'}</span> */}
							</li>
							<li className="data_item">
								<img
									className="sm"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_ph.png`}
									alt=""
								/>
								<span className="pink">{StringUtils.getRandom(10, 100)}</span>
								{/* <span className="pink">{farmDetailInfo.ph ?? '0'}</span> */}
							</li>
						</ul>
					</div>

					<div className="farm_light_wrap">
						<span className="subtitle">농장 안 조명 상태 &#62;</span>
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
						{/* <div class="light_circle_wrap">
							<div style={{ width: 100, height: 100 }}>
								<CircularProgressbar
									value={percentage}
									text={`${percentage}%`}
									styles={buildStyles({
										textColor: '#3e98c7',
										pathColor: '#3e98c7',
										trailColor: '#d6d6d6',
									})}
								/>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

FarmDetailScreen.Layout = Layout메인헤더;
FarmDetailScreen.headerOptions = {
	title: 'FarmDetailScreen',
};

FarmDetailScreen.isGnb = true;
FarmDetailScreen.pageName = '홈';
export default FarmDetailScreen;
