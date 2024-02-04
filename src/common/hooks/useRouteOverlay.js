import { useRouter } from 'next/router';

const useRouteOverlay = (searchParamKey, searchParamValue) => {
	const router = useRouter();

	return {
		setOverlay: (value) => {
			router.push(
				{
					pathname: router.pathname,
					query: { ...router.query, [searchParamKey]: value },
				},
				undefined,
				{ shallow: true },
			);
		},
		open: () => {
			router.push(
				{
					pathname: router.pathname,
					query: { ...router.query, [searchParamKey]: searchParamValue },
				},
				undefined,
				{ shallow: true },
			);
		},
		close: () => {
			router.back();
		},
		isOverlayActive: router.query[searchParamKey] === searchParamValue,
	};
};

export default useRouteOverlay;
