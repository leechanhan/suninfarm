import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class MemberService extends ServiceManager {
	static REQUEST_MAPPING = '';
	static URLS = {
		가입: 'joinus?',
		로그인: 'login?',
	};
	static fetch;

	/**
	 * @param categoryNo 상품 카테고리 SEQ
	 * @return {Promise}
	 */

	static getLogin({ usr_id, usr_pw }) {
		return this.createRequest(this.URLS.로그인, HTTP.METHOD.GET, { usr_id, usr_pw });
	}

	static postJoin(data) {
		return this.createRequest(this.URLS.가입, HTTP.METHOD.GET, data);
	}

	static fetchCampaignProduct({ productCode }) {
		return this.createRequest(this.URLS.캠폐인_상품_상세_조회, HTTP.METHOD.GET, { productCode });
	}

	/**
	 *
	 * @param {'review' | 'search'} page
	 * @return {*}
	 */
	static fetchCampaignBrandList({ page }) {
		return this.createRequest(this.URLS.캠폐인_브랜드_목록, HTTP.METHOD.GET, { page });
	}

	static fetchCampaignBrand({ brandCode }) {
		return this.createRequest(this.URLS.캠폐인_브랜드_상세, HTTP.METHOD.GET, { brandCode });
	}

	static fetchActiveCampaignList() {
		return this.createRequest(this.URLS.활성_캠폐인_목록, HTTP.METHOD.GET, {});
	}

	static fetchCampaignGuide({ campainSeqNo }) {
		return this.createRequest(this.URLS.캠폐인_가이드, HTTP.METHOD.GET, { campainSeqNo });
	}

	static postFollowBrand({ brandCode, stCd }) {
		return this.createRequest(this.URLS.브랜드_팔로우, HTTP.METHOD.POST, { brandCode, stCd });
	}

	static postFollowUser({ targetId, stCd }) {
		return this.createRequest(this.URLS.유저_팔로우, HTTP.METHOD.POST, { targetId, stCd });
	}
}

export default MemberService;
