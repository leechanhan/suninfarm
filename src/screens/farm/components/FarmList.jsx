import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmptyFarm from './EmptyFarm';
import { vegetableMap, weatherMap } from '@constants/static';
const FarmInfo = ({ farmList = [] }) => {
	const router = useRouter();
	useEffect(() => {}, [farmList]);

	return (
		<>
			{farmList && farmList.length > 0 ? (
				<div className="farminfo_wrap">
					<ul className="farminfo_list">
						<p className="title">나의 농장</p>
						{farmList.map((item, idx) => (
							<li
								onClick={() => openPage(`/farm/detail?gtw_id=${item.gtw_id}`, router)}
								className="farminfo_item"
								// style={{ backgroundColor: vegetableMap[item.farmMainIcon].activeColor }}
								key={idx}
							>
								<div className="farminfo_img_wrap">
									<img
										className=""
										src={
											vegetableMap[item?.gtw_crop]?.imgPath ?? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/vegetable/icon_berry.png`
										}
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
										<img
											className="icon_ai"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_ai.png`}
											alt=""
										/>
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
