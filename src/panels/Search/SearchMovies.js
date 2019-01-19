import React from 'react';
import { arrayOf, object, func } from 'prop-types';

import { Group, Div } from '@vkontakte/vkui';

import Input from '../../components/Input';
import Card from '../../components/Card';

import filmStrip from '../../svg/film-strip.svg';

import './SearchMovies.css';

export default class SearchMovies extends React.Component {
    static propTypes = {
        movies: arrayOf(object),
        onSetMovie: func,
    };

    state = {
        results: [],
        isNotFound: false,
    };

    render() {
        const { onSetMovie } = this.props;
        const { results, isNotFound } = this.state;
        const { 
            handleSearch,
            renderNotFoundMessage
        } = this;

        return [
            <Group key="search-input">
                <Div>
                    <Input
                        className="search-movies__q"
                        placeholder="Введите название фильма"
                        onChange={handleSearch} />
                </Div>
            </Group>,
            <Group key="results">
                <Div>
                    {(results && results.length > 0) ?
                        <ul className="search-movies__movies">
                            {results.map(movie =>
                                <li 
                                    className="search-movies__movie" 
                                    key={movie.ObjectID} 
                                    onClick={onSetMovie && (() => onSetMovie(movie))}>
                                    <Card
                                        cover={movie.Thumbnail}
                                        title={movie.Name}
                                        genre={movie.Genre}
                                        ageRestriction={movie.AgeRestriction} />
                                </li>
                            )}
                        </ul> :
                        (isNotFound) && renderNotFoundMessage()}
                </Div>
            </Group>
        ];
    }

    renderNotFoundMessage() {
        return (
            <Div className="search-movies__not-found-message">
                <img src={filmStrip} alt="кино-лента" />
                <p children="Такого фильма нет в прокате" />
            </Div>
        );
    }

    handleSearch = q => {
        if (q === '') {
            return this.setState({
                results: this.props.movies,
                isNotFound: false,
            });
        }

        const results = this.props.movies.filter(movie => movie.Name.toLowerCase().includes(q.toLowerCase()))

        this.setState({
            results,
            isNotFound: results.length === 0,
        });
    };
}