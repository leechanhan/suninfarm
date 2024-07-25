import Layout기본헤더 from '@component/layout/Layout기본헤더';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomForms from '@component/etc/CustomForms';
import { openPage } from '@lib/hooks/common';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
const AlarmScreen = () => {
	const router = useRouter();

	const handlerJoin = () => {};

	return <div className="content_wrapper"></div>;
};

AlarmScreen.Layout = Layout기본헤더;
AlarmScreen.headerOptions = {
	title: '알람',
	LeftButton: () => <Button뒤로가기 />,
};

AlarmScreen.isGnb = false;
export default AlarmScreen;
