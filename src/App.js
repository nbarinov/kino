import React from 'react';
import { arrayOf, object } from 'prop-types';

import connect from '@vkontakte/vkui-connect';
import * as UI from '@vkontakte/vkui';
import { isWebView } from '@vkontakte/vkui/src/lib/webview';
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
		history: object.isRequired,
	}

	state = {
		geo: null,
		isAvailableGeo: null,
		cities: null,
		city: null,
		movie: null,
	};

	componentWillMount() {
		if (this.props.cities) {
			this.setState({ cities: this.props.cities });
		}

		// если пользователь не прошел обучение
		if (!localStorage.getItem('welcome-done')) {
			this.props.history.push('/welcome');
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
		const activePanel = this.props.pageId !== '' ? this.props.pageId : 'home';

		return (
			<UI.ConfigProvider insets={this.props.insets} isWebView={isWebView}>
				<UI.Root activeView="mainView">
					<UI.View 
						id="mainView" 
						activePanel={activePanel}
						onSwipeBack={() => this.props.history.goBack()}>
						<Welcome
							id="welcome"
							isAvailableGeo={this.state.isAvailableGeo}
							city={this.state.city}
							onGetGeodata={this.handleGetGeodata}
							onAllowNotofication={this.handleAllowNotofication}
							skipWelcome={this.skipWelcome} />
						<Home
							id="home"
							history={this.props.history}
							isAvailableGeo={this.state.isAvailableGeo}
							onGetGeodata={this.handleGetGeodata}
							city={this.state.city}
							onSetMovie={this.handleSetMovie} />
						<Cities
							id="cities"
							history={this.props.history}
							cities={this.state.cities}
							city={this.state.city}
							onChange={this.handleChangeCity} />
						<Search
							id="search"
							history={this.props.history}
							city={this.state.city}
							onSetMovie={this.handleSetMovie} />
						<Movie
							id="movie"
							history={this.props.history}
							movie={this.state.movie}
							city={this.state.city}
							geo={this.state.geo} />
					</UI.View>
				</UI.Root>
			</UI.ConfigProvider>
		);
	}

	handleChangeCity = city => this.setState({ city });
	
	handleSetMovie = movie => this.setState({ movie });

	handleGetGeodata = () => connect.send("VKWebAppGetGeodata", {}) || this.setState({ isAvailableGeo: false });

	handleAllowNotofication = () => connect.send("VKWebAppAllowNotifications", {}) || this.skipWelcome();

	skipWelcome = () => {
		localStorage.setItem('welcome-done', true);
		this.props.history.push('/');
	}
}

export default App;
