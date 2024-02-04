import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class MainService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		약관_조회: 'share/terms/list.json',
		이전_약관_조회: 'share/terms/previous.json',
	};

	/**
	 *
	 * @param frcsCustNo 고객ID
	 * @return {Promise}
	 */
	static fetchTerms({ frcsCustNo }) {
		return this.createRequest(this.URLS.약관_조회, HTTP.METHOD.POST, { frcsCustNo });
	}

	/**
	 *
	 * @param frcsCustNo 고객ID
	 * @param gbnCd 약관 FLAG
	 * @return {Promise}
	 */
	static fetchPreviousTerms({ frcsCustNo, gbnCd }) {
		return this.createRequest(this.URLS.이전_약관_조회, HTTP.METHOD.POST, { frcsCustNo, gbnCd });
	}
}

export default MainService;
