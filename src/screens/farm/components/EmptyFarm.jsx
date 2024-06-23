import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
const EmptyFarm = () => {
	const router = useRouter();
	return (
		<div className="farm_empty_wrap">
			<img
				className="farm_empty_wrap img"
				src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_add_farm.png`}
			/>
			<span className="farm_empty_wrap description">등록된 농장이 없습니다</span>
			<span className="farm_empty_wrap description">농장을 추가하십시오</span>
			<span className="farm_empty_wrap padding"></span>
		</div>
	);
};

export default EmptyFarm;
