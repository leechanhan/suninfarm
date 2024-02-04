export const IconClose = ({ fill = null }) => {
	return (
		<i className="svg_wrap">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 17.4 17.4"
				xmlSpace="preserve"
			>
				<polygon
					fill={fill ? fill : '#fff'}
					points="17.4,1.4 16,0 8.7,7.3 1.4,0 0,1.4 7.3,8.7 0,16 1.4,17.4 8.7,10.1 16,17.4 17.4,16 10.1,8.7 "
				/>
			</svg>
		</i>
	);
};
