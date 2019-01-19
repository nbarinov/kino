import React from 'react';
import { arrayOf, object } from 'prop-types';

import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

import './App.css';

class App extends React.Component {
	static propTypes = {
		cities: arrayOf(object),
	}

	state = {
		activePanel: 'home',
		cities: null,
	};

	componentWillMount() {
		if (this.props.cities) {
			this.setState({ cities: this.props.cities });
		}
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" go={this.go} />
			</View>
		);
	}
}

export default App;
