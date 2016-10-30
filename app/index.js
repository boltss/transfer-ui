import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import reducers from './config/reducers'
import App from './app/App'

// Create store
const getStore = () => {
	const loggerMiddleware = createLogger()
	const storeMiddleware = applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
	return createStore(
		reducers,
		storeMiddleware
	)
}

// App container
class AppContainer extends Component {
	render() {
		return (
			<Provider store={getStore()}>
				<App/>
			</Provider>
		)
	}
}

// Initialize app
render(
	<AppContainer/>,
	document.getElementById('app')
)
