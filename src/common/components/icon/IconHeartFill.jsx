import COLORS from '@constants/colors';

export const IconHeartFill = ({ fill = null }) => {
	return (
		<i className="svg_wrap">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 100 100"
			>
				<path
					fill={fill ? fill : COLORS.GRAY7}
					d="M50,90.9L12.9,53.8C8,48.9,5.3,42.3,5.3,35.3c0-7,2.7-13.6,7.7-18.5c10.2-10.2,26.8-10.2,37,0l0,0l0,0
	c10.2-10.2,26.8-10.2,37,0l0,0c4.9,4.9,7.7,11.5,7.7,18.5c0,7-2.7,13.6-7.7,18.5L50,90.9z"
				/>
			</svg>
		</i>
	);
};
