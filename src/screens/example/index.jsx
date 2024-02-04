import React, { useState } from 'react';
import { SwitchCase } from '@toss/react'; 
import Zustand from '@screens/example/components/Zustand';
import ReactQuery from '@screens/example/components/ReactQuery';

const RENDER_MODE = {
	useState: 1,
	zustand: 2,
	reactQuery: 3,
};

const ExampleScreen = () => {
	const [mode, setMode] = useState(RENDER_MODE.useState);
	const handleChangeMode = (e) => {
		setMode(e.target.value);
	};
	return (
		<>
			<select onChange={handleChangeMode}>
				{Object.keys(RENDER_MODE).map((key) => (
					<option
						value={RENDER_MODE[key]}
						key={key}
					>
						{key}
					</option>
				))}
			</select> 
			{/* eslint-disable-next-line react/no-unknown-property */}
		</>
	);
};

export default ExampleScreen;
