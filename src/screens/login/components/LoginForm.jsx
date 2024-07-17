import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import Swal from 'sweetalert2';
import { getId } from 'react-uid/dist/es5/context';
import { useRouter } from 'next/router';
import { openPage } from '@lib/hooks/common';
import MemberQuery from '@queries/member';
import CustomForms from '@component/etc/CustomForms';
import QueryBoundary from '@component/boundary/QueryBoundary';
import MemberService from '@service/MemberService';
import axios from 'axios';
import CookieUtils from '@lib/utils/cookie';
import CustomAlert from '@lib/alert';

const LoginForm = () => {
	const router = useRouter();
	const [service, setService] = useState(false);
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');

	const onChangeId = (e) => {
		setId(e.target.value);
	};

	const onChangePw = (e) => {
		setPw(e.target.value);
	};

	useEffect(() => {
		if (CookieUtils.getCookie('usr_id')?.length > 0) {
			router.push('/farm/list');
		}
	});

	const handlerLogin = async (e, usr_id, usr_pw) => {
		e.preventDefault();
		if (usr_id === '' || usr_pw === '') {
			CustomAlert.error({
				html: `아이디 혹은 비밀번호를 입력해주세요`,
				callback: () => {},
			});
		} else {
			MemberService.getLogin({ usr_id, usr_pw })
				.then((res) => {
					console.log(`res`, res);
					if (res.result !== 'success') {
						CustomAlert.error({
							html: res?.reason,
							callback: () => {},
						});
					} else {
						CookieUtils.setCookie('usr_id', usr_id, 365);
						router.push('/farm/list');
					}
				})
				.catch((err) => {
					console.log(err);
					CookieUtils.setCookie('usr_id', usr_id, 365);
				});
		}
	};
	return (
		<div className="login_wrap">
			<div className="form_wrap">
				<img
					className="logo"
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_mid.png`}
				/>
				<input
					className="form_wrap input"
					type="text"
					placeholder="ID"
					value={id}
					onChange={onChangeId}
				/>
				<input
					className="form_wrap input"
					type="password"
					placeholder="PW"
					value={pw}
					onChange={onChangePw}
				/>
				<div className="login_bottom_menu">
					<CustomForms.Form체크박스
						label="로그인 상태유지"
						id="auto_login"
						value={service}
						onChange={() => setService(!service)}
					/>
					<p className="join">&nbsp;&nbsp;|</p>
					<p className="join">아이디/비밀번호 찾기</p>
				</div>
				<button
					className="login_button"
					onClick={(e) => handlerLogin(e, id, pw)}
				>
					로그인
				</button>
				<button
					className="join_button"
					onClick={() => openPage('/agreement', router)}
				>
					회원가입
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
