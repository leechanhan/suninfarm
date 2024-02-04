import COLORS from '@constants/colors';

export const IconInstagram = ({ fill = null }) => {
	return (
		<>
			<i className="svg_wrap">
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					viewBox="0 0 49.3 48.9"
				>
					<defs>
						<radialGradient
							id="iconInstagram"
							cx={13}
							cy={40}
							r={40}
							gradientUnits="userSpaceOnUse"
						>
							<stop
								offset="0"
								stopColor="#FFDD55"
							/>
							<stop
								offset="0.1"
								stopColor="#FFDD55"
							/>
							<stop
								offset="0.5"
								stopColor="#FF543E"
							/>
							<stop
								offset="1"
								stopColor="#C837AB"
							/>
						</radialGradient>
						<radialGradient
							id="iconInstagramMask"
							cx={5}
							cy={-10}
							r={60}
							gradientUnits="userSpaceOnUse"
						>
							<stop
								offset="0"
								stopColor="#3771C8"
							/>
							<stop
								offset="0.128"
								stopColor="#3771C8"
							/>
							<stop
								offset="1"
								stopColor="#6600FF"
								stopOpacity={0}
							/>
						</radialGradient>
					</defs>
					<g>
						<path
							className="radial"
							fill={fill ? fill : 'url(#iconInstagram)'}
							d="M32.4,9.9H16.9c-3.8,0-6.9,3.1-6.9,6.9v15.5c0,3.8,3.1,6.9,6.9,6.9h15.5c3.8,0,6.9-3.1,6.9-6.9V16.8
		C39.3,13,36.2,9.9,32.4,9.9z M24.6,33.8c-5.1,0-9.3-4.2-9.3-9.3c0-5.1,4.2-9.3,9.3-9.3c5.1,0,9.3,4.2,9.3,9.3
		C33.9,29.7,29.8,33.8,24.6,33.8z M34.2,17.1c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2S35.4,17.1,34.2,17.1z"
						/>
						<path
							className="radial"
							fill={fill ? fill : 'url(#iconInstagram)'}
							d="M39.4,0H9.8C4.4,0,0,4.4,0,9.9v29.2c0,5.4,4.4,9.8,9.8,9.8h29.5c5.4,0,9.9-4.4,9.9-9.8V9.9C49.3,4.4,44.8,0,39.4,0z
		 M42.6,32c0,5.7-4.6,10.3-10.3,10.3H17c-5.7,0-10.3-4.6-10.3-10.3V16.9c0-5.7,4.6-10.3,10.3-10.3h15.2c5.7,0,10.3,4.6,10.3,10.3V32
		z"
						/>
						<path
							className="radial"
							fill={fill ? fill : 'url(#iconInstagram)'}
							d="M24.6,18.5c-3.3,0-6,2.7-6,6c0,3.3,2.7,6,6,6c3.3,0,6-2.7,6-6C30.7,21.2,28,18.5,24.6,18.5z"
						/>
					</g>
					<g>
						<path
							fill={fill ? fill : 'url(#iconInstagramMask)'}
							className="top"
							d="M32.4,9.9H16.9c-3.8,0-6.9,3.1-6.9,6.9v15.5c0,3.8,3.1,6.9,6.9,6.9h15.5c3.8,0,6.9-3.1,6.9-6.9V16.8
		C39.3,13,36.2,9.9,32.4,9.9z M24.6,33.8c-5.1,0-9.3-4.2-9.3-9.3s4.2-9.3,9.3-9.3c5.1,0,9.3,4.2,9.3,9.3
		C33.9,29.7,29.8,33.8,24.6,33.8z M34.2,17.1c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2
		C36.4,16.1,35.4,17.1,34.2,17.1z"
						/>
						<path
							fill={fill ? fill : 'url(#iconInstagramMask)'}
							className="top"
							d="M39.4,0H9.8C4.4,0,0,4.4,0,9.9v29.2c0,5.4,4.4,9.8,9.8,9.8h29.5c5.4,0,9.9-4.4,9.9-9.8V9.9C49.3,4.4,44.8,0,39.4,0z
		 M32.3,42.3H17c-5.7,0-10.3-4.6-10.3-10.3V16.9c0-5.7,4.6-10.3,10.3-10.3h15.2c5.7,0,10.3,4.6,10.3,10.3V32h0.1
		C42.6,37.7,38,42.3,32.3,42.3z"
						/>
						<path
							fill={fill ? fill : 'url(#iconInstagramMask)'}
							className="top"
							d="M24.6,18.5c-3.3,0-6,2.7-6,6s2.7,6,6,6c3.3,0,6-2.7,6-6C30.7,21.2,28,18.5,24.6,18.5z"
						/>
					</g>
				</svg>
			</i>
		</>
	);
};
