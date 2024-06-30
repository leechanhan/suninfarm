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
		// 	const { data: result } = MemberQuery.getLogin({ usr_id: 'test', usr_pw: '1234' }, { suspense: true });
	});
	const handlerLogin = (e, usr_id, usr_pw) => {
		if (usr_id === '' || usr_pw === '') {
			Swal.fire({
				icon: 'warning',
				title: '안내',
				text: `아이디 혹은 비밀번호를 입력해주세요`,
				confirmButtonText: '확인',
			}).then((res) => {});
		} else {
			MemberService.getLogin({ usr_id, usr_pw })
				.then((res) => {
					console.log(`res`, res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		// };

		// const handlerLogin2 = async () => {
		// 	try {
		// 		const response = await axios
		// 			.post('http://ec2-3-39-131-167.ap-northeast-2.compute.amazonaws.com:8800/login', { usr_id: 'test', usr_pw: '1234' })
		// 			.then((response) => {
		// 				console.log('Response:', response.data);
		// 			})
		// 			.catch((error) => {
		// 				console.error('Error:', error);
		// 			});

		// 		console.log('Data:', response.data);
		// 	} catch (error) {
		// 		if (error.response) {
		// 			// 서버가 응답을 줬지만 2xx 응답이 아닌 경우
		// 			console.error('Response Error:', error.response.data);
		// 		} else if (error.request) {
		// 			// 서버가 응답을 못 준 경우
		// 			console.error('Request Error:', error.request);
		// 		} else {
		// 			// 요청을 보내기 전에 발생한 오류
		// 			console.error('Error:', error.message);
		// 		}
		// 	}
		//
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
					<CustomForms.Form체크박스
						label="로그인 상태유지"
						id=""
						onChange={setService}
						value={!service}
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
