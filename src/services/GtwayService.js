import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';
import UiUtils from '@lib/utils/date';
UiUtils;

class GatewayService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		리스트: 'gwlist?',
		상세: 'gethome?',
	};

	static getGatewayList() {
		return this.createRequest(this.URLS.리스트, HTTP.METHOD.GET, {});
	}
	static getGatewayDetail(data) {
		return this.createRequest(this.URLS.상세, HTTP.METHOD.GET, data);
	}
}

export default GatewayService;
