import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class CampaignService extends ServiceManager {
	static REQUEST_MAPPING = '/api/campain/';
	static URLS = {
		캠폐인_상품_목록_조회: 'products',
		캠폐인_상품_상세_조회: 'product',
		캠폐인_브랜드_목록: 'brands',
		캠폐인_브랜드_상세: 'brand',
		활성_캠폐인_목록: 'active',
		캠폐인_가이드: 'guide',
		브랜드_팔로우: 'followBrand',
		유저_팔로우: 'followUser',
	};
	static fetch;

	/**
	 * @param categoryNo 상품 카테고리 SEQ
	 * @return {Promise}
	 */
	static fetchCampaignProductList({ categoryNo }) {
		return this.createRequest(this.URLS.캠폐인_상품_목록_조회, HTTP.METHOD.GET, { exposureChk: 1, expCategoryNo: categoryNo });
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

export default CampaignService;
