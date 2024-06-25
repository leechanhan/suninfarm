import { vegetableArray } from '@constants/static';
import { openPage } from '@lib/hooks/common';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const VegetableList = ({ onSelectItem }) => {
	const router = useRouter();
	useEffect(() => {}, []);
	return (
		<div className="vegetable_list_wrap">
			<span className="title">재배 작물을 선택하시면 AI가 관리해 드립니다.</span>
			<ul className="vegetable_list">
				{vegetableArray.map((item, index) => (
					<button
						onClick={() => {
							onSelectItem(item);
						}}
						className="vegetable_item"
						key={index}
					>
						<img
							className=""
							src={item.imgPath}
							alt=""
						/>
						<span>{item.name}</span>
					</button>
				))}
			</ul>
		</div>
	);
};

export default VegetableList;
