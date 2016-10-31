import cmd from 'node-cmd'
import S from 'string'
import electron, { clipboard, ipcRenderer } from 'electron'

import {
	UPLOAD_FILE,
	UPLOAD_FILE_START,
	UPLOAD_FILE_SUCCESS,
	UPLOAD_FILE_FAIL
} from '../constant/ActionType'

function startUploadingFile() {
	return {
		type: UPLOAD_FILE_START
	}
}

function uploadingFileFail(error) {
	return {
		type: UPLOAD_FILE_FAIL,
		error
	}
}

function uploadingFileSuccess({file, fileUrl}) {
	return {
		type: UPLOAD_FILE_SUCCESS,
		uploadedFile: {
			fileUrl: fileUrl,
			curlCommand: `curl ${fileUrl} -o ${file.name}`
		}
	}
}

export const uploadFile = (file) => async (dispatch, state) => {
	try {
		dispatch(startUploadingFile());
		const fileUrl = await new Promise((resolve, reject) => {
			cmd.get(`curl --upload-file ${file.path} https://transfer.sh/${file.name}`, data => {
				if (S(data).isEmpty()) {
					reject({message: 'Result is empty url'})
					return
				}
				resolve(data.trim())
			})
		})
		dispatch(uploadingFileSuccess({
			file,
			fileUrl
		}))
	} catch (error) {
		dispatch(uploadingFileFail(error))
	}
}

export const copyUploadedFileCurlToClipboard = () => async (dispatch, getState) => {
	console.log(electron, ipcRenderer, clipboard)
	ipcRenderer.send('asynchronous-message', 'ping')
	const { uploadedFile } = getState().FileUploadReducer
	if (uploadedFile) {
		clipboard.writeText(uploadedFile.curlCommand)
	}
}
