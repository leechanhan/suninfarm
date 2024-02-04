import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout서브헤더영역 from '@component/layout/Layout서브헤더영역';
import Menu from '@component/frame/headerBtn/Menu';
import Swal from 'sweetalert2';
const FarmScreen = () => {
	const handlerTest = () => {
		Swal.fire({
			icon: 'warning',
			title: '안내',
			text: `서비스 준비중입니다.`,
			confirmButtonText: '확인',
		}).then((res) => {});
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
