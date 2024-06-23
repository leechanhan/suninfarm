import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const FarmDetailScreen = () => {
	const router = useRouter();
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
					<div className="list"></div>
				</div>
			</div>
		</div>
	);
};

FarmDetailScreen.Layout = Layout기본헤더없음;
FarmDetailScreen.headerOptions = {
	title: '',
};

FarmDetailScreen.isGnb = false;
export default FarmDetailScreen;
