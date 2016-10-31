import {
	UPLOAD_FILE_START,
	UPLOAD_FILE_SUCCESS,
	UPLOAD_FILE_FAIL
} from '../constant/ActionType'

const initialState = {
	uploadingFile: false,
	uploadedFile: null
}
export default (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_FILE_START:
			return {
				...state,
				uploadingFile: true,
				uploadedFile: null
			}
		case UPLOAD_FILE_SUCCESS:
			return {
				...state,
				uploadingFile: false,
				uploadedFile: action.uploadedFile
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
