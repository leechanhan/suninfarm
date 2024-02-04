import { useEffect, useRef } from 'react';

const useOutsideClickDetector = (onOutSideClick) => {
	const detector = useRef(null);

	const handleClick = (e) => {
		if (detector.current && !detector.current.contains(e.target)) {
			onOutSideClick();
		}
	};
	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
	return detector;
};

export default useOutsideClickDetector;
