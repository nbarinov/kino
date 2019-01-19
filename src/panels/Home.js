import React from 'react';
import { string, func, shape } from 'prop-types';

import { Panel, Button, Group, Div, PanelHeader } from '@vkontakte/vkui';

import { APP_NAME } from '../config';

const Home = ({ id, go }) => (
	<Panel id={id}>
		<PanelHeader>{APP_NAME}</PanelHeader>

		<Group>
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
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
