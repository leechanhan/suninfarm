import React, { useState } from 'react';

const quickMoveList = [
	{
		key: 'bebecam',
		name: '베베캠',
		routeName: 'bebecam',
		isBalloon: 'bebecam_apply',
	},
	{
		key: 'diary',
		name: '아이수첩',
		routeName: 'diary',
		isBalloon: false,
	},
	{
		key: 'album',
		name: '아이앨범',
		routeName: 'album',
		isBalloon: 'album_open',
	},
];

const Main빠른바로가기영역 = () => {
	const [balloonBoxs, setBalloonBoxs] = useState({
		bebecam: true,
		album: true,
	});

	// 메뉴별 풍선 이미지 닫기
	const handleCloseBalloon = (balloon) => {
		setBalloonBoxs((prev) => ({
			...prev,
			[balloon]: !prev[balloon],
		}));
	};

	// 버튼 활성화 체크
	const handleChangeActiveStatus = (key) => {
		// bebecam, diary은 class 로 버튼 활성화
		switch (key) {
			case 'bebecam':
				// 조건체크
				return 'active';
			case 'diary':
				// 조건체크
				return 'bordered';
			default:
				return '';
		}
	};

	return (
		<div className="main_quick_move_box">
			<ul className="quick_move_list">
				{quickMoveList.map((item) => {
					return (
						<Button빠른바로가기버튼
							key={item.key}
							item={item}
							balloonBoxs={balloonBoxs}
							handleCloseBalloon={handleCloseBalloon}
							active={handleChangeActiveStatus(item.key)}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default Main빠른바로가기영역;

const Button빠른바로가기버튼 = ({ item, balloonBoxs, handleCloseBalloon, active }) => {
	// 빠른바로가기 이동
	const handleQuickMove = (routeName) => {
		console.log(routeName);
	};

	return (
		<li className="quick_move_item">
			<button
				type="button"
				className={`btn_${item.key} ${active}`}
				onClick={() => handleQuickMove(item.routeName)}
			>
				<span className="icon_box">
					<img
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/svg/icon_main_quick_${item.key}.svg`}
						alt={item.name}
					/>
				</span>
				<span className="text_box">{item.name}</span>
			</button>
			{item.isBalloon && balloonBoxs[item.key] && (
				<div
					className="balloon_box"
					onClick={() => {
						handleCloseBalloon(item.key);
					}}
				>
					<img
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/svg/img_main_quick_balloon_${item.isBalloon}.svg`}
						alt={item.name}
					/>
				</div>
			)}
		</li>
	);
};
