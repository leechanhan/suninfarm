import { useCustomQuery } from '@lib/hooks/query';
import { QueryKeys } from '@constants/query';
import CounselingService from '@service/CounselingService';

const CounselingQuery = {
	useCopyright: (options = {}) => {
		const { data, isLoading } = useCustomQuery({
			queryKey: [...QueryKeys.상담_카피라이트],
			queryFn: () => CounselingQueryHandlers.extractCopyrightResponse(),
			...options,
		});
		return { data, isLoading };
	},
};

const CounselingQueryHandlers = {
	extractCopyrightResponse: async () => {
		try {
			const data = await CounselingService.fetchCopyright();
			return data;
		} catch (error) {
			return error;
		}
	},
};

export default CounselingQuery;
