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
			router.push('/farmListScreen');
		}
	};

	return (
		<>
			<div className="login_form_wrap">
				<img
					className="icon"
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_human.png`}
				/>
				<input
					type="text"
					placeholder="아이디"
					value={id}
					onChange={onChangeId}
				/>
				<img
					className="icon"
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_delete.png`}
				/>
			</div>
			<div className="login_form_wrap">
				<img
					className="icon"
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_key.png`}
				/>
				<input
					type="password"
					placeholder="비밀번호"
					value={pw}
					onChange={onChangePw}
				/>
				<img
					className="icon"
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_delete.png`}
				/>
			</div>
			<button
				className="login_button"
				onClick={() => handlerLogin(id, pw)}
			>
				로그인
			</button>
			<div className="login_bottom_menu">
				<Checkbox
					className="auto_login"
					checked={service}
					onChange={setService}
				>
					로그인 유지
				</Checkbox>
				<p className="join">회원가입</p>
				<p>정보찾기</p>
			</div>
		</>
	);
};

export default LoginForm;
