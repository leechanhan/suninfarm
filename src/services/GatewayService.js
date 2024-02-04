import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class GatewayService extends ServiceManager {
	static REQUEST_MAPPING = '/gateway/';
	static URLS = {
		아라쇼_방송_일정: 'live/nextLive.json',
		베베팁: 'tip/getTipList.json',
	};

	static fetchLiveShowBroadcastSchedules() {
		return this.createGatewayRequest(this.URLS.아라쇼_방송_일정, HTTP.METHOD.GET, {});
	}

	static fetchBebeTip() {
		return this.createGatewayRequest(this.URLS.베베팁, HTTP.METHOD.GET, { viewGbnCd: 0 });
	}
}

export default GatewayService;
