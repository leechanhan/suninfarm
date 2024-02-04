import { useEffect, useState } from 'react';
import { flatten } from 'lodash/array';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export const ResponseModel = {
	resCd: '0000',
	resMsg: '정상',
	result: null,
};
export const getMockPath = (controller, path) => {
	const hostname = process.env.NEXT_PUBLIC_API_PATH;
	return `${hostname}${controller}${path}`;
};
export const combineMockHandlers = (...handlers) => {
	return flatten([...handlers]);
};

export const MockViewer = ({ response, dataName = 'response' }) => {
	console.log(`${dataName} :`, response);

	return (
		<details>
			<summary>
				<strong style={{ color: 'red' }}>{dataName}</strong>
			</summary>
			<JsonView
				data={response}
				shouldExpandNode={allExpanded}
				style={defaultStyles}
			/>
		</details>
	);
};

export const useMsw = () => {
	const [isMswPrepared, setIsMswPrepared] = useState(false);
	const isUseMsw = process.env.NEXT_PUBLIC_DEPLOY_MODE !== 'production' && process.env.NEXT_PUBLIC_MOCKING_ON === 'true';
	useEffect(() => {
		(async () => {
			if (isUseMsw) {
				if (typeof window === 'undefined') {
					const { mockServer } = await import('../mocks/worker');
					mockServer.listen();
				} else {
					const { mockWorker } = await import('../mocks/worker');
					await mockWorker.start();
				}
			}
		})().then(() => {
			setIsMswPrepared(true);
		});
	}, []);

	return { isMswPrepared, isUseMsw };
};
