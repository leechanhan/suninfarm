import React from 'react';
import Image from 'next/image';
import { IconIvory } from '@icon/IconIvory';
import COLORS from '@constants/colors';

const S3_RAW_URL = 'https://s3.ap-northeast-2.amazonaws.com/iandna-contents';
const IMG_CDN_URL = 'https://iandna-imgsvr.com';
// const ERROR_IMAGE = 'https://data.textstudio.com/output/sample/animated/8/0/7/5/none-1-15708.gif';

const CustomImage = ({ src, alt = '', width = 100, height = 100, quality = 80 }) => {
	const searchParams = new URLSearchParams({ w: width, h: height, q: quality });
	const isCdnImage = !!src && (src.startsWith(S3_RAW_URL) || src.startsWith(IMG_CDN_URL));
	const [isError, setIsError] = React.useState(false);

	const handleImgError = (e) => {
		e.target.onerror = null;
		setIsError(true);
	};

	const imgUrl = isCdnImage ? src.replace(S3_RAW_URL, IMG_CDN_URL) + '?' + searchParams.toString() : src;

	return isError ? (
		<IconIvory fill={COLORS.GRAY2} />
	) : (
		<Image
			src={imgUrl}
			alt={alt}
			onError={handleImgError}
			width={width}
			height={height}
			placeholder={'empty'}
		/>
	);
};

export default CustomImage;
