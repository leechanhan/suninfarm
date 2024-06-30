import { useCustomQuery } from '@lib/hooks/query';
import { QueryKeys } from '@constants/query';
import ReviewService from '@service/ReviewService';

const ReviewQuery = {
	useList: ({ parentCategoryNo, categoryNo1, categoryNo2 }, options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.리뷰_목록, parentCategoryNo, categoryNo1, categoryNo2],
			queryFn: () => ReviewQueryHandler.extractReviewListResponse({ parentCategoryNo, categoryNo1, categoryNo2 }),
			...options,
		});
		return { data, isLoading };
	},

	useRealtimeReviewListSummary: (options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.실시간_리뷰_요약],
			queryFn: () => ReviewQueryHandler.extractRealtimeReviewListSummaryResponse(),
			...options,
		});
		return { data, isLoading };
	},

	useRealtimeReviewList: ({ seqNo }, options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.실시간_리뷰, seqNo],
			queryFn: () => ReviewQueryHandler.extractRealtimeReviewResponse({ seqNo }),
			...options,
		});
		return { data, isLoading };
	},

	useCategories: (options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.리뷰_카테고리],
			queryFn: () => ReviewQueryHandler.extractReviewCategoryResponse(),
			...options,
		});
		return { data, isLoading };
	},

	usePicks: (options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.리뷰_픽],
			queryFn: () => ReviewQueryHandler.extractMomsPickResponse(),
			...options,
		});
		return { data, isLoading };
	},

	useBestReview: ({ detailYn }, options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.금주의_베스트_리뷰, detailYn],
			queryFn: () => ReviewQueryHandler.extractWeeklyBestReviewResponse({ detailYn }),
			...options,
		});
		return { data, isLoading };
	},

	useBestReviewer: (options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.정성가득_리뷰어],
			queryFn: () => ReviewQueryHandler.extractBestReviewerResponse(),
			...options,
		});
		return { data, isLoading };
	},
	usePickProductList({ pickSeqNo }, options = {}) {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.리뷰_픽_제품, pickSeqNo],
			queryFn: () => ReviewQueryHandler.extractPickProductResponse({ pickSeqNo }),
			...options,
		});
		return { data, isLoading };
	},
};

const ReviewQueryHandler = {
	extractReviewListResponse: async ({ parentCategoryNo, categoryNo1, categoryNo2 }) => {
		const { productList = [] } = await ReviewService.fetchList({ parentCategoryNo, categoryNo1, categoryNo2 });
		return productList;
	},

	extractRealtimeReviewListSummaryResponse: async () => {
		const { reviewList = [] } = await ReviewService.fetchList({ categoryNo1: 0 });
		return reviewList;
	},

	extractRealtimeReviewResponse: async ({ seqNo }) => {
		const { reviewDetailList = [] } = await ReviewService.fetchRealtimeReview({ seqNo });
		return reviewDetailList;
	},
	extractReviewCategoryResponse: async () => {
		const { categoryList = [] } = await ReviewService.fetchCategories();
		return categoryList;
	},

	extractMomsPickResponse: async () => {
		const { pickList = [] } = await ReviewService.fetchMomsPick();
		return pickList;
	},

	extractWeeklyBestReviewResponse: async ({ detailYn }) => {
		const { bestReviewList = [] } = await ReviewService.fetchWeeklyBestReview({ detailYn });
		return bestReviewList;
	},
	extractBestReviewerResponse: async () => {
		const { rankers = [] } = await ReviewService.fetchWeeklyBestReviewer();
		return rankers;
	},
	extractPickProductResponse: async ({ pickSeqNo }) => {
		const { pick_pdt_list = [] } = await ReviewService.fetchPickProductList({ pickSeqNo });
		return pick_pdt_list;
	},
	test: async ({ pickSeqNo }) => {
		const { pick_pdt_list = [] } = await ReviewService.fetchPickProductList({ pickSeqNo });
		return pick_pdt_list;
	},
};

export default ReviewQuery;
