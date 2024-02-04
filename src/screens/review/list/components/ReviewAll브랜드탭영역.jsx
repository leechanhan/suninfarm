import CampaignQuery from '@queries/campaign';
import { uid } from 'react-uid';
import CustomImage from '@component/frame/CustomImage';
import Link from 'next/link';
import { Else, If, Then } from 'react-if';
import { isEmpty } from 'lodash';
import { IconIvory } from '@icon/IconIvory';
import COLORS from '@constants/colors';

const ReviewAll브랜드탭영역 = () => {
	const { data: brandList } = CampaignQuery.useBrandList({ suspense: true });
	const clear = CampaignQuery.useClearBrand();
	const mutateFollowBrand = CampaignQuery.useFollowBrand({
		onSuccess: () => {
			clear();
		},
	});
	const handleClickFollow = (e, brand) => {
		e.preventDefault();
		mutateFollowBrand({ brandCode: brand.brdCd, stCd: brand.followStCd === '0' ? '1' : '0' });
	};

	return (
		<ul className="review_brand_list">
			{brandList.map((brand) => (
				<li
					key={uid(brand)}
					className="review_brand_item"
				>
					<Link href={`/review/brand?brandCode=${brand.brdCd}`}>
						<div className="img_box">
							<If condition={!isEmpty(brand.brdImg)}>
								<Then>
									<CustomImage
										src={brand.brdImg}
										alt={brand.brdNm}
										width={193}
										height={97}
									/>
								</Then>
								<Else>
									<IconIvory fill={COLORS.PRIMARY} />
								</Else>
							</If>
						</div>
						<div className="text_box">
							<p className="brand_name">{brand.brdNm}</p>
							<div className="info_box">
								<div className="detail">
									<p className="count">제품 {brand.productCnt ?? 0}개</p>
									<p className="count primary">리뷰 {brand.reviewCnt ?? 0}개</p>
								</div>
								<button
									className={`follow_box ${brand.followStCd !== '0' ? 'followed' : ''}`}
									onClick={(e) => handleClickFollow(e, brand)}
								>
									{brand.followStCd !== '0' ? '팔로잉' : '팔로우'}
								</button>
							</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default ReviewAll브랜드탭영역;
