import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

export default class App extends Component {
	state = {
		draggingFile: false
	}
	onDropFile = (e) => {
		this.onStopDraggingFile();
		console.log(e)
	}
	onDragFile = (e) => {
		this.setState({
			draggingFile: true
		});
	}
	onStopDraggingFile = (e) => {
		this.setState({
			draggingFile: false
		});
	}
	render() {
		const {
			draggingFile
		} = this.state;
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
					Drop file you wish to transfer here
				</div>
			</Dropzone>
		)
	}
}

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
