import CustomError from '@lib/error';
import AndroidUtils from '@lib/utils/android';

export default class NativeBridge {
	//네이티브 비디오 열기
	static async openNativeVideo(videoUrl) {
		if (AndroidUtils.isAppRunning()) {
			if (AndroidUtils.isAndroidDevice()) {
				await window?.Android?.ivoryVideoPlay(videoUrl);
			} else {
				await window?.webkit?.messageHandlers?.ivoryVideoPlay?.postMessage({ videoUrl: videoUrl });
			}
		} else {
			throw new CustomError('웹에서는 해당 기능을 지원하지 않습니다.');
		}
	}

	//이미지 & 비디오 선택기 열기
	static async openNativeAlbum(albumNo, contentType, uploadAbleCount) {
		if (AndroidUtils.isAppRunning()) {
			if (AndroidUtils.isAndroidDevice()) {
				await window?.Android?.ivoryAlbumUpload(albumNo, contentType, uploadAbleCount);
			} else {
				await window?.webkit?.messageHandlers?.ivoryAlbumUpload?.postMessage({
					albumNo: albumNo,
					contentType: contentType,
					uploadAbleCount: uploadAbleCount,
				});
			}
		} else {
			throw new CustomError('콘텐츠 업로드는 앱에서만 가능합니다.');
		}
	}

	static async imageDownload(url) {
		if (AndroidUtils?.isAppRunning()) {
			if (AndroidUtils.isAndroidDevice()) {
				await window?.Android?.ivoryImgDownload(url);
			} else {
				const nativeParam = {};
				nativeParam.url = url;
				window?.webkit?.messageHandlers?.ivoryImgDownload?.postMessage(nativeParam);
			}
		}
	}

	static async openNewWindow(url) {
		if (AndroidUtils.isAppRunning()) {
			if (AndroidUtils.isAndroidDevice()) {
				window.Android.newTap(url);
			} else {
				window?.webkit.messageHandlers.openLinkExternally.postMessage({
					url: url,
					screenType: 'full',
					headerType: 'hide',
					naviType: 'hide',
				});
			}
		}
	}

	static async openNewLink(url) {
		if (AndroidUtils.isAppRunning()) {
			if (AndroidUtils.isAndroidDevice()) {
				await window.Android.echossOpenLinkExternally(url, 'show');
			} else {
				await window?.webkit.messageHandlers.openLinkExternally.postMessage({
					url: url,
					screenType: 'full',
					headerType: 'show',
					naviType: 'hide',
				});
			}
		}
	}

	static async nativeStorage(key) {
		if (AndroidUtils.isAppRunning()) {
			if (AndroidUtils.isAndroidDevice()) {
				return await window.Android.loadData({ key });
			} else {
				return await prompt(JSON.stringify({ type: 'jsPromptBridge', functionName: 'loaddata', key: { key } }));
			}
		}
	}
}
