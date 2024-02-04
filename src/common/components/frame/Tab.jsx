import { createContext, useContext, useLayoutEffect, useState } from 'react';

const tabContext = createContext();
const Root = ({ children, defaultState }) => {
	const [tabState, setTabState] = useState(defaultState);
	return <tabContext.Provider value={{ tabState, setTabState }}>{children}</tabContext.Provider>;
};

const Header = ({ className, children, style = {} }) => {
	const { tabState, setTabState } = useContext(tabContext);
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
	const { tabState, setTabState } = useContext(tabContext);
	return (
		<button
			className={tabState === value ? `${className} ${activeClass}` : className}
			onClick={() => setTabState(value)}
			style={style}
		>
			{children}
		</button>
	);
};

const Panel = ({ children, className, activeState, style = {}, onActive = () => {}, isAllowUnmount = true }) => {
	const { tabState } = useContext(tabContext);
	const isActive = activeState === tabState;

	const isContentRender = isActive || (!isActive && !isAllowUnmount);

	useLayoutEffect(() => {
		if (isActive) {
			onActive();
		}
	}, [isActive]);

	return (
		<div
			className={className}
			style={activeState === tabState ? style : { ...style, display: 'none' }}
		>
			{isContentRender && (typeof children === 'function' ? children({ isActive }) : children)}
		</div>
	);
};

const Tab = { Root, Header, Link, Panel };

export default Tab;
