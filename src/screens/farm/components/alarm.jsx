import { useRouter } from 'next/router';
const FarmAlarm = () => {
	const router = useRouter();
	return (
		<>
			<div className="alarm_wrap">
				<span className="alarm_title">알림</span>
				<span>신선하고 공기가 탁한 저녁 귀가 시 농장의 창문을 꼭 닫아주세요.</span>
			</div>
		</>
	);
};

export default FarmAlarm;
