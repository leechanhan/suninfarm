import React, { useState } from 'react';
import Checkbox from './Checkbox';
import Swal from 'sweetalert2';
import { getId } from 'react-uid/dist/es5/context';
import { useRouter } from 'next/router';

const LoginForm = () => {
	const router = useRouter();
	const [service, setService] = useState(false);
	const [id, setId] = useState('Suninform');
	const [pw, setPw] = useState('');

	const onChangeId = (e) => {
		setId(e.target.value);
	};

	const onChangePw = (e) => {
		setPw(e.target.value);
	};
	const handlerLogin = (id, pw) => {
		if (id === '' || pw === '') {
			Swal.fire({
				icon: 'warning',
				title: '안내',
				text: `아이디 혹은 비밀번호를 입력해주세요`,
				confirmButtonText: '확인',
			}).then((res) => {});
		} else {
			router.push('/farm');
		}
	};

	return (
		<div className="login_wrap">
			<div className="form_wrap">
				<img
					className="logo"
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_small.png`}
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
					<Checkbox
						className="auto_login"
						checked={service}
						onChange={setService}
					>
						로그인 상태유지
					</Checkbox>
					<p className="join">&nbsp;|&nbsp;</p>
					<p className="join">아이디/비밀번호 찾기</p>
				</div>
				<button
					className="login_button"
					onClick={() => handlerLogin(id, pw)}
				>
					로그인
				</button>
				<button className="join_button">회원가입</button>
			</div>
		</div>
	);
};

export default LoginForm;
