import Layout기본헤더없음 from '@component/layout/Layout기본헤더없음';
import LoginForm from './components/LoginForm';

const LoginScreen = () => {
	return (
		<div className="content_wrapper">
			<LoginForm></LoginForm>
		</div>
	);
};

LoginScreen.Layout = Layout기본헤더없음;
LoginScreen.headerOptions = {
	title: '',
};

LoginScreen.isGnb = false;
export default LoginScreen;
