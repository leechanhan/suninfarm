import { useCustomMutation, useCustomQuery } from '@lib/hooks/query';
import { QueryKeys } from '@constants/query';
import CampaignService from '@service/CampaignService';
import { useQueryClient } from '@tanstack/react-query';
import MemberService from '@service/MemberService';
import GatewayService from '@service/GatewayService';

const GtwayQuery = {
	// getList: ({ usr_id }, options = {}) => {
	// 	const { data, isLoading } = useCustomQuery({
	// 		queryKey: [...QueryKeys.GATEWAY_QUERY_GROUP],
	// 		queryFn: () => GtwayQueryHandler.extractGetListResponse({ usr_id }),
	// 		...options,
	// 	});
	// 	return { data, isLoading };
	// },
	// useProduct: ({ productCode }, options = {}) => {
	// 	const { data, isLoading } = useCustomQuery({
	// 		queryKey: [...QueryKeys.캠페인_상품_상세, productCode],
	// 		queryFn: () => CampaignQueryHandler.extractCampaignProductDetailResponse({ productCode }),
	// 		...options,
	// 	});
	// 	return { data, isLoading };
	// },
	// useBrandList: (options = {}) => {
	// 	const { data, isLoading } = useCustomQuery({
	// 		queryKey: [...QueryKeys.캠페인_브랜드_목록],
	// 		queryFn: () => CampaignQueryHandler.extractCampaignBrandListResponse(),
	// 		...options,
	// 	});
	// 	return { data, isLoading };
	// },
	// useBrand: ({ brandCode }, options = {}) => {
	// 	const { data, isLoading } = useCustomQuery({
	// 		queryKey: [...QueryKeys.캠페인_브랜드_상세, brandCode],
	// 		queryFn: () => CampaignQueryHandler.extractCampaignBrandResponse({ brandCode }),
	// 		...options,
	// 	});
	// 	return { data, isLoading };
	// },
	// useActiveCampaignList: (options = {}) => {
	// 	const { data, isLoading } = useCustomQuery({
	// 		queryKey: [...QueryKeys.진행중인_캠페인_목록],
	// 		queryFn: () => CampaignQueryHandler.extractActiveCampaignListResponse(),
	// 		...options,
	// 	});
	// 	return { data, isLoading };
	// },
	// useCampaignGuide: ({ campaignSeqNo }, options = {}) => {
	// 	const { data, isLoading } = useCustomQuery({
	// 		queryKey: [...QueryKeys.캠페인_가이드, campaignSeqNo],
	// 		queryFn: () => CampaignQueryHandler.extractCampaignGuideResponse({ campaignSeqNo }),
	// 		...options,
	// 	});
	// 	return { data, isLoading };
	// },
	// useFollowBrand: (options = {}) => {
	// 	const { mutate } = useCustomMutation({
	// 		mutationFn: ({ brandCode, stCd }) => CampaignService.postFollowBrand({ brandCode, stCd }),
	// 		...options,
	// 	});
	// 	return mutate;
	// },
	// useFollowUser: (options = {}) => {
	// 	const { mutate } = useCustomMutation({
	// 		mutateFn: ({ targetId, stCd }) => CampaignService.postFollowUser({ targetId, stCd }),
	// 		...options,
	// 	});
	// 	return mutate;
	// },
	// useClear: () => {
	// 	const queryClient = useQueryClient();
	// 	return () => queryClient.invalidateQueries([...QueryKeys.CAMPAIGN_GROUP]);
	// },
	// useClearBrand: () => {
	// 	const queryClient = useQueryClient();
	// 	const invalidatedKeys = [QueryKeys.캠페인_브랜드_목록, QueryKeys.캠페인_브랜드_상세];
	// 	return () =>
	// 		invalidatedKeys.forEach((queryKey) => {
	// 			queryClient.invalidateQueries([...queryKey]);
	// 		});
	// },
};

const GtwayQueryHandler = {
	extractGetListResponse: async ({ usr_id }) => {
		const { result = '' } = await GtwayQuery.getList({ usr_id });
		return result;
	},
};

export default GtwayQuery;
