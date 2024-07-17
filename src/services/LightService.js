import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class LightService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		리스트: 'getlight?',
		조명셋팅: 'setlight?',
	};

	static getLightInfo({ ctr_ieee }) {
		return this.createRequest(this.URLS.리스트, HTTP.METHOD.GET, { ctr_ieee });
	}

	static putLightInfo(data) {
		return this.createRequest(this.URLS.조명셋팅, HTTP.METHOD.GET, data);
	}
}
export default LightService;
