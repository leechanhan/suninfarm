import { useRouter } from 'next/router';
import AndroidUtils from '@lib/utils/android';
import NativeBridge from '@lib/mobile/bridge';

const useNativeRouter = () => {
	const router = useRouter();

	const openNewWindow = (path) => {
		if (AndroidUtils.isAppRunning()) {
			NativeBridge.openNewWindow(path);
		} else {
			router.push(path);
		}
	};

	return { ...router, openNewWindow };
};

export default useNativeRouter;
