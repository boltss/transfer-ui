import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		a = 2/0;
	}
	render() {
		return (
			<div>
				<h1>React works!</h1>
				<button onClick={this.onClick}>Click</button>
			</div>
		)
	}
}
ReactDOM.render(
	<App/>,
	document.getElementById('app')
)
