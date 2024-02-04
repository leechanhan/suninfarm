import COLORS from '@constants/colors';

export const IconStarFill = ({ fill = null }) => {
	return (
		<i className="svg_wrap">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 100 100"
			>
				<path
					fill={fill ? fill : COLORS.PRIMARY}
					d="M51.6,8.7l12.5,25.3c0.3,0.5,0.8,0.9,1.3,1L93.3,39c1.5,0.2,2,2,1,3L74.1,61.7c-0.4,0.4-0.6,1-0.5,1.6L78.3,91
	c0.2,1.4-1.3,2.5-2.6,1.9l-25-13.1c-0.5-0.3-1.1-0.3-1.6,0l-25,13.1c-1.3,0.7-2.8-0.4-2.6-1.9l4.8-27.8c0.1-0.6-0.1-1.2-0.5-1.6
	L5.7,42c-1.1-1-0.5-2.8,1-3l27.9-4.1c0.6-0.1,1.1-0.4,1.3-1L48.4,8.7C49.1,7.3,50.9,7.3,51.6,8.7z"
				/>
			</svg>
		</i>
	);
};
