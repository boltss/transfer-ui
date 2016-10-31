import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as FileUploadActions from './FileUploadActions'
import Spinner from '../component/Spinner'

export class FileUploadScene extends Component {
	state = {
		draggingFile: false,
		copyClicked: false
	}
	onDropFile = (event) => {
		this.onStopDraggingFile()
		this.props.actions.uploadFile(event[0])
	}
	onDragFile = (event) => {
		this.setState({
			draggingFile: true
		});
	}
	onStopDraggingFile = (event) => {
		this.setState({
			draggingFile: false
		});
	}
	onClickCopy = (event) => {
		if (!this.props.uploadedFile || this.state.copyClicked) {
			return
		}
		this.setState({
			copyClicked: true
		}, () => {
			setTimeout(() => {
				this.setState({
					copyClicked: false
				})
			}, 1000)
		})
		this.props.actions.copyUploadedFileCurlToClipboard()
	}
	render() {
		const {
			actions,
			uploadingFile,
			uploadedFile
		} = this.props
		const {
			draggingFile,
			copyClicked
		} = this.state
		const dropZoneTextActiveStyle = draggingFile ? styles.dropZoneTextActive: {}
		const copyClickedStyle = copyClicked ? styles.copied : {}
		return (
			<div style={styles.container}>
				<Dropzone
					onDrop={this.onDropFile}
					disableClick={true}
					style={styles.dropZone}
					onDragEnter={this.onDragFile}
					onDragOver={this.onDragFile}
					onDragLeave={this.onStopDraggingFile}
					onDragEnd={this.onStopDraggingFile}>
					<div style={{...styles.dropZoneText, ...dropZoneTextActiveStyle}}>
						{uploadingFile ?
							<Spinner/> :
							'Drop file you wish to transfer here'
						}
					</div>
				</Dropzone>
				<div style={{...styles.feedbackArea, ...copyClickedStyle}} onClick={this.onClickCopy}>
					{uploadedFile ?
						copyClicked ?
							'Copied' :
							'Click to copy curl' :
						'Drag file above'
						}
				</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return state.FileUploadReducer
}
const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(FileUploadActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadScene)

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	dropZone: {
		display: 'flex',
		flex: 1,
		padding: '50px',
		boxSizing: 'border-box',
		userSelect: 'none',
		WebkitUserSelect: 'none',
		cursor: 'default'
	},
	dropZoneText: {
		width: '100%',
		height: '100%',
		borderStyle: 'dashed',
		borderColor: 'lightgray',
		boxSizing: 'border-box',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white'
	},
	dropZoneTextActive: {
		borderColor: 'black',
		color: 'black'
	},
	feedbackArea: {
		display: 'flex',
		flex: '0 0 60px',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#4a4a4a',
		color: 'lightgray',
		cursor: 'pointer',
		userSelect: 'none',
		WebkitUserSelect: 'none',
		transition: '.5s color ease'
	},
	copied: {
		color: '#55b963'
	}
}
