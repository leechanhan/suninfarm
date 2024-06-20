import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmptyFarm from './EmptyFarm';
const FarmInfo = () => {
	const router = useRouter();
	const [farmList, setFarmList] = useState([
		{
			postId: 1,
			id: 1,
			name: 'id labore ex et quam laborum',
			email: 'Eliseo@gardner.biz',
			body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
		},
		{
			postId: 1,
			id: 2,
			name: 'quo vero reiciendis velit similique earum',
			email: 'Jayne_Kuhic@sydney.com',
			body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
		},
		{
			postId: 1,
			id: 3,
			name: 'odio adipisci rerum aut animi',
			email: 'Nikita@garfield.biz',
			body: 'quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione',
		},
		{
			postId: 1,
			id: 4,
			name: 'alias odio sit',
			email: 'Lew@alysha.tv',
			body: 'non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati',
		},
		{
			postId: 1,
			id: 5,
			name: 'vero eaque aliquid doloribus et culpa',
			email: 'Hayden@althea.biz',
			body: 'harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et',
		},
	]);
	useEffect(() => {}, [farmList]);
	return (
		<>
			{farmList && farmList.length > 0 ? (
				<div className="farminfo_wrap">
					<ul className="farminfo_list">
						{farmList.map((item, idx) => (
							<li
								className="farminfo_item"
								key={idx}
							>
								<div className="farminfo_img_wrap">
									<img
										className=""
										src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_moisture.png`}
										alt=""
									/>
								</div>
								<div className="framinfo_text_wrap">
									<div className="framinfo_title_wrap">
										<span className="title">딸기농장</span>
										<img
											className="icon_weather"
											src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_moisture.png`}
											alt=""
										/>
									</div>
									<div className="framinfo_data_wrap">
										<div className="data_column">
											<img
												className=""
												src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_moisture.png`}
												alt=""
											/>
											<span>18</span>
										</div>
										<div className="data_column">
											<img
												className=""
												src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_moisture.png`}
												alt=""
											/>
											<span>18</span>
										</div>
										<div className="data_column">
											<img
												className=""
												src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_moisture.png`}
												alt=""
											/>
											<span>18</span>
										</div>
										<div className="data_column">
											<img
												className=""
												src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_alarm_moisture.png`}
												alt=""
											/>
											<span>118</span>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
					<div className="farm_empty_wrap">
						<span className="farm_empty_wrap padding"></span>
						<div className="addFarmBtn">
							<img
								className="addFarmBtn img"
								src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_add.png`}
								alt="addFarm"
							/>
							<button
								className="addFarmBtn button"
								onClick={() => {}}
							>
								농장추가
							</button>
						</div>
					</div>
				</div>
			) : (
				<EmptyFarm />
			)}
		</>
	);
};

export default FarmInfo;
