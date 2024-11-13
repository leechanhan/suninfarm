import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class LightService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		리스트: 'getlight?',
		조명셋팅: 'setlight?',
		그룹조명셋팅: 'allsetlight?',

		테스트조명조회: 'getchannel?',
		테스트조명그룹제어: 'setgroup?',
		테스트조명개별제어: 'setchannel?',

		테스트알림조회: 'get6alarm?',
		태스트알림삭제: 'del6alarm?',
		테스트알림추가: 'add6alarm?',
		테스트조명개별제어4: 'setchannel?',
	};

	static getLightInfo({ ctr_ieee }) {
		return this.createRequest(this.URLS.리스트, HTTP.METHOD.GET, { ctr_ieee });
	}

	static putLightInfo(data) {
		return this.createRequest(this.URLS.조명셋팅, HTTP.METHOD.GET, data);
	}

	static putGtwayLightInfo(data) {
		return this.createRequest(this.URLS.그룹조명셋팅, HTTP.METHOD.GET, data);
	}
	static getTestLight() {
		return this.createRequestTest(this.URLS.테스트조명조회, HTTP.METHOD.GET, {});
	}
	static putTestLightGroup(data) {
		return this.createRequestTest(this.URLS.테스트조명그룹제어, HTTP.METHOD.GET, data);
	}
	static putTestLight(data) {
		return this.createRequestTest(this.URLS.테스트조명개별제어, HTTP.METHOD.GET, data);
	}

	static getTestAlarmList(data) {
		return this.createRequestTest(this.URLS.테스트알림조회, HTTP.METHOD.GET, data);
	}
	static deleteTestAlarm(data) {
		return this.createRequestTest(this.URLS.태스트알림삭제, HTTP.METHOD.GET, data);
	}
	static addTestAlarm(data) {
		return this.createRequestTest(this.URLS.테스트알림추가, HTTP.METHOD.GET, data);
	}
}
export default LightService;
