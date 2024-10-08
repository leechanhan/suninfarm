import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmptyFarm from './EmptyFarm';
import { vegetableMap, weatherMap } from '@constants/static';
import GatewayService from '@service/GatewayService';
import CustomAlert from '@lib/alert';
import CookieUtils from '@lib/utils/cookie';
const FarmInfo = ({ farmList = [] }) => {
	const router = useRouter();
	useEffect(() => {}, [farmList]);

	const deleteGateway = (event, gtw_id, gtw_name) => {
		event.stopPropagation();
		CustomAlert.question({
			html: `${gtw_name}를 삭제하시겠습니까?.`,
			callback: () => {
				GatewayService.deleteGateway({ gtw_id: Number(gtw_id) })
					.then((res) => {
						console.log(`gateway delete`, res);
						if (res.result !== 'success') {
							CustomAlert.error({
								html: res?.reason,
								callback: () => {},
							});
						} else {
							CustomAlert.success({
								html: `${gtw_name}가 정상적으로 삭제되었습니다.`,
								callback: () => {},
							});
						}
					})
					.catch((err) => {
						console.log(`gateway delete`, err);
					});
			},
		});
	};

	const onClickFarm = (gtw_id, gtw_name) => {
		CookieUtils.setCookie('gtw_id', gtw_id, 365);
		CookieUtils.setCookie('gtw_name', gtw_name, 365);
		openPage(`/farm/detail`, router);
	};

	return (
		<>
			{farmList && farmList.length > 0 ? (
				<div className="farminfo_wrap">
					<ul className="farminfo_list">
						<p className="title">나의 농장</p>
						{farmList.map((item, idx) => (
							<li
								onClick={() => onClickFarm(item.gtw_id, item.gtw_name)}
								className="farminfo_item"
								style={{ backgroundColor: vegetableMap[item?.gtw_crop]?.activeColor ?? '#FF6563' }}
								key={idx}
							>
								<div className="farminfo_img_wrap">
									<img
										className="vegetable_img"
										src={
											vegetableMap[item?.gtw_crop]?.imgPath ?? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/vegetable/icon_berry.png`
										}
										alt=""
									/>
									<img
										className="icon_ai"
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_ai.png`}
										alt=""
									/>
								</div>
								<div className="framinfo_text_wrap">
									<div className="framinfo_title_wrap">
										<span className="farm_title">{item.gtw_name}</span>
										<img
											className="icon_weather"
											// src={weatherMap[item.farmWeather]}
											src={weatherMap['좋음']}
											alt=""
										/>
										<button
											className="button_delete"
											type="button"
											onClick={(e) => deleteGateway(e, item.gtw_id, item.gtw_name)}
										>
											<img
												className="button_delete"
												src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_delete.png`}
												alt=""
											/>
										</button>
									</div>
									<div className="framinfo_data_wrap">
										<div className="img_wrap">
											<div className="img_row">
												<img
													className="img_no1"
													src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_temper.png`}
													alt=""
												/>
											</div>

											<div className="img_row">
												<img
													className="img_no2"
													src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_water.png`}
													alt=""
												/>
											</div>
											<div className="img_row">
												<img
													className="img_no3"
													src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_co2.png`}
													alt=""
												/>
											</div>
											<div className="img_row">
												<img
													className="img_no4"
													src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_par.png`}
													alt=""
												/>
											</div>
										</div>
										<div className="text_wrap">
											<div className="text_row">
												<span className="data_value">{parseInt(item.rcd_itemp)}</span>
												<span className="unit">º</span>
											</div>

											<div className="text_row">
												<span className="data_value">{parseInt(item.rcd_ihumi)}</span>
												<span className="unit">%</span>
											</div>
											<div className="text_row">
												<span className="data_value">{parseInt(item.rcd_co2)}</span>
											</div>
											<div className="text_row">
												<span className="data_value">{parseInt(item.rcd_par)}</span>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			) : (
				<>
					<EmptyFarm />
				</>
			)}
			<div className="add_farm_btn_wrap">
				<div className="addFarmBtn">
					<img
						className=" img"
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_add.png`}
						alt="addFarm"
					/>
					<button
						className=" button"
						onClick={() => openPage('/farm/add', router)}
					>
						농장추가
					</button>
				</div>
			</div>
		</>
	);
};

export default FarmInfo;
