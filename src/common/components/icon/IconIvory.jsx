import COLORS from '@constants/colors';

export const IconIvory = ({ fill = null }) => {
	return (
		<i className="svg_wrap">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 183.3 183.3"
			>
				<g>
					<path
						fill={fill ? fill : COLORS.PRIMARY}
						d="M91.7,165.9L91.7,165.9c41.1,0,74.3-33.5,74.3-74.3c-0.1-41.1-33.5-74.2-74.3-74.2
                c-41.2,0-74.3,33.5-74.3,74.3l0,0C17.4,132.4,50.5,165.9,91.7,165.9z M28.7,91.4c0-34.7,28.3-62.7,62.7-62.7c35,0,63,28.3,63,62.7
                s-28.3,62.7-62.7,62.7C56.9,154.4,29,126,28.7,91.4L28.7,91.4z"
					/>
					<path
						fill={fill ? fill : COLORS.PRIMARY}
						d="M101.4,94.7L101.4,94.7c4,5.8,10.6,8.8,17.7,8.8c7,0,13.7-3.3,17.7-8.8l0,0c0.6-0.9,0.9-2.1,0.9-3.1
                c0-3.1-2.4-5.5-5.8-5.5c-1.9,0-3.6,0.9-4.5,2.4c-0.9,1.5-2.4,2.4-4,3.3c-1.2,0.6-2.8,0.9-4.3,0.9s-3.1-0.3-4.3-0.9
                c-1.5-0.6-2.8-1.9-4-3.3c-0.9-1.5-2.8-2.4-4.5-2.4c-3.1,0-5.5,2.4-5.5,5.5l0,0C100.5,92.6,100.8,93.5,101.4,94.7L101.4,94.7z"
					/>
				</g>
			</svg>
		</i>
	);
};
