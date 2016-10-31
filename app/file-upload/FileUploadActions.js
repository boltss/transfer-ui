import cmd from 'node-cmd'
import S from 'string'

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

function uploadingFileSuccess(fileUrl) {
	return {
		type: UPLOAD_FILE_SUCCESS,
		fileUrl
	}
}

export const uploadFile = (file) => async (dispatch) => {
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
		dispatch(uploadingFileSuccess(fileUrl))
	} catch (error) {
		dispatch(uploadingFileFail(error))
	}
}
