import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import CustomAlert from '@lib/alert';
import { openPage } from '@lib/hooks/common';
import CookieUtils from '@lib/utils/cookie';
import MemberService from '@service/MemberService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const JoinScreen = () => {
	const router = useRouter();
	const [agreeAll, setAgreeAll] = useState(false);
	const [agreeService, setAgreeService] = useState(false);
	const [agreePersnal, setAgreePersnal] = useState(false);
	const [agreeLocateInfo, setAGreeLocateInfo] = useState(false);
	const [agreeLocateService, setAgreeLocateService] = useState(false);

	const [formData, setFormData] = useState({
		usr_id: '',
		usr_pw: '',
		usr_addr: 'no address',
		usr_name: '',
		usr_email: '',
		usr_phone: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		MemberService.postJoin(formData)
			.then((res) => {
				console.log(`res`, res);
				if (res.result !== 'success') {
					CustomAlert.error({
						html: res?.reason,
						callback: () => {},
					});
				} else {
					CustomAlert.success({
						html: `${formData.usr_name}님 회원가입을 축하드립니다.\n농장추가 화면으로 이동헙니다.`,
						callback: () => {
							CookieUtils.setCookie('usr_id', formData.usr_id, 365);
							openPage('/farm/list', router);
						},
					});
				}
			})
			.catch((error) => {});
	};

	useEffect(() => {}, []);
	return (
		<div className="content_wrapper">
			<form onSubmit={handleSubmit}>
				<div className="logoColorWrap">
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_color_mid.png`} />
				</div>
				<div className="form_wrap">
					<span className="formTitle">회원가입</span>
					<input
						required
						type="text"
						placeholder="ID"
						name="usr_id"
						onChange={handleChange}
					/>
					<input
						required
						type="password"
						placeholder="PW"
						name="usr_pw"
						onChange={handleChange}
					/>
					<input
						type="hidden"
						name="usr_addr"
						value={'no address'}
					/>
					<input
						required
						type="text"
						name="usr_name"
						placeholder="Name"
						onChange={handleChange}
					/>
					<input
						required
						type="email"
						name="usr_email"
						placeholder="E-mail"
						onChange={handleChange}
					/>
					<input
						required
						type="number"
						name="usr_phone"
						placeholder="Phone ( - ) 제외하고 입력"
						onChange={handleChange}
					/>
					<button type="submit">회원가입</button>
				</div>
			</form>
		</div>
	);
};

JoinScreen.Layout = Layout기본헤더없음;
JoinScreen.headerOptions = {
	title: '',
};

JoinScreen.isGnb = false;
export default JoinScreen;
