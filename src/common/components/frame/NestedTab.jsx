import { useRouter } from 'next/router';
import { createContext, useContext, useLayoutEffect } from 'react';

const nestedTabContext = createContext();
const Root = ({ children, queryParam, defaultState }) => {
	const router = useRouter();
	const tabState = router.query?.[queryParam];
	const setTabState = (value) => {
		if (JSON.stringify(router.query) !== JSON.stringify({ ...router.query, [queryParam]: value })) {
			router.push(
				{
					pathname: router.pathname,
					query: { ...router.query, [queryParam]: value },
				},
				undefined,
				{ shallow: true },
			);
		}
	};

	return <nestedTabContext.Provider value={{ tabState, setTabState, defaultState }}>{children}</nestedTabContext.Provider>;
};

const Header = ({ className, children, style = {} }) => {
	const { tabState, setTabState } = useContext(nestedTabContext);
	return (
		<div
			className={className}
			style={style}
		>
			{typeof children === 'function' ? children({ tabState, setTabState }) : children}
		</div>
	);
};

const Link = ({ className, children, value, activeClass = '', style = {} }) => {
	const { tabState, setTabState, defaultState } = useContext(nestedTabContext);
	const isActive = value === tabState || (tabState === undefined && value === defaultState);
	return (
		<button
			className={isActive ? `${className} ${activeClass}` : className}
			onClick={() => setTabState(value)}
			style={style}
		>
			{children}
		</button>
	);
};

/**
 *

 * @param onActive //active가 될때 실행할 함수
 * @param isAllowUnmount //active가 아닐때 패널 내부 내용을 unmount할지 여부
 * @return {JSX.Element}
 * @constructor
 */
const Panel = ({ className, activeState, children, style = {}, onActive = () => {}, isAllowUnmount = true }) => {
	const { tabState, defaultState } = useContext(nestedTabContext);
	const isActive = activeState === tabState || (tabState === undefined && activeState === defaultState);

	const isContentRender = isActive || (!isAllowUnmount && !isActive);

	useLayoutEffect(() => {
		if (isActive) {
			onActive();
		}
	}, [isActive]);

	return (
		<div
			className={className}
			style={isActive ? style : { ...style, display: 'none' }}
		>
			{isContentRender && (typeof children === 'function' ? children({ isActive }) : children)}
		</div>
	);
};

const NestedTab = { Root, Header, Link, Panel };

export default NestedTab;
