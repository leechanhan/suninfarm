const MainQuery = {
	useTerms: ({ frcsCustNo }, options = {}) => {},

	usePreviousTerms: ({ frcsCustNo, gbnCd }, options = {}) => {},
};

const MainQueryHandlers = {
	extractTermsRequest: ({ frcsCustNo }) => {},
};

export default MainQuery;
