import HighFunc from '@lib/function/hof';
import CustomError from '@lib/error';

export class QueryKeys {
	//ROOT

	static MANGOIS_QUERY_GROUP_ = ['MANGOIS_QUERY_GROUP_'];

	static IVORY_QUERY_GROUP = ['IVORY_QUERY_GROUP'];

	//CAMPAIGN CONTROLLER API
	static CAMPAIGN_GROUP = [...this.IVORY_QUERY_GROUP, 'CAMPAIGN_GROUP'];
	static 진행중인_캠페인_목록 = [...this.IVORY_QUERY_GROUP, 'ACTIVE_CAMPAIGN_LIST'];
	static 캠페인_상품_목록 = [...this.CAMPAIGN_GROUP, 'CAMPAIGN_PRODUCT_LIST'];
	static 캠페인_상품_상세 = [...this.CAMPAIGN_GROUP, 'CAMPAIGN_PRODUCT_DETAIL'];
	static 캠페인_브랜드_목록 = [...this.CAMPAIGN_GROUP, 'CAMPAIGN_BRAND_LIST'];
	static 캠페인_브랜드_상세 = [...this.CAMPAIGN_GROUP, 'CAMPAIGN_BRAND'];
	static 캠페인_가이드 = [...this.CAMPAIGN_GROUP, 'CAMPAIGN_GUIDE'];

	//REVIEW CONTROLLER API
	static REVIEW_QUERY_GROUP = [...this.IVORY_QUERY_GROUP, 'REVIEW_QUERY_GROUP'];
	static 리뷰_목록 = [...this.REVIEW_QUERY_GROUP, 'REVIEW_LIST'];
	static 리뷰_카테고리 = [...this.REVIEW_QUERY_GROUP, 'REVIEW_CATEGORY'];
	static 리뷰_픽 = [...this.REVIEW_QUERY_GROUP, 'REVIEW_PICK'];
	static 리뷰_픽_제품 = [...this.REVIEW_QUERY_GROUP, 'REVIEW_PICK_PRODUCT'];
	static 금주의_베스트_리뷰 = [...this.REVIEW_QUERY_GROUP, 'WEEKLY_BEST_REVIEW'];
	static 정성가득_리뷰어 = [...this.REVIEW_QUERY_GROUP, 'WEEKLY_BEST_REVIEWER]'];
	static 실시간_리뷰 = [...this.REVIEW_QUERY_GROUP, 'REALTIME_REVIEW'];
	static 실시간_리뷰_요약 = [...this.REVIEW_QUERY_GROUP, 'REALTIME_REVIEW_SUMMARY'];

	//GATEWAY API
	static GATEWAY_QUERY_GROUP = [...this.IVORY_QUERY_GROUP, 'GATEWAY_QUERY_GROUP'];
	static 아라쇼_방송_일정 = [...this.GATEWAY_QUERY_GROUP, 'ARASHOW_BROADCAST_SCHEDULE'];
	static 육아_꿀팁 = [...this.GATEWAY_QUERY_GROUP, 'BABY_USEFUL_TIP'];
	static 상담_카피라이트 = [...this.GATEWAY_QUERY_GROUP, 'COUNSEL_COPYRIGHT'];
	static 태담_추천_목록 = [...this.GATEWAY_QUERY_GROUP, 'TAEDAM_RECOMMEND_LIST'];
}

export class QueryOptions {
	static DEFAULT_CACHE_TIME = 1000 * 60 * 60;
	static DEFAULT_STALE_TIME = 1000 * 60 * 60 * 3;
	static DEFAULT_MUTATION_OPTION = {
		onSuccess: HighFunc.emptyVoidFunction,
		onFailure: CustomError.handler,
		onSettled: HighFunc.emptyVoidFunction,
	};
}
