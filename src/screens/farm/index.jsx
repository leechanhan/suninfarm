import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout서브헤더영역 from '@component/layout/Layout서브헤더영역';
import Menu from '@component/frame/headerBtn/Menu';
import { useRouter } from 'next/router';

const FarmScreen = () => {
	const rounter = useRouter();
	const handlerTest = () => {
		rounter.push('/detail');
	};

	return (
		<div className="content_wrapper">
			<div className="page_content">
				<button onClick={() => handlerTest()}>
					<img
						className="farm_test"
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/sample_farm.png`}
					/>
				</button>
			</div>
		</div>
	);
};

FarmScreen.Layout = Layout서브헤더영역;
FarmScreen.headerOptions = {
	title: 'SuninFarm',
	LeftButton: () => <Menu />,
};
FarmScreen.isGnb = false;

export default FarmScreen;
