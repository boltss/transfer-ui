import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
	state = {
		count: 0
	}
	increase = () => {
		this.setState({
			count: this.state.count + 1
		});
	}
	render() {
		return (
			<div>
				<h1>React works!</h1>
				<button onClick={this.increase}>Suurenda</button>
			</div>
		)
	}
}
ReactDOM.render(
	<App/>,
	document.getElementById('app')
)
