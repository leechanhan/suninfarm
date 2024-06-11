import React, { memo, useLayoutEffect, useRef } from 'react';

const Label = memo(({ id, label }) => (
	<label
		htmlFor={id}
		className="form_label"
	>
		{label}
	</label>
));
const Form = memo(({ id, value, onChange }) => {
	return (
		<>
			<input
				type="checkbox"
				id={id}
				checked={value}
				onChange={onChange}
			/>
			<label
				htmlFor={id}
				className="fake_btn"
			/>
		</>
	);
});

const Form체크박스 = ({ position = 'left', id = `temp_${new Date().getTime()}`, label = '', value = '', onChange = () => {} }) => {
	return (
		<div className="form_checkbox_wrapper">
			{position === 'left' ? (
				<>
					<Form
						id={id}
						value={value}
						onChange={onChange}
					/>
					<Label
						id={id}
						label={label}
					/>
				</>
			) : (
				<>
					<Label
						id={id}
						label={label}
					/>
					<Form
						id={id}
						value={value}
						onChange={onChange}
					/>
				</>
			)}
		</div>
	);
};

const CustomForms = {
	Form체크박스,
};

export default CustomForms;
