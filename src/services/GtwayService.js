import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class GatewayService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		리스트: 'gwlist',
	};

	static getGatewayList({ usr_id }) {
		return this.createRequest(this.URLS.리스트, HTTP.METHOD.POST, { usr_id });
	}
}

export default GatewayService;
