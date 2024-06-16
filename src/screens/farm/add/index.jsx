import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmptyFarm from '../components/EmptyFarm';
const AddFarmScreen = () => {
	const router = useRouter();
	useEffect(() => {}, []);
	return (
		<div className="content_wrapper">
			<div className="farmWrap">
				<EmptyFarm />
			</div>
		</div>
	);
};

AddFarmScreen.Layout = Layout기본헤더없음;
AddFarmScreen.headerOptions = {
	title: '',
};

AddFarmScreen.isGnb = false;
export default AddFarmScreen;
