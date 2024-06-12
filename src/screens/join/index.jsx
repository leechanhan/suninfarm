import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { openPage } from '@lib/hooks/common';
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
		id: '',
		pw: '',
		name: '',
		email: '',
		phone: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log('join', name, value);
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		Swal.fire({
			icon: 'success',
			title: '안내',
			text: `회원가입을 축하합니다.\n농장추가 화면으로 이동합니다.`,
			confirmButtonText: '확인',
		}).then((res) => {
			openPage('/addFarm', router);
		});
	};

	useEffect(() => {}, []);
	return (
		<div className="content_wrapper">
			<form onSubmit={handleSubmit}>
				<div className="logoColorWrap">
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_color_mid.png`} />
				</div>
				<div className="formWrap">
					<span className="formTitle">회원가입</span>
					<input
						type="text"
						placeholder="ID"
						name="id"
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="PW"
						name="pw"
						onChange={handleChange}
					/>
					<input
						type="text"
						name="name"
						placeholder="Name"
						onChange={handleChange}
					/>
					<input
						type="text"
						name="email"
						placeholder="E-mail"
						onChange={handleChange}
					/>
					<input
						type="text"
						name="phone"
						placeholder="Phone"
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
