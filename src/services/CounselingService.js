import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class CounselingService extends ServiceManager {
	static REQUEST_MAPPING = '/api/service/counseling/';
	static URLS = {
		메인_카피라이트_조회: 'customer/banner/content',
	};

	static fetchCopyright() {
		return this.createRequest(this.URLS.메인_카피라이트_조회, HTTP.METHOD.GET, {});
	}
}

export default CounselingService;
