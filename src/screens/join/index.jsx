import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomForms from '@component/etc/CustomForms';
const JoinScreen = () => {
	const router = useRouter();
	const [agreeAll, setAgreeAll] = useState(false);
	const [agreeService, setAgreeService] = useState(false);
	const [agreePersnal, setAgreePersnal] = useState(false);
	const [agreeLocateInfo, setAGreeLocateInfo] = useState(false);
	const [agreeLocateService, setAgreeLocateService] = useState(false);
	useEffect(() => {}, []);
	return (
		<div className="content_wrapper">
			<div className="white_header">
				<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_left.png`} />
				<span>이용약관</span>
			</div>
			<div className="agreeListWrap">
				<div className="agree">
					<CustomForms.Form체크박스
						label="전체 약관에 동의합니다."
						id="agreeAll"
						onChange={setAgreeAll}
						value={!agreeAll}
					/>
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="서비스 이용약관 (필수)"
						id="agreeService"
						onChange={setAgreePersnal}
						value={!agreePersnal}
					/>

					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="개인정보 처리방침 (필수)"
						id="agreePersnal"
						onChange={setAGreeLocateInfo}
						value={!agreeLocateInfo}
					/>

					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="위치정보 사업이용약관(필수)"
						id="agreeLocateInfo"
						onChange={setAgreeAll}
						value={!agreeAll}
					/>

					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="위치기반서비스 이용약관(필수)"
						id="agreeLocateService"
						onChange={setAgreeLocateService}
						value={!agreeLocateService}
					/>

					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
			</div>
			<div></div>
			<button className="agreeConfirm">확인</button>
		</div>
	);
};

JoinScreen.Layout = Layout기본헤더없음;
JoinScreen.headerOptions = {
	title: '',
};

JoinScreen.isGnb = false;
export default JoinScreen;
