import React from 'react';
import { string, func, shape } from 'prop-types';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Panel, PanelHeader, HeaderButton, platform, IOS, Button } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import SearchMovies from './SearchMovies';

import './Search.css';

const osname = platform();

const Search = ({ id, go, city, handleSearch }) => {

    return (
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                </HeaderButton>}
                children="Поиск" />

            {(city && city.CityID) ?
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

                        return <SearchMovies movies={data.movies} />;
                    }}
                </Query> :
                <Message
                    type="report"
                    action={<Button size="xl" level="2" onClick={go} data-to="cities" children="Выбрать город" />}>
                    Чтобы посмотреть доступные<br />сеансы, выберите город
                </Message>}

        </Panel>
    );
};

Search.propTypes = {
    id: string.isRequired,
    go: func.isRequired,
    city: shape({
        CityID: string.isRequired,
    }),
};

export default Search;