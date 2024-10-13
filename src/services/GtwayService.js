import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';
import UiUtils from '@lib/utils/date';
UiUtils;

class GatewayService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		리스트: 'gwlist?',
		상세: 'gethome?',
		알람목록: 'getalarm?',
		알람추가: 'setalarm?',
		알람수정: 'modifyalarm?',
		알람삭제: 'deletealarm?',
	};

	static getGatewayList() {
		return this.createRequest(this.URLS.리스트, HTTP.METHOD.GET, {});
	}
	static getGatewayDetail(data) {
		return this.createRequest(this.URLS.상세, HTTP.METHOD.GET, data);
	}
	static getAlarmList(data) {
		return this.createRequest(this.URLS.알람목록, HTTP.METHOD.GET, data);
	}
	static modifyAlarm(data) {
		return this.createRequest(this.URLS.알람수정, HTTP.METHOD.GET, data);
	}
	static addAlarm(data) {
		return this.createRequest(this.URLS.알람추가, HTTP.METHOD.GET, data);
	}
	static deleteAlarm(data) {
		return this.createRequest(this.URLS.알람삭제, HTTP.METHOD.GET, data);
	}
}

export default GatewayService;
