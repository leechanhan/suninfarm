import Layout기본헤더 from '@component/layout/Layout기본헤더';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomForms from '@component/etc/CustomForms';
import { openPage } from '@lib/hooks/common';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import CustomAlert from '@lib/alert';

const AgreementScreen = () => {
	const router = useRouter();
	const [agreeAll, setAgreeAll] = useState(false);
	const [agreeService, setAgreeService] = useState(false);
	const [agreePersnal, setAgreePersnal] = useState(false);
	const [agreeLocateInfo, setAgreeLocateInfo] = useState(false);
	const [agreeLocateService, setAgreeLocateService] = useState(false);

	const handlerAgreeAll = (agree) => {
		setAgreeAll(agree);
		setAgreeService(agree);
		setAgreePersnal(agree);
		setAgreeLocateInfo(agree);
		setAgreeLocateService(agree);
	};

	const handlerJoin = () => {
		if (agreeService && agreePersnal && agreeLocateInfo && agreeLocateService) {
			openPage('/join', router);
		} else {
			CustomAlert.error({
				html: '이용약관에 동의해주세요.',
				callback: () => {},
			});
		}
	};

	return (
		<div className="content_wrapper">
			<div className="agreeListWrap">
				<div className="agree">
					<CustomForms.Form체크박스
						label="전체 약관에 동의합니다."
						id="agreeAll"
						value={agreeAll}
						onChange={() => handlerAgreeAll(!agreeAll)}
					/>
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="서비스 이용약관"
						id="agreeService"
						value={agreeService}
						onChange={() => setAgreeService(!agreeService)}
					/>
					<span className="essential"> (필수)</span>

					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="개인정보 처리방침"
						id="agreePersnal"
						value={agreePersnal}
						onChange={() => setAgreePersnal(!agreePersnal)}
					/>
					<span className="essential"> (필수)</span>
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="위치정보 사업이용약관"
						id="agreeLocateInfo"
						value={agreeLocateInfo}
						onChange={() => setAgreeLocateInfo(!agreeLocateInfo)}
					/>
					<span className="essential"> (필수)</span>
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
				<div className="agree">
					<CustomForms.Form체크박스
						label="위치기반서비스 이용약관"
						id="agreeLocateService"
						value={agreeLocateService}
						onChange={() => setAgreeLocateService(!agreeLocateService)}
					/>
					<span className="essential"> (필수)</span>
					<img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/button_right.png`} />
				</div>
			</div>
			<div className="agree_confirm_wrap">
				<button
					className="agree_btn"
					onClick={() => handlerJoin()}
				>
					확인
				</button>
			</div>
		</div>
	);
};

AgreementScreen.Layout = Layout기본헤더;
AgreementScreen.headerOptions = {
	title: '이용약관',
	LeftButton: () => <Button뒤로가기 />,
};

AgreementScreen.isGnb = false;
export default AgreementScreen;
