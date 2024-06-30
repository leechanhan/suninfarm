import { useCustomQuery } from '@lib/hooks/query';
import { QueryKeys } from '@constants/query';
import GatewayService from '@service/GatewayService';

const GatewayQuery = {
	useLiveShowBroadCastSchedules: (options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.아라쇼_방송_일정],
			queryFn: () => GatewayQueryHandlers.extractLiveShowBroadcastScheduleResponse(),
			...options,
		});
		return { data, isLoading };
	},

	useBebeTips: (options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.육아_꿀팁],
			queryFn: () => GatewayQueryHandlers.extractBebeTipsResponse(),
			...options,
		});
		return { data, isLoading };
	},
};

const GatewayQueryHandlers = {
	extractLiveShowBroadcastScheduleResponse: async () => {
		try {
			const data = await GatewayService.fetchLiveShowBroadcastSchedules();
			return data?.data?.nextLiveList ?? [];
		} catch (error) {
			return error;
		}
	},

	extractBebeTipsResponse: async () => {
		try {
			const data = await GatewayService.fetchBebeTip();
			return data;
		} catch (error) {
			return error;
		}
	},
};

export default GatewayQuery;
