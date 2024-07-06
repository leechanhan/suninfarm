import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';
import UiUtils from '@lib/utils/date';
UiUtils;

class GatewayService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		리스트: 'gwlist',
	};

	static getGatewayList() {
		return this.createRequest(this.URLS.리스트, HTTP.METHOD.POST, {});
	}
}

export default GatewayService;
