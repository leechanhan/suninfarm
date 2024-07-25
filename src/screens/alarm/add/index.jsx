import Layout기본헤더 from '@component/layout/Layout기본헤더';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomForms from '@component/etc/CustomForms';
import { openPage } from '@lib/hooks/common';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Button자유함수 from '@component/frame/headerBtn/Button자유함수';
const AlarmAddScreen = ({ alarmType = '조명' }) => {
	const router = useRouter();

	const handlerJoin = () => {};

	return <div className="content_wrapper"></div>;
};

AlarmAddScreen.Layout = Layout기본헤더;
AlarmAddScreen.headerOptions = {
	title: '알람 추가',
	LeftButton: () => <Button뒤로가기 />,
	RightButton: () => (
		<Button자유함수
			routerPath={'/alarm/add'}
			imgPath={'/images/png/button_plus.png'}
		/>
	),
};

AlarmAddScreen.isGnb = false;
export default AlarmAddScreen;
