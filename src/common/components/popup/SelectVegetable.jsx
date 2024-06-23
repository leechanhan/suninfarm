// components/Popup.js
import React from 'react';
import Layout기본헤더 from '@component/layout/Layout기본헤더';
import Button뒤로가기 from '@component/frame/headerBtn/Button뒤로가기';
import Header from '@component/frame/Header';
const SelectVegetablePopup = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="popup-overlay">
			<div className="page_container  popup-content">
				<Header
					title={title}
					LeftButton={onClose}
				/>
				{children}
			</div>
		</div>
	);
};
export default SelectVegetablePopup;
