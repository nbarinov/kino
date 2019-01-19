import React from 'react';
import { arrayOf, object } from 'prop-types';

import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import sortByDistance from 'sort-by-distance';

import Home from './panels/Home';

import './App.css';

class App extends React.Component {
	static propTypes = {
		cities: arrayOf(object),
	}

	state = {
		activePanel: 'home',
		geo: null,
		cities: null,
		city: null,
	};

	componentWillMount() {
		if (this.props.cities) {
			this.setState({ cities: this.props.cities });
		}
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGeodataResult':
					this.setState({ geo: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});

		connect.send("VKWebAppGetGeodata", {});
	}

	componentDidUpdate() {
		const { city, cities } = this.state;

		// если получен список городов
		if (!city && cities && cities.length > 0) {
			const { geo } = this.state;

			// если получена геопозиция
			if (geo) {
				const sortCities = sortByDistance(
					{
						Latitude: geo.lat,
						Longitude: geo.long,
					},
					cities,
					{
						yName: 'Latitude',
						xName: 'Longitude',
					}
				);

				if (sortCities && sortCities.length > 0) {
					this.setState({ city: sortCities[0] });
				}
			}
		}
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" go={this.go} city={this.state.city} />
			</View>
		);
	}
}

export default App;
