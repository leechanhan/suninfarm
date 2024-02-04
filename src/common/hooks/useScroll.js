import { useState, useEffect } from 'react';

const debounce = (func, delay) => {
	let timerId;
	return (...args) => {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};
/**
 *
 * @param {*} ref -scroll container ref
 * @param {*} delay -debounce delay(default:100ms)
 * @returns
 */
const useScroll = (ref, delay = 100) => {
	const [scrollPosition, setScrollPosition] = useState({ scrollX: 0, scrollY: 0 });

	const handleScroll = debounce(() => {
		if (ref.current) {
			setScrollPosition({
				scrollX: ref.current.scrollLeft,
				scrollY: ref.current.scrollTop,
			});
		}
	}, delay);

	useEffect(() => {
		const currentRef = ref.current;
		if (currentRef) {
			currentRef.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (currentRef) {
				currentRef.removeEventListener('scroll', handleScroll);
			}
		};
	}, [ref, handleScroll]);

	return scrollPosition;
};

export default useScroll;
