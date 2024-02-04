import CampaignQuery from '@queries/campaign';
import { createContext, useContext, useState } from 'react';
import { MockViewer } from '../../../../mocks/utils';

const Context = createContext();

const Root = ({ categoryNo, children }) => {
	const { data: originProductList } = CampaignQuery.useProductList({ categoryNo: categoryNo }, { suspense: true });
	const [isShowOnlyPurchaseAble, setIsShowOnlyPurchaseAble] = useState(false); //false : 전체 제품, true : 구매 가능 제품만 [구매_가능_제품만_모아볼것_인
	const productList = originProductList?.filter(
		(product) => !isShowOnlyPurchaseAble || (Array.isArray(product.productBtnUrl) && product.productBtnUrl.length > 0),
	);

	return (
		<Context.Provider
			value={{
				productList,
				isShowOnlyPurchaseAble,
				setIsShowOnlyPurchaseAble,
			}}
		>
			{children}
		</Context.Provider>
	);
};

const Demo = ({ categoryNo, categories }) => {
	const selectedCategoryName = categoryNo === undefined ? '전체' : categories.find((category) => category.expCategoryNo === categoryNo).expCategoryName;
	const { productList } = useContext(Context);
	return (
		<MockViewer
			dataName={`카테고리 : ${selectedCategoryName}`}
			response={productList}
		/>
	);
};

const Trigger구매가능상품보기 = ({ children }) => {
	const { isShowOnlyPurchaseAble, setIsShowOnlyPurchaseAble } = useContext(Context);
	const handleToggleIsShowOnlyPurchaseAble = () => {
		setIsShowOnlyPurchaseAble(!isShowOnlyPurchaseAble);
	};
	return children({ isShowOnlyPurchaseAble, handleToggleIsShowOnlyPurchaseAble });
};

const Latest = ({ children }) => {
	const { productList } = useContext(Context);
	return children({
		latestProductList: productList?.filter((_, idx) => idx < 6) ?? [],
	});
};

const Others = ({ children }) => {
	const { productList } = useContext(Context);
	return children({
		otherProductList: productList?.filter((_, idx) => idx >= 6) ?? [],
	});
};

const CampaignProductList = {
	Root,
	Demo,
	Trigger구매가능상품보기,
	Latest,
	Others,
};

export default CampaignProductList;
