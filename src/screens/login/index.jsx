import Layout서브헤더영역 from '@component/layout/Layout서브헤더영역';
import LoginForm from './components/LoginForm';

const LoginScreen = () => {
	return (
		<div className="content_wrapper">
			<div className="page_content">
				<div className="login_img_wrap">
					<img
						className="logo"
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_logo_green.png`}
					/>
					<img
						className="bg"
						src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/png/img_farm_bg.png`}
					/>
				</div>
				<LoginForm></LoginForm>
			</div>
		</div>
	);
};

LoginScreen.Layout = Layout서브헤더영역;
LoginScreen.headerOptions = {
	title: '',
};
LoginScreen.isGnb = false;

export default LoginScreen;
