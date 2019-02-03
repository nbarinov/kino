import React from 'react';
import { string, object, shape, func } from 'prop-types';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Panel, PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Write from '@vkontakte/icons/dist/24/write';

import { APP_NAME } from '../../config';

import Group from '../../components/Group';
import Div from '../../components/Div';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import Message from '../../components/Message';

import filmStrip from '../../svg/film-strip.svg';

import './Home.css';

const Home = ({ id, city, isAvailableGeo, onGetGeodata, onSetMovie, history }) => (
	<Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={() => history.push('/search')}><Icon24Search /></HeaderButton>}
			children={APP_NAME} />

		<Group>
			<Div>
				<button className="home__change-city-button" onClick={(isAvailableGeo === null) ? onGetGeodata : () => history.push('/cities')}>
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
			<Group className="home__group">
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
							if (error) return (
								<Message
									type="error"
									onCloseMessage={() => history.push('/')}
									action={
										<Button
											size="xl"
											level="2"
											children="Повторить"
											onClick={() => history.goBack()} />
									}
									children="Мы не смогли загрузить фильмы :(" />
							);

							return (data.movies && data.movies.length > 0) ?
								<ul className="home__movies">
									{data.movies.map(movie =>
										<li 
											className="home__movie" 
											key={movie.ObjectID}
											onClick={onSetMovie && (() => onSetMovie(movie))}>
											<Link className="home__link" to={`/movie/${movie.ObjectID}`}>
												<Card
													cover={movie.Thumbnail}
													title={movie.Name}
													genre={movie.Genre}
													ageRestriction={movie.AgeRestriction} />
											</Link>
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
	history: object.isRequired,
	city: shape({
		CityID: string.isRequired,
		Name: string.isRequired
	}),
	onGetGeodata: func.isRequired,
	onSetMovie: func.isRequired,
};

export default Home;
