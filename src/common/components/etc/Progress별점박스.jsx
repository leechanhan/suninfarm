import { IconStarFill } from '@component/icon/IconStarFill';
import { IconStarHalf } from '@component/icon/IconStarHalf';
import COLORS from '@constants/colors';
import { useCallback } from 'react';

const Progress별점박스 = ({ grade }) => {
	const generateStarRating = useCallback(
		(grade) => {
			const ratingArray = new Array(5).fill('empty');
			const fullStars = Math.floor(grade);
			const hasHalfStar = grade % 1 >= 0.5;

			for (let i = 0; i < fullStars; i++) {
				ratingArray[i] = 'full';
			}

			if (hasHalfStar && fullStars < 5) {
				ratingArray[fullStars] = 'half';
			}

			return ratingArray;
		},
		[grade],
	);

	return (
		<div className="star_grade_wrapper">
			<div className="star_box">
				{generateStarRating(grade).map((rating, index) => (
					<span
						className="star_item"
						key={index}
					>
						{rating === 'full' && <IconStarFill />}
						{rating === 'half' && <IconStarHalf />}
						{rating === 'empty' && <IconStarFill fill={'rgba(0,0,0,0.2'} />}
					</span>
				))}
			</div>
			<p className="point_box">{parseFloat(grade).toFixed(1)}</p>
		</div>
	);
};

export default Progress별점박스;
