import React from 'react';
import { string, func, shape } from 'prop-types';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Panel, PanelHeader, HeaderButton, platform, IOS, Group, Div, Button } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import { cutString } from '../../helpers/strings';
import { date } from '../../helpers/dates';

import Loader from '../../components/Loader';
import ShowMoreText from 'react-show-more-text';

import './Movie.css';

const osname = platform();

const Movie = ({ id, go, movie }) => 
    (movie) ?
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={go} data-to="home">
                    {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                </HeaderButton>}
                children={(movie && movie.Name) ? cutString(movie.Name, 18) : ''} />

            <Query
                query={gql`
                    query {
                        movie (ObjectID: ${movie.ObjectID}) {
                            ObjectID,
                            Name,
                            Thumbnail,
                            Trailers,
                            Genre,
                            AgeRestriction,
                            Description,
                            ReleaseDate,
                            Duration,
                            Country,
                            Director,
                            Cast,
                            Rating
                        }
                    }
                `}>
                {({ loading, error, data }) => {
                    if (loading) return <Loader center={true} />;
                    if (error) return <p>Error :(</p>;

                    const movie = data.movie;

                    return (
                        <Group className="movie__group">
                            <Div className="movie__bg" style={{ backgroundImage: `url('${movie.Thumbnail}')` }} />

                            <Div className="movie__content">
                                <h1 className="movie__name" children={movie.Name} />
                                <p className="movie__hint" children={`${movie.Genre}, ${movie.AgeRestriction}+`} />

                                <Button 
                                    className="movie__button"
                                    size="xl" 
                                    level="2" 
                                    children="Расписание и билеты" />

                                <Div className="movie__description">
                                    <ShowMoreText
                                        lines={4}
                                        more="Читать далее"
                                        less="Показать меньше"
                                        anchorClass="movie__description-anchor"
                                        children={movie.Description} />
                                </Div>

                                <ul className="movie__info">
                                    <li className="movie__info-item" key="release-date">
                                        <span className="movie__info-item-key" children="В прокате:" />
                                        <span className="movie__info-item-value" children={date(movie.ReleaseDate, 'YYYY-MM-DD', 'с DD MMMM')} />
                                    </li>
                                    <li className="movie__info-item" key="duration">
                                        <span className="movie__info-item-key" children="Продолжительность:" />
                                        <span className="movie__info-item-value" children={movie.Duration} />
                                    </li>
                                    <li className="movie__info-item" key="country">
                                        <span className="movie__info-item-key" children="Страна:" />
                                        <span className="movie__info-item-value" children={movie.Country} />
                                    </li>
                                    <li className="movie__info-item" key="director">
                                        <span className="movie__info-item-key" children="Режиссёр" />
                                        <span className="movie__info-item-value" children={movie.Director} />
                                    </li>
                                    <li className="movie__info-item" key="cast">
                                        <span className="movie__info-item-key" children="В ролях:" style={{ minWidth: 42 }} />
                                        <span className="movie__info-item-value" children={movie.Cast} />
                                    </li>
                                    <li className="movie__info-item" key="rating">
                                        <span className="movie__info-item-key" children="Оценка КиноПоиска" />
                                        <span className="movie__info-item-value" children={movie.Rating} />
                                    </li>
                                </ul>
                            </Div>
                        </Group>
                    );
                }}
            </Query>

        </Panel> :
        go('home') || null;

Movie.propTypes = {
    id: string.isRequired,
    go: func.isRequired,
    movie: shape({
        ObjectID: string.isRequired,
        Name: string.isRequired,
    }),
};

export default Movie;