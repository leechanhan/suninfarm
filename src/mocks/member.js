import MemberService from '@service/MemberService';
import { rest } from 'msw';
import { getMockPath } from './utils';
const memberListMock = {
	result: 'success',
};

const memberHandlers = () => {
	const controller = MemberService.REQUEST_MAPPING;
	return [
		rest.get(getMockPath(controller, MemberService.URLS.로그인), (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(memberListMock));
		}),
	];
};

export default memberHandlers();
