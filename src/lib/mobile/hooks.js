import { useDeferredValue, useEffect, useState } from 'react';

export const useIsKeyboardUp = (selector) => {
	const [isKeyboardUp, setIsKeyboardUp] = useState(false);
	const isDeferredKeyboardUp = useDeferredValue(isKeyboardUp);

	useEffect(() => {
		const focusIn = (event) => {
			if (event.target.matches(selector)) {
				setIsKeyboardUp(true);
			}
		};
		const focusOut = (event) => {
			if (event.target.matches(selector)) {
				setIsKeyboardUp(false);
			}
		};
		document.addEventListener('focusin', focusIn);
		document.addEventListener('focusout', focusOut);
		return () => {
			document?.removeEventListener('focusin', focusIn);
			document?.removeEventListener('focusout', focusOut);
		};
	}, []);

	return isDeferredKeyboardUp;
};
