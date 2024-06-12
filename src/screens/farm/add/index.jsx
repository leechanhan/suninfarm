import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const AddFarmScreen = () => {
	const router = useRouter();
	useEffect(() => {}, []);
	return (
		<div className="content_wrapper">
			<div className="farmWrap">
				<img
					className="farmWrap img"
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_add_farm.png`}
				/>
				<span className="farmWrap description">농장 추가.</span>
				<span className="farmWrap description">농장을 추가하십시오</span>
				<span className="farmWrap padding"></span>
				<div className="addFarmBtn">
					<img
						className="addFarmBtn img"
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_add.png`}
						alt="addFarm"
					/>
					<button
						className="addFarmBtn button"
						onClick={() => openPage('/addFarm', router)}
					>
						농장추가
					</button>
				</div>
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
