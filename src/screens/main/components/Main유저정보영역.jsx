import React from 'react';
import { IconAlarm } from '@component/icon/IconAlarm';
import Link from 'next/link';

const Main유저정보영역 = () => {
	return (
		<div className="main_header_box">
			<div className="img_box">
				<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/temp/header_profile.jpg`} />
			</div>
			<div className="text_box">
				<p className="prefix">안녕하세요</p>
				<p className="username">
					<span>{'아이보리아이보리아이보리아이보리아이보리아이보리아이보리아이보리'}</span>님
				</p>
			</div>
			<Link
				className="btn_header"
				href=""
			>
				<IconAlarm />
			</Link>
		</div>
	);
};

export default Main유저정보영역;
