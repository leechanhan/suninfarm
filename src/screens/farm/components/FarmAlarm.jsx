import { useRouter } from 'next/router';
const FarmAlarm = () => {
	const router = useRouter();
	return (
		<>
			<div className="alarm_wrap">
				<span className="alarm_title">AI 알림</span>
				<span>구름이 많고 강수확률이 높아 습도가 높으므로 습도 관리에 유의해주세요.🌦️</span>
			</div>
		</>
	);
};

export default FarmAlarm;
