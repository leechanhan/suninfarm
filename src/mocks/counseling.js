import { rest } from 'msw';
import { getMockPath } from './utils';
import CounselingService from '@service/CounselingService';

const CounselingCopyrightMock = {
	resCd: '0000',
	resMsg: '정상',
	result: {
		customerCounselingInfo: {
			custNo: 'Chg121500',
			step: '4~6개월령 육아',
			bannerContent: '우리 아기, 잘 크고 있을까?',
		},
	},
};

const counselingHandlers = () => {
	const controller = CounselingService.REQUEST_MAPPING;
	return [
		rest.get(getMockPath(controller, CounselingService.URLS.메인_카피라이트_조회), (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(CounselingCopyrightMock));
		}),
	];
};

export default counselingHandlers();
