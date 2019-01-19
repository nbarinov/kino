import React from 'react';
import { string, number, func, shape } from 'prop-types';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Panel, Group, Div, PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Write from '@vkontakte/icons/dist/24/write';

import { APP_NAME } from '../../config';

import Loader from '../../components/Loader';
import Card from '../../components/Card';

import './Home.css';

const Home = ({ id, go, city }) => (
	<Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="search"><Icon24Search /></HeaderButton>}
			children={APP_NAME} />

		<Group>
			<Div>
				<button className="home__change-city-button" onClick={go} data-to="change-city">
					<span className="home__change-city-title">
						{(city && city.Name) ?
							`г. ${city.Name}` :
							'Выбрать город...'}
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
							if (loading) return <Loader center={true} />;
							if (error) return <p>Error :(</p>;

							return <ul className="home__movies">
								{data.movies.map(movie =>
									<li className="home__movie" key={movie.ObjectID} onClick={go} data-to="movie">
										<Card
											cover={movie.Thumbnail}
											title={movie.Name}
											genre={movie.Genre}
											ageRestriction={movie.AgeRestriction} />
									</li>
								)}
							</ul>;
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
		CityID: number.isRequired,
		Name: string.isRequired
	}),
};

export default Home;
