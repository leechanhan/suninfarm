import React from 'react';
import Head from 'next/head';

const Header메타설정 = ({ description, title }) => {
	return (
		<Head>
			<title>{`아이보리${title ? ` | ${title}` : ''}`}</title>
			<meta
				name="referrer"
				content="no-referrer-when-downgrade"
			></meta>
			<meta
				httpEquiv="Content-Security-Policy"
				content="upgrade-insecure-requests"
			/>
			<meta
				name="description"
				content={description}
			/>
			<meta
				property="og:type"
				content="website"
			/>
			<meta
				property="og:title"
				content={`아이보리${title ? ` | ${title}` : ''}`}
			/>
			<meta
				property="og:description"
				content={description}
			/>
			<meta
				property="og:site_name"
				content="아이보리"
			/>
			<meta
				property="twitter:description"
				content={description}
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
			/>
		</Head>
	);
};

export default Header메타설정;
