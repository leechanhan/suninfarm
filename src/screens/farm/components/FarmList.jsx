import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmptyFarm from './EmptyFarm';
import { vegetableMap, weatherMap } from '@constants/static';
const FarmInfo = () => {
	const router = useRouter();
	const [farmList, setFarmList] = useState([]);
	useEffect(() => {}, [farmList]);
	return (
		<>
			{farmList && farmList.length > 0 ? (
				<div className="farminfo_wrap">
					<ul className="farminfo_list">
						<p className="title">나의 농장</p>
						{farmList.map((item, idx) => (
							<li
								onClick={() => openPage('/farm/detail', router)}
								className="farminfo_item"
								style={{ backgroundColor: vegetableMap[item.farmMainIcon].activeColor }}
								key={idx}
							>
								<div className="farminfo_img_wrap">
									<img
										className=""
										src={vegetableMap[item.farmMainIcon].imgPath}
										alt=""
									/>
								</div>
								<div className="framinfo_text_wrap">
									<div className="framinfo_title_wrap">
										<span className="title">{item.farmTitle}</span>
										<img
											className="icon_weather"
											src={weatherMap[item.farmWeather]}
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
												<span className="data_value">{item.temper}</span>
												<span className="unit">º</span>
											</div>

											<div className="text_row">
												<span className="data_value">{item.moisture}</span>
												<span className="unit">%</span>
											</div>
											<div className="text_row">
												<span className="data_value">{item.co2}</span>
											</div>
											<div className="text_row">
												<span className="data_value">{item.par}</span>
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
					<button
						style={{ backgroundColor: '#fff', color: '#f00', fontSize: 20, padding: 12 }}
						className="addFarmBtn button"
						onClick={() =>
							setFarmList([
								{ farmMainIcon: '딸기', farmTitle: '딸기 농장', farmWeather: '좋음', temper: 18, moisture: 32, co2: 120, par: 140 },
								{ farmMainIcon: '토마토', farmTitle: '토마토 농장', farmWeather: '좋음', temper: 25, moisture: 40, co2: 220, par: 230 },
								{ farmMainIcon: '피망', farmTitle: '피망 농장', farmWeather: '나쁨', temper: 22, moisture: 30, co2: 322, par: 300 },
							])
						}
					>
						[TEST] 농장 생성하기 [TEST]
					</button>
					<EmptyFarm />
				</>
			)}
			<div class="add_farm_btn_wrap">
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
