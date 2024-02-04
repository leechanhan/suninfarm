import React from 'react';
import QueryBoundary from '@component/boundary/QueryBoundary';
import CampaignQuery from '@queries/campaign';
import { useRouter } from 'next/router';
import { MockViewer } from '../../../mocks/utils';

const ReviewBrandScreen = () => {
	return (
		<div className="content_wrapper">
			<div className="page_content">
				<h1>브랜드 상세</h1>
				<QueryBoundary Skeleton={() => <>스켈레톤</>}>
					<Brand />
				</QueryBoundary>
			</div>
		</div>
	);
};

const Brand = () => {
	const router = useRouter();
	const { brandCode } = router.query;
	const { data: brand } = CampaignQuery.useBrand({ brandCode }, { suspense: true });
	return (
		<MockViewer
			dataName={'브랜드 상세'}
			response={brand}
		/>
	);
};

export default ReviewBrandScreen;
