import {
	UPLOAD_FILE_START,
	UPLOAD_FILE_SUCCESS,
	UPLOAD_FILE_FAIL
} from '../constant/ActionType'

const initialState = {
	uploadingFile: false,
	fileUrl: null
}
export default (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_FILE_START:
			return {
				...state,
				uploadingFile: true,
				fileUrl: null
			}
		case UPLOAD_FILE_SUCCESS:
			return {
				...state,
				uploadingFile: false,
				fileUrl: action.fileUrl
			}
		case UPLOAD_FILE_FAIL:
			return {
				...state,
				uploadingFile: false
			}
		default:
			return state
	}
}
