import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
const EmptyFarm = () => {
	const router = useRouter();
	return (
		<>
			<img
				className="farmWrap img"
				src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_add_farm.png`}
			/>
			<span className="farmWrap description">등록된 농장이 없습니다</span>
			<span className="farmWrap description">농장을 추가하십시오</span>
			<span className="farmWrap padding"></span>
			<div className="addFarmBtn">
				<img
					className="addFarmBtn img"
					src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/icon_add.png`}
					alt="addFarm"
				/>
				<button
					className="addFarmBtn button"
					onClick={() => {}}
				>
					농장추가
				</button>
			</div>
		</>
	);
};

export default EmptyFarm;