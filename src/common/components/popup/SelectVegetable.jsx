// components/Popup.js
import React from 'react';
import Layout기본헤더 from '@component/layout/Layout기본헤더';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Button팝업종료 from '@component/frame/headerBtn/Button팝업종료';
const SelectVegetablePopup = ({ isOpen, onClose, children }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="popup-overlay">
			<div className="popup-content">
				<Layout기본헤더
					title={'재배 작물 선택'}
					LeftButton={() => <Button팝업종료 popupClose={onClose} />}
				/>
				{children}
			</div>
		</div>
	);
};

export default SelectVegetablePopup;
