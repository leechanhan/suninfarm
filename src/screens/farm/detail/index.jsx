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

const FarmDetailScreen = ({ farmName = '딸기농장', seqNo }) => {
	const router = useRouter();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [farmDetailInfo, setFarmDetailInfo] = useState({});
	useEffect(() => {
		const isVisible = new URLSearchParams(window.location.search).get('selectVegetable');
		if (isVisible === 'Y') {
			setIsPopupOpen(true);
		}

		const gtw_id = new URLSearchParams(window.location.search).get('gtw_id') ?? '';
		if (gtw_id !== '') {
			GatewayService.getGatewayDetail({ gtw_id })
				.then((res) => {
					setFarmDetailInfo(res);
				})
				.catch((err) => {
					console.log('geteway home err', err);
				});
		}
	}, []);

	useEffect(() => {}, []);

	const onClosePopup = () => {
		setIsPopupOpen(false);
	};

	const saveVegetable = (item) => {
		//setSelectedItem(item);
		onClosePopup();
		console.log(item);
	};

	const percentage = 60;
	return (
		<div className="content_wrapper">
			<div className="page_container_gray">
				<Header
					classes="nonPadding bg_gray"
					title={farmName}
					LeftButton={() => <Button뒤로가기 />}
				/>
				<div className="farm_detail_wrap">
					<div className="weather_wrap">
						<div className="weather_img_wrap">
							<img
								src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/weather/good.png`}
								alt=""
							/>
						</div>
						<div className="weather_text_wrap">
							<div className="location_wrap">
								<img
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_location.png`}
									alt=""
								/>
								<span>{farmDetailInfo.location}</span>
							</div>
							<div className="temper_wrap">
								<span>
									{farmDetailInfo.maxTemper}º / {farmDetailInfo.minTempre}º
								</span>
							</div>
							<div className="moisture_wrap">
								<span>
									강수량 : {farmDetailInfo.rain}mm, 습도 : {farmDetailInfo.moisture}%
								</span>
							</div>
						</div>
					</div>
					<div className="farm_data_wrap">
						<span className="subtitle">딸기 농장 현재 상태 &#62;</span>
						<ul className="data_wrap">
							<li className="data_item">
								<img
									className="mid"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_temper.png`}
									alt=""
								/>
								<span className="blue">{farmDetailInfo.temper}º</span>
							</li>
							<li className="data_item">
								<img
									className="mid"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_moisture.png`}
									alt=""
								/>
								<span className="green">{farmDetailInfo.moisture}%</span>
							</li>
							<li className="data_item">
								<img
									className="sm"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_co2.png`}
									alt=""
								/>
								<span className="pink">{farmDetailInfo.co2}</span>
							</li>
						</ul>
						<ul className="data_wrap">
							<li className="data_item">
								<img
									className="xm"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_par.png`}
									alt=""
								/>
								<span className="blue">{farmDetailInfo.par}</span>
							</li>
							<li className="data_item">
								<img
									className="mid"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_ec.png`}
									alt=""
								/>
								<span className="green">{farmDetailInfo.ec}</span>
							</li>
							<li className="data_item">
								<img
									className="sm"
									src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_color_ph.png`}
									alt=""
								/>
								<span className="pink">{farmDetailInfo.ph}</span>
							</li>
						</ul>
					</div>

					<div className="farm_light_wrap">
						<span className="subtitle">농장 안 조명 상태 &#62;</span>
						<ul
							className="data_wrap"
							onClick={() => openPage('/light/list', router)}
						>
							{/* {farmDetailInfo?.lightList?.map((item, index) => (
								<li
									className="data_item"
									key={index}
								>
									<CircularProgressbarWithChildren
										value={item.percent ?? 0}
										styles={buildStyles({
											textColor: '#3e98c7',
											pathColor: '#3e98c7',
											trailColor: '#d6d6d6',
										})}
									>
										<div className="info_wrap">
											<strong>{`${item.percent}%`}</strong>
										</div>
									</CircularProgressbarWithChildren>
								</li>
							))} */}
							{/* <li className="data_item">
								<CircularProgressbarWithChildren
									value={percentage}
									styles={buildStyles({
										textColor: '#3e98c7',
										pathColor: '#3e98c7',
										trailColor: '#d6d6d6',
									})}
								>
									<div className="info_wrap">
										<strong>{`${percentage}%`}</strong>
									</div>
								</CircularProgressbarWithChildren>
							</li>
							<li className="data_item">
								<CircularProgressbarWithChildren
									value={percentage}
									styles={buildStyles({
										textColor: '#3e98c7',
										pathColor: '#3e98c7',
										trailColor: '#d6d6d6',
									})}
								>
									<div className="info_wrap">
										<strong>{`${percentage}%`}</strong>
									</div>
								</CircularProgressbarWithChildren>
							</li>
							<li className="data_item">
								<CircularProgressbarWithChildren
									value={percentage}
									styles={buildStyles({
										textColor: '#3e98c7',
										pathColor: '#3e98c7',
										trailColor: '#d6d6d6',
									})}
								>
									<div className="info_wrap">
										<strong>{`${percentage}%`}</strong>
									</div>
								</CircularProgressbarWithChildren>
							</li>

							<li className="data_item">
								<CircularProgressbarWithChildren
									value={percentage}
									styles={buildStyles({
										textColor: '#3e98c7',
										pathColor: '#3e98c7',
										trailColor: '#d6d6d6',
									})}
								>
									<div className="info_wrap">
										<strong>{`${percentage}%`}</strong>
									</div>
								</CircularProgressbarWithChildren>
							</li>
							<li className="data_item">
								<CircularProgressbarWithChildren
									value={percentage}
									styles={buildStyles({
										textColor: '#3e98c7',
										pathColor: '#3e98c7',
										trailColor: '#d6d6d6',
									})}
								>
									<div className="info_wrap">
										<strong>{`${percentage}%`}</strong>
									</div>
								</CircularProgressbarWithChildren>
							</li> */}
						</ul>
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
