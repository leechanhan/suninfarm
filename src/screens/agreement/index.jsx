import Layout기본헤더 from '@component/layout/Layout기본헤더';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomForms from '@component/etc/CustomForms';
import { openPage } from '@lib/hooks/common';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Button자유함수 from '@component/frame/headerBtn/Button자유함수';
const AgreementScreen = () => {
	const router = useRouter();
	const [agreeAll, setAgreeAll] = useState(false);
	const [agreeService, setAgreeService] = useState(false);
	const [agreePersnal, setAgreePersnal] = useState(false);
	const [agreeLocateInfo, setAgreeLocateInfo] = useState(false);
	const [agreeLocateService, setAgreeLocateService] = useState(false);

	return (
		<div className="content_wrapper">
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
						onChange={setAgreeService}
						value={!agreeService}
					/>

					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="개인정보 처리방침 (필수)"
						id="agreePersnal"
						onChange={setAgreePersnal}
						value={!agreeLocateInfo}
					/>

					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="위치정보 사업이용약관(필수)"
						id="agreeLocateInfo"
						onChange={setAgreeLocateInfo}
						value={!agreeLocateInfo}
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
			<button
				className="agreeConfirm"
				onClick={() => openPage('/join', router)}
			>
				확인
			</button>
		</div>
	);
};

AgreementScreen.Layout = Layout기본헤더;
AgreementScreen.headerOptions = {
	title: '이용약관',
	LeftButton: () => <Button뒤로가기 />,
	// RightButton: () => <Button자유함수 imgpath={'/images/png/button_right.png'} />,
};

AgreementScreen.isGnb = false;
export default AgreementScreen;
