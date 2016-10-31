import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as FileUploadActions from './FileUploadActions'
import Spinner from '../component/Spinner'

export class FileUploadScene extends Component {
	state = {
		draggingFile: false
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
	render() {
		const {
			uploadingFile
		} = this.props
		const {
			draggingFile
		} = this.state
		const dropZoneTextActiveStyle = draggingFile ? styles.dropZoneTextActive: {}
		return (
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
	dropZone: {
		width: '100%',
		height: '100%',
		padding: '50px',
		boxSizing: 'border-box'
	},
	dropZoneText: {
		height: '100%',
		borderStyle: 'dashed',
		borderColor: 'lightgray',
		boxSizing: 'border-box',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	dropZoneTextActive: {
		borderColor: 'black'
	}
}
