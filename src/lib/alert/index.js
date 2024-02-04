import Swal from 'sweetalert2';

/**
 * @description 커스텀 alert
 * @author 고종현
 * @version 2.0
 * @typedef {import('sweetalert2').SweetAlertOptions & { callback?: Function }} AlertOptions
 */

export default class CustomAlert {
	/**
	 * @param {AlertOptions} options
	 */
	static success(options = {}) {
		Swal.fire({
			...options,
			icon: 'success',
			html: options.html ?? '',
			confirmButtonText: options.confirmButtonText ?? '확인',
			allowOutsideClick: options.allowOutsideClick ?? true,
			target: options.target ?? '#alert',
		}).then((result) => {
			if (result.isConfirmed) {
				options?.callback();
			}
		});
	}

	/**
	 * @param {AlertOptions} options
	 */
	static error(options = {}) {
		Swal.fire({
			...options,
			icon: 'error',
			html: options.html ?? '',
			confirmButtonText: options.confirmButtonText ?? '확인',
			allowOutsideClick: options.allowOutsideClick ?? true,
		}).then((result) => {
			if (result.isConfirmed) {
				options?.callback();
			}
		});
	}

	/**
	 * @param {AlertOptions} options
	 */
	static warning(options = {}) {
		Swal.fire({
			...options,
			icon: 'warning',
			html: options.html ?? '',
			confirmButtonText: options.confirmButtonText ?? '확인',
			showCancelButton: options.showCancelButton ?? false,
			cancelButtonText: options.cancelButtonText ?? '취소',
			allowOutsideClick: options.allowOutsideClick ?? true,
		}).then((result) => {
			if (result.isConfirmed) {
				options?.callback();
			}
		});
	}

	/**
	 * @param {AlertOptions} options
	 */
	static question(options = {}) {
		Swal.fire({
			...options,
			icon: 'question',
			html: options.html ?? '',
			confirmButtonText: options.confirmButtonText ?? '확인',
			showCancelButton: true,
			cancelButtonText: options.cancelButtonText ?? '취소',
			allowOutsideClick: options.allowOutsideClick ?? true,
		}).then((result) => {
			if (result.isConfirmed) {
				options?.callback();
			}
		});
	}

	/**
	 * @param {AlertOptions} options
	 */
	static info(options = {}) {
		Swal.fire({
			...options,
			icon: 'info',
			html: options.html ?? '',
			confirmButtonText: options.confirmButtonText ?? '확인',
			allowOutsideClick: options.allowOutsideClick ?? true,
		}).then((result) => {
			if (result.isConfirmed) {
				options?.callback();
			}
		});
	}

	/**
	 * @param {AlertOptions} options
	 */
	static input(options = {}) {
		Swal.fire({
			...options,
			title: options.title ?? '',
			confirmButtonText: options.confirmButtonText ?? '확인',
			input: 'text',
			inputValue: options.inputValue ?? '',
			inputPlaceholder: options.inputPlaceholder ?? '',
			showLoaderOnConfirm: true,
			allowOutsideClick: options.allowOutsideClick ?? true,
			inputAttributes: {
				autocapitalize: 'off',
			},
			preConfirm: (text) => {
				if (text === null || text === undefined || text === '') {
					Swal.showValidationMessage(options.validationMessage ?? '입력한 값을 확인해 주세요.');
				} else {
					return text;
				}
			},
		}).then((result) => {
			if (result.isConfirmed) {
				options?.callback();
			}
		});
	}

	/**
	 * @param {AlertOptions} options
	 */
	static toast(options = {}) {
		Swal.mixin({
			...options,
			toast: true,
			position: 'bottom-start',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			},
		}).fire({
			icon: 'success',
			title: options.title ?? '',
		});
	}

	/**
	 * @param {AlertOptions} options
	 */
	static customToast(options = {}) {
		Swal.mixin({
			...options,
			width: '100%',
			customClass: `custom_toast ${options?.className ?? ''}`,
			toast: true,
			position: 'bottom-start',
			showConfirmButton: options?.confirm ?? false,
			confirmButtonText: options?.confirmText ?? '',
			timer: options?.timer ?? 1000,
			timerProgressBar: options?.timerProgressBar ?? true,
			target: options?.target ?? '#alert',
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			},
		})
			.fire({
				icon: options?.icon ?? 'success',
				title: options?.title ?? '',
				html: options?.html ?? '',
			})
			.then((result) => {
				if (result.isConfirmed) {
					options?.callback();
				}
			});
	}
}
