import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import { render } from 'react-dom';

import connect from '@vkontakte/vkui-connect';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { API_URI } from './config';

import Loader from './components/Loader';
import App from './App';

const client = new ApolloClient({ uri: API_URI });

// Init VK App
connect.send('VKWebAppInit', {});

render(
    <ApolloProvider client={client}>
        <Query
            query={gql`
                query {
                    cities {
                        CityID
                        Name
                        Latitude
                        Longitude
                    }
			}`}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <p>Error :(</p>;

                return <App cities={data.cities} />;
            }}
        </Query>
    </ApolloProvider>,
    document.getElementById('root')
);
