import useWindowSize from '@lib/hooks/windowSize';
import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const animationTypes = {
	slideUp: {
		opacity: [0, 1],
		transform: ['translateY(100%)', 'translateY(0%)'],
	},
	fadeIn: {
		opacity: [0, 1],
	},
	slideLeft: {
		opacity: [0, 1],
		transform: ['translateX(100%)', 'translateX(0%)'],
	},
	slideRight: {
		opacity: [0, 1],
		transform: ['translateX(-100%)', 'translateX(mediaVal(120))'],
	},
};

const Overlay모달컨테이너 = forwardRef(({ isVisible, className, id, children, aniType = 'fadeIn', onClose }, ref) => {
	const { vh } = useWindowSize();
	const refContainer = useRef(null);
	const refBackground = useRef(null);
	const refContent = useRef(null);

	// 포탈 애니메이션 제어
	useLayoutEffect(() => {
		const container = refContainer?.current;
		const bg = refBackground.current;
		const content = refContent?.current;
		let animationBg;
		let animationContent;

		if (isVisible) {
			container.style.display = 'flex';

			animationBg = bg.animate(animationTypes.fadeIn, { duration: 300, fill: 'forwards' });
			animationContent = content?.animate(animationTypes[aniType], { duration: 300, fill: 'forwards' });
		} else {
			container.style.display = 'none';
		}

		return () => {
			animationBg?.cancel();
			animationContent?.cancel();
		};
	}, [isVisible, aniType]);

	useLayoutEffect(() => {
		const contentHeight = refContent.current?.offsetHeight;
		if (contentHeight > vh - 20) {
			refContainer?.current.classList.add('scroll');
		} else {
			refContainer?.current.classList.remove('scroll');
		}
	}, [isVisible, vh]);

	return createPortal(
		<div
			id={id}
			className={className}
			ref={ref}
		>
			<div
				className="portal_container"
				ref={refContainer}
			>
				<div
					ref={refBackground}
					className="background"
					onClick={onClose}
				/>

				<div
					className="portal_content_box"
					ref={refContent}
				>
					{isVisible && children}
				</div>
			</div>
		</div>,
		document.getElementById('portal'),
	);
});

export default Overlay모달컨테이너;
