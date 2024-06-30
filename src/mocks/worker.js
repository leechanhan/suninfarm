import { setupWorker } from 'msw';
import { setupServer } from 'msw/node';

import { combineMockHandlers } from './utils';
import mainHandlers from './main';
import customerHandlers from './customer';
import shopHandlers from './shop';
import reviewHandlers from './review';
import campaignHandlers from './campaign';
import taedamHandlers from './taedam';
import counselingHandlers from './counseling';
import gatewayHandlers from './gateway';
import memberHandlers from './member';

const mockHandlers = combineMockHandlers(
	mainHandlers,
	customerHandlers,
	shopHandlers,
	reviewHandlers,
	campaignHandlers,
	gatewayHandlers,
	taedamHandlers,
	counselingHandlers,
	memberHandlers,
);
export const mockWorker = setupWorker(...mockHandlers);
export const mockServer = setupServer(...mockHandlers);
