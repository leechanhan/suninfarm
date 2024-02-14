import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout서브헤더영역 from '@component/layout/Layout서브헤더영역';
import Menu from '@component/frame/headerBtn/Menu';
import { useState } from 'react';
import CustomAlert from '@lib/alert';
const SelectVegetableScreen = () => {
	const handlerTest = () => {
		CustomAlert.info({ html: '서비스 준비중입니다.', callback: () => {} });
	};
	return (
		<div className="content_wrapper">
			<div className="page_content">
				<button onClick={() => handlerTest()}>
					<img
						className="farm_test"
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/sample_select_veg.png`}
					/>
				</button>
			</div>
		</div>
	);
};

SelectVegetableScreen.Layout = Layout서브헤더영역;
SelectVegetableScreen.headerOptions = {
	LeftButton: () => <Menu />,
};
SelectVegetableScreen.isGnb = true;
SelectVegetableScreen.subtitle = true;

export default SelectVegetableScreen;
