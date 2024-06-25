import Layout메인헤더 from '@component/layout/Layout메인헤더';
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
			<div className="page_content"></div>
		</div>
	);
};

FarmDetailScreen.Layout = Layout메인헤더;
FarmDetailScreen.headerOptions = {
	title: 'FarmDetailScreen',
};

FarmDetailScreen.isGnb = true;
export default FarmDetailScreen;
