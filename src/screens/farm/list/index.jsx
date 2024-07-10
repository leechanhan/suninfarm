import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EmptyFarm from '../components/EmptyFarm';
import FarmAlarm from '../components/FarmAlarm';
import FarmInfo from '../components/FarmList';
import QueryBoundary from '@component/boundary/QueryBoundary';
import GatewayService from '@service/GtwayService';
import gateway from '../../../mocks/gateway';
import GATEWAY from '../../../mocks/getewaymock';
import { vegetableMap, weatherMap } from '@constants/static';
const FarmListScreen = () => {
	const router = useRouter();
	const [farmList, setFarmList] = useState();

	useEffect(() => {
		GatewayService.getGatewayList()
			.then((res) => {
				setFarmList(res?.gtw_list?.gtw_item);
			})
			.catch((err) => {
				console.log(`getaway getGatewayList`, err);
			});
	}, []);
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
