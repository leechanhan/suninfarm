import { jsMediaQuery } from '@lib/function/util';
import useWindowSize from '@lib/hooks/windowSize';

/**
 *
 * @param {string} effectName 'snow', 'flower' default: 'snow'
 * @returns
 */
const Effect눈내리는효과 = ({ effectName = 'snow' }) => {
	const flakesCount = 30;
	const { vw } = useWindowSize();

	const getRandomSize = (min, max, isFloat = false) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		let randomValue = Math.random() * (max - min + 1) + min;
		return isFloat ? parseFloat(randomValue.toFixed(1)) : Math.floor(randomValue);
	};

	const getRandomFlake = () => {
		if (effectName === 'snow') {
			return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		} else if (effectName === 'flower') {
			const randomNum = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
			return randomNum > 4 ? 1 : randomNum;
		}
	};

	return (
		<div className={`snow_flake_wrapper ${effectName}`}>
			{[...Array(flakesCount)].map((_, i) => {
				const rSize = jsMediaQuery(getRandomSize(10, 20), vw);
				return (
					<div
						className={`snow_flake_item snow_flake_item_${getRandomSize(1, 7)}`}
						key={i}
						style={{
							width: rSize || 0,
							height: rSize || 0,
							left: Math.random() * 100 + '%',
							animationDelay: getRandomSize(0, 20, true) + 's, ' + getRandomSize(0, 5, true) + 's',
						}}
					>
						<img
							className="snow_flake_inner"
							src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/svg/effect_${effectName}flake0${getRandomFlake()}.svg`}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Effect눈내리는효과;
