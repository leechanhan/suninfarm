import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

const ReviewIndex = () => {
	const router = useRouter();
	useLayoutEffect(() => {
		router.replace('/review/list');
	}, []);

	return null;
};

export default ReviewIndex;
