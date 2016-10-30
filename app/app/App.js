import React, { Component } from 'react'

export default class App extends Component {
	state = {
		count: 0
	}
	increase = () => {
		this.setState({
			count: this.state.count + 1
		})
	}
	render() {
		return (
			<div>
				<h1>React works! {this.state.count}</h1>
				<button onClick={this.increase}>Suurenda</button>
			</div>
		)
	}
}
