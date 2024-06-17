import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EmptyFarm from '../components/EmptyFarm';
import FarmAlarm from '../components/Alarm';
import FarmInfo from '../components/FarmList';
const FarmListScreen = () => {
	const router = useRouter();
	const [farmList, setFarmList] = useState();
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

						{farmList && farmList.length > 0 ? <FarmInfo /> : <EmptyFarm />}
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
