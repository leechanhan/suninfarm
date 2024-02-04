import React, { Suspense, useEffect, useState } from 'react';
import MainService from '@service/MainService';

const TermsIndexScreen = () => {
	const [response, setResponse] = useState({});

	useEffect(() => {
		MainService.fetchTerms({ frcsCustNo: 'easd25' })
			.then((res) => {
				setResponse(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Suspense fallback={<></>}>
			<div>하이</div>
		</Suspense>
	);
};

export default TermsIndexScreen;
