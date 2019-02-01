import React from 'react';
import { string, func, shape } from 'prop-types';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Panel, Group, Div, PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Write from '@vkontakte/icons/dist/24/write';

import { APP_NAME } from '../../config';

import Loader from '../../components/Loader';
import Card from '../../components/Card';

import filmStrip from '../../svg/film-strip.svg';

import './Home.css';

const Home = ({ id, go, city, onSetMovie, isAvailableGeo, onGetGeodata }) => (
	<Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="search"><Icon24Search /></HeaderButton>}
			children={APP_NAME} />

		<Group>
			<Div>
				<button className="home__change-city-button" onClick={(isAvailableGeo === null) ? onGetGeodata : go} data-to="cities">
					<span className="home__change-city-title">
						{(city && city.Name) ?
							`г. ${city.Name}` :
							(isAvailableGeo === false) ?
								'Выбрать город...' :
								'Определить город...'}
					</span>
					<Icon24Write className="home__change-city-icon" />
				</button>
			</Div>
		</Group>

		{(city && city.CityID) &&
			<Group>
				<Div>
					<Query
						query={gql`
							query {
								movies (CityID: ${city.CityID}) {
									ObjectID,
									Name,
									Thumbnail,
									Genre,
									AgeRestriction
								}
							}
						`}>
						{({ loading, error, data }) => {
							if (loading) return <Loader />;
							if (error) return <p>Error :(</p>;

							return (data.movies && data.movies.length > 0) ?
								<ul className="home__movies">
									{data.movies.map(movie =>
										<li 
											className="home__movie" 
											key={movie.ObjectID}
											onClick={onSetMovie && (() => onSetMovie(movie))}>
											<Card
												cover={movie.Thumbnail}
												title={movie.Name}
												genre={movie.Genre}
												ageRestriction={movie.AgeRestriction} />
										</li>
									)}
								</ul>:
								<Div className="home__not-found-message">
									<img src={filmStrip} alt="кино-лента" />
									<p>В вашем городе мы<br />не нашли фильмов :(</p>
								</Div>
						}}
					</Query>
				</Div>
			</Group>}

	</Panel>
);

Home.propTypes = {
	id: string.isRequired,
	go: func.isRequired,
	city: shape({
		CityID: string.isRequired,
		Name: string.isRequired
	}),
	onSetMovie: func,
	onGetGeodata: func.isRequired,
};

export default Home;
