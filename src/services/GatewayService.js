import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class GatewayService extends ServiceManager {
	static REQUEST_MAPPING = '/gateway/';
	static URLS = {
		아라쇼_방송_일정: 'live/nextLive.json',
		추가: 'addgw?',
	};

	static postGateway(data) {
		return this.createRequest(this.URLS.추가, HTTP.METHOD.GET, data);
	}

	static fetchBebeTip() {
		return this.createGatewayRequest(this.URLS.베베팁, HTTP.METHOD.GET, { viewGbnCd: 0 });
	}
}

export default GatewayService;
