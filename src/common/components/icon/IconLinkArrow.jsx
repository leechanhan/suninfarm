export const IconLinkArrow = ({ fill = null }) => {
	return (
		<i className="svg_wrap">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 100 100"
				xmlSpace="preserve"
			>
				<polygon
					fill={fill ? fill : '#000'}
					points="38,3.8 31.3,8.2 59.1,50 31.3,91.8 38,96.2 68.7,50 "
				/>
			</svg>
		</i>
	);
};
