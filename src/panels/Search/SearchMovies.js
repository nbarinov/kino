import React from 'react';
import { arrayOf, object } from 'prop-types';

import Group from '../../components/Group';
import Div from '../../components/Div';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';

import filmStrip from '../../svg/film-strip.svg';

import './SearchMovies.css';

export default class SearchMovies extends React.Component {
    static propTypes = {
        movies: arrayOf(object),
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
            <Group key="search-input" className="search-movies__group">
                <Div>
                    <Input
                        className="search-movies__q"
                        placeholder="Введите название фильма"
                        onChange={handleSearch} />
                </Div>
            </Group>,
            <Group key="results" className="search-movies__group">
                {(results && results.length > 0) ?
                    <Div>
                        <ul className="search-movies__movies">
                            {results.map(movie =>
                                <li 
                                    className="search-movies__movie" 
                                    key={movie.ObjectID}
                                    onClick={onSetMovie && (() => onSetMovie(movie))}>
                                    <Link className="search-movie__link" to={`/movie/${movie.ObjectID}`}>
                                        <Card
                                            cover={movie.Thumbnail}
                                            title={movie.Name}
                                            genre={movie.Genre}
                                            ageRestriction={movie.AgeRestriction} />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </Div> :
                    (isNotFound) && renderNotFoundMessage()}
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