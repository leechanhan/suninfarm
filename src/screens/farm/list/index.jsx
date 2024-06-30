import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EmptyFarm from '../components/EmptyFarm';
import FarmAlarm from '../components/FarmAlarm';
import FarmInfo from '../components/FarmList';
import QueryBoundary from '@component/boundary/QueryBoundary';
const FarmListScreen = () => {
	const router = useRouter();
	const [farmList, setFarmList] = useState([
		{ farmMainIcon: '딸기', farmTitle: '딸기 농장', farmWeather: '좋음', temper: 18, moisture: 32, co2: 120, par: 140 },
		{ farmMainIcon: '딸기', farmTitle: '딸기 농장', farmWeather: '좋음', temper: 18, moisture: 32, co2: 120, par: 140 },
		{ farmMainIcon: '토마토', farmTitle: '토마토 농장', farmWeather: '좋음', temper: 25, moisture: 40, co2: 220, par: 230 },
		{ farmMainIcon: '파프리카', farmTitle: '파프리카 농장', farmWeather: '나쁨', temper: 22, moisture: 30, co2: 322, par: 312 },
		// { farmMainIcon: '당근', farmTitle: '당근 농장', farmWeather: '나쁨', temper: 26, moisture: 40, co2: 342, par: 360 },
		// { farmMainIcon: '포도', farmTitle: '포도 농장', farmWeather: '나쁨', temper: 28, moisture: 70, co2: 352, par: 360 },
	]);

	useEffect(() => {}, []);
	return (
		<div className="content_wrapper">
			<div className="farmWrap">
				<div className="farm_list_Wrap">
					<div className="header">
						<img
							className=""
							src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_only.png`}
							alt=""
						/>
					</div>
					<div className="list">
						<FarmAlarm />
						<QueryBoundary Skeleton={() => <>로딩중...</>}>
							<FarmInfo farmList={farmList} />
						</QueryBoundary>
					</div>
				</div>
			</div>
		</div>
	);
};

FarmListScreen.Layout = Layout기본헤더없음;
FarmListScreen.headerOptions = {
	title: '',
};

FarmListScreen.isGnb = false;
export default FarmListScreen;
