export const imageCache = (url, complete = null) => {
	let key
	if (typeof btoa === "function") {
		key = btoa(url)
	} else {
		key = Buffer.from(url).toString('base64')
	}
	try {
		//#ifdef H5
			complete && complete(url)		
		//#endif
		const path = uni.getStorageSync(key)
		if (path.length == 0) {
			uni.downloadFile({
				url: url,
				success: (res) => {
					if (res.statusCode === 200) {//下载成功保存文件，下次直接读取
						const tempFilePath = res.tempFilePath;
							uni.saveFile({
								tempFilePath: tempFilePath,
								success: function(res) {
									const savedFilePath = res.savedFilePath
									uni.setStorage({
										key: key,
										data: savedFilePath
									})
									complete && complete(savedFilePath)
								},
							})
					}else{//下载失败直接返回地址
						complete && complete(url)
					}
				}
			})
			return url
		}
		return path
	} catch (e) {

	}
}

export const cacheSize = complete => {
	uni.getStorageInfo({
		complete: (e) => {
			let total = e.currentSize ? e.currentSize : 0
			let unit = 'kb'
			uni.getSavedFileList({
				success: (res) => {
					let size = 0
					for (let doc of res.fileList) {
						size += doc.size
					}
					total = total + size / 1024
					if (total >= 1024) {
						unit = 'mb'
						total /= 1024
					}
					complete(total.toFixed(2) + unit)
				},
				fail: () => {
					complete(total + unit)
				}
			})
		}
	})
}

export const cleanCache = object => {
	uni.getSavedFileList({
		success: (res) => {
			for (let doc of res.fileList) {
				uni.removeSavedFile({
					filePath: doc.filePath,
				})
			}
			uni.getStorageInfo({
				success: (res) => {
					for (let key of res.keys) {
						if (object.except.indexOf(key) < 0) {
							uni.removeStorage({
								key: key,
								success: (res) => {}
							})
						}
					}
					object.complete()
				}
			})
		}
	})
}
