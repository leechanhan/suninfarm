import COLORS from '@constants/colors';

export const IconTriangleLeft = ({ fill = null }) => {
	return (
		<i className="svg_wrap">
			<svg
				x="0px"
				y="0px"
				viewBox="0 0 100 100"
				xmlSpace="preserve"
			>
				<polygon
					fill={fill ? fill : COLORS.GRAY7}
					points="7.8,50 71.1,86.5 71.1,13.5 "
				/>
			</svg>
		</i>
	);
};
