import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Layout서브헤더영역 from '@component/layout/Layout서브헤더영역';

const TestIndexScreen = () => {
	return (
		<div className="content_wrapper">
			<div className="page_content">
				<p>test</p>
			</div>
		</div>
	);
};

TestIndexScreen.Layout = Layout서브헤더영역;
TestIndexScreen.headerOptions = {
	title: '테스트헤더',
	LeftButton: () => <Button뒤로가기 />,
};
TestIndexScreen.isGnb = true;

export default TestIndexScreen;
