import ServiceManager from '@lib/service';
import { HTTP } from '@lib/constant';

class ReviewService extends ServiceManager {
	static REQUEST_MAPPING = '/api/review/';
	static URLS = {
		리뷰_목록_조회: 'list',
		카테고리_조회: 'categories',
		맘스픽_조회: 'picks',
		금주의_베스트_리뷰_조회: 'ranks',
		정성가득_리뷰어: 'rankers',
		실시간_리뷰_조회: 'realtime',
		픽제품: 'getPickInfo',
	};

	/**
	 *
	 * @param parentCategoryNo
	 * @param categoryNo1
	 * @param categoryNo2
	 * @return {Promise}ㅑ
	 */
	static fetchList({ parentCategoryNo, categoryNo1, categoryNo2 }) {
		return this.createRequest(this.URLS.리뷰_목록_조회, HTTP.METHOD.GET, { parentCategoryNo, categoryNo1, categoryNo2 });
	}
	/**
	 *
	 * @param categoryNo2
	 * @return {Promise}
	 */
	static fetchCategories() {
		return this.createRequest(this.URLS.카테고리_조회, HTTP.METHOD.GET, {});
	}

	static fetchMomsPick() {
		return this.createRequest(this.URLS.맘스픽_조회, HTTP.METHOD.GET, {});
	}

	/**
	 *
	 * @param detailYn 생략시 목록용 조회, Y=상세용 조회
	 * @return {*}
	 */
	static fetchWeeklyBestReview({ detailYn = 'N' }) {
		return this.createRequest(this.URLS.금주의_베스트_리뷰_조회, HTTP.METHOD.GET, { detail: detailYn });
	}

	/**
	 * @deprecated
	 * @return {*}
	 */
	static fetchWeeklyBestReviewer() {
		return this.createRequest(this.URLS.정성가득_리뷰어, HTTP.METHOD.GET, {});
	}

	/**
	 * @deprecated
	 * @param pickSeqNo
	 * @return {*}
	 */
	static fetchPickProductList({ pickSeqNo }) {
		return this.createRequest(this.URLS.픽제품, HTTP.METHOD.GET, { pickSeqNo });
	}

	/**
	 * @param seqNo
	 * @return {*}
	 */
	static fetchRealtimeReview({ seqNo }) {
		return this.createRequest(this.URLS.실시간_리뷰_조회, HTTP.METHOD.GET, { seqNo });
	}
}

export default ReviewService;
