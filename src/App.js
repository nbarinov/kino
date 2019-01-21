import React from 'react';
import { arrayOf, object } from 'prop-types';

import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import sortByDistance from './helpers/sort-by-distance';

import Welcome from './panels/Welcome';
import Home from './panels/Home';
import Cities from './panels/Cities';
import Search from './panels/Search';
import Movie from './panels/Movie';

import './App.css';

class App extends React.Component {
	static propTypes = {
		cities: arrayOf(object),
	}

	state = {
		activePanel: 'welcome',
		geo: null,
		isAvailableGeo: null,
		cities: null,
		city: null,
		movie: null,
	};

	componentWillMount() {
		let cities = null;
		let activePanel = 'welcome';

		if (this.props.cities) {
			cities = this.props.cities;
		}

		if (localStorage.getItem('welcome-done')) {
			activePanel = 'home';
		}

		if (cities !== null || activePanel !== 'welcome') {
			this.setState({
				activePanel,
				cities
			});
		}
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGeodataResult':
					this.setState({ 
						geo: e.detail.data,
						isAvailableGeo: true,
					});
					localStorage.setItem('geodata-available', true);
					break;
				default:
					console.log(e.detail);
			}
		});

		// если разрешено получение геоданных
		if (localStorage.getItem('geodata-available')) {
			connect.send("VKWebAppGetGeodata", {})
		}
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

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Welcome
					id="welcome"
					isAvailableGeo={this.state.isAvailableGeo}
					city={this.state.city}
					onGetGeodata={this.handleGetGeodata}
					onAllowNotofication={this.handleAllowNotofication}
					skipWelcome={this.skipWelcome} />
				<Home 
					id="home" 
					go={this.go} 
					isAvailableGeo={this.state.isAvailableGeo}
					onGetGeodata={this.handleGetGeodata}
					city={this.state.city}
					onSetMovie={this.handleSetMovie} />
				<Cities 
					id="cities" 
					go={this.go} 
					cities={this.state.cities} 
					city={this.state.city} 
					onChange={this.handleChangeCity} />
				<Search
					id="search"
					go={this.go}
					city={this.state.city}
					onSetMovie={this.handleSetMovie} />
				<Movie
					id="movie"
					go={this.go}
					movie={this.state.movie} />
			</View>
		);
	}

	go = e =>
		this.setState({ 
			activePanel: (typeof e === 'object') ? e.currentTarget.dataset.to : e, 
		});

	handleChangeCity = city => this.setState({ city });
	
	handleSetMovie = movie => this.setState(({ movie }), () => this.go('movie'));

	handleGetGeodata = () => connect.send("VKWebAppGetGeodata", {}) || this.setState({ isAvailableGeo: false });

	handleAllowNotofication = () => connect.send("VKWebAppAllowNotifications", {}) || this.skipWelcome();

	skipWelcome = () => {
		localStorage.setItem('welcome-done', true);
		this.go('home');
	}
}

export default App;
