import React from 'react';
import { string, func, shape } from 'prop-types';

import { Panel, Group, Div, PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Write from '@vkontakte/icons/dist/24/write';

import { APP_NAME } from '../../config';

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
	</Panel>
);

Home.propTypes = {
	id: string.isRequired,
	go: func.isRequired,
	city: shape({
		Name: string.isRequired
	}),
};

export default Home;
