import COLORS from '@constants/colors';

export const IconSearch = ({ fill = null }) => {
	return (
		<i className="svg_wrap">
			<svg
				x="0px"
				y="0px"
				viewBox="0 0 100 100"
				xmlSpace="preserve"
			>
				<path
					fill={fill ? fill : COLORS.GRAY7}
					d="M63.2,15.2C49.9,2,28.5,2,15.2,15.2C2,28.5,2,49.9,15.2,63.2C27.4,75.4,46.6,76.3,59.9,66l7,7
	c-0.5,0.7-0.5,1.7,0.2,2.3l18.8,18.8c0.7,0.7,1.9,0.7,2.6,0l5.8-5.8c0.7-0.7,0.7-1.9,0-2.6L75.4,67c-0.6-0.6-1.6-0.7-2.3-0.2l-7-7
	C76.3,46.6,75.4,27.4,63.2,15.2z M59.9,54c-1.6-0.9-3.7-0.6-5.1,0.8c-1.4,1.4-1.6,3.5-0.8,5.1c-10,7.2-23.9,6.3-32.9-2.7
	c-10-10-10-26.1,0-36.1c10-10,26.1-10,36.1,0C66.2,30.1,67.1,44.1,59.9,54z"
				/>
			</svg>
		</i>
	);
};
