import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EmptyFarm from '../components/EmptyFarm';
const FarmListScreen = () => {
	const router = useRouter();
	const [farmList, setFarmList] = useState([{ a: 'a' }]);
	useEffect(() => {}, []);
	return (
		<div className="content_wrapper">
			<div className="farmWrap">{farmList && farmList.length > 0 ? <></> : <EmptyFarm />}</div>
		</div>
	);
};

FarmListScreen.Layout = Layout기본헤더없음;
FarmListScreen.headerOptions = {
	title: '',
};

FarmListScreen.isGnb = false;
export default FarmListScreen;