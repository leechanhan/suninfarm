import React from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { isDev } from '@lib/function/util';

export const DefaultErrorComponent = ({ resetErrorBoundary, message = '오류가 발생했습니다.', error }) => {
	return (
		<div className="default_error_box">
			<p style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{isDev() ? error.message : message}</p>
			<span
				onClick={(e) => {
					e.stopPropagation();
					resetErrorBoundary();
				}}
			>
				다시 시도
			</span>
		</div>
	);
};

export const BoxErrorComponent = ({ resetErrorBoundary }) => {
	return (
		<div>
			<DefaultErrorComponent resetErrorBoundary={resetErrorBoundary} />
		</div>
	);
};

const QueryErrorBoundary = ({ children, fallbackRender = DefaultErrorComponent }) => {
	const { reset } = useQueryErrorResetBoundary();
	return (
		<ErrorBoundary
			onReset={reset}
			onError={(error, info) => {}}
			fallbackRender={fallbackRender}
		>
			{children}
		</ErrorBoundary>
	);
};

export default QueryErrorBoundary;
