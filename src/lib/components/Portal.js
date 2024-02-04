import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';

const useDidUpdate = (effect, deps) => {
	const hasMounted = useRef(false);

	useEffect(() => {
		if (hasMounted.current) {
			effect();
		} else {
			hasMounted.current = true;
		}
	}, deps);
};

const Portal = ({ children, portalRootId, qsName = 'isOpen', isVisible }) => {
	const portalRoot = document.getElementById(portalRootId);
	const router = useRouter();

	const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { isVisible }));

	useDidUpdate(() => {
		if (isVisible) {
			const currentPath = router.asPath.split('?')[0];
			const newPath = `${currentPath}?${qsName}=true`;
			router.push(newPath, undefined, { shallow: true });
		} else {
			router.back();
		}
	}, [isVisible, qsName, router]);

	return ReactDOM.createPortal(childrenWithProps, portalRoot);
};

export default Portal;
