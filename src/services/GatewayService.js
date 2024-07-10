import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class GatewayService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		삭제: 'delgw?',
		추가: 'addgw?',
	};

	static postGateway(data) {
		return this.createRequest(this.URLS.추가, HTTP.METHOD.GET, data);
	}

	static deleteGateway(data) {
		return this.createRequest(this.URLS.삭제, HTTP.METHOD.GET, data);
	}
}

export default GatewayService;
