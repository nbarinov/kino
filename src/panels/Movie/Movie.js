import React from 'react';
import { string, shape, object } from 'prop-types';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import {
    Panel, PanelHeader, HeaderButton, platform, IOS, Button, Gallery
} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import { cutString } from '../../helpers/strings';
import { date } from '../../helpers/dates';

import Group from '../../components/Group';
import Div from '../../components/Div';
import Loader from '../../components/Loader';
import ShowMoreText from 'react-show-more';
import Message from '../../components/Message';

import './Movie.css';

const osname = platform();

const Movie = ({ id, movie, geo, city, history }) => {
    let lat = city.Latitude || '';
    let long = city.Longitude || '';

    if (geo) {
        lat = geo.lat;
        long = geo.long;
    }

    return (movie) ?
        <Panel id={id}>
            <PanelHeader
                left={<HeaderButton onClick={() => history.goBack()}>
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
                            HorizonalThumbnail,
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
                    if (loading) return <Loader style={{ marginTop: 20 }} />;
                    if (error) return (
                        <Message
                            type="error"
                            onCloseMessage={() => history.push('/')}
                            action={
                                <Button
                                    size="xl"
                                    level="2"
                                    children="Вернуться назад"
                                    onClick={() => history.goBack()} />
                            }
                            children="Что-то пошло не так..." />
                    );

                    const movie = data.movie;

                    return (
                        <Group className="movie">
                            <Div className="movie__bg" style={{ backgroundImage: `url('${movie.Thumbnail}')` }} />

                            <Group className="movie__content">
                                <Gallery
                                    className="movie__gallery"
                                    slideWidth="auto"
                                    align="right">
                                    <div className="movie__gallery-item" key="slide-1">
                                        <img src={movie.Thumbnail} alt="slide-item" />
                                    </div>
                                    <div className="movie__gallery-item" key="slide-2">
                                        <img src={movie.HorizonalThumbnail} alt="slide-item" />
                                    </div>
                                </Gallery>

                                <Div>
                                    <h1 className="movie__name" children={movie.Name} />
                                    <p className="movie__hint" children={`${movie.Genre}, ${movie.AgeRestriction || 0}+`} />

                                    <Query
                                        query={gql`
                                            query {
                                                schedule_url (CityID: ${city.CityID}, Latitude: ${lat}, Longitude: ${long}, ObjectID: ${movie.ObjectID}) {
                                                    IsSaleAvailable,
                                                    Url,
                                                    HomeUrl
                                                }
                                            }
                                        `}>
                                        {({ loading, error, data }) => {
                                            if (loading) return <Loader style={{ marginTop: 20 }} />;
                                            // if (error) return <p>Error :(</p>;

                                            return (
                                                <Button
                                                    className="movie__button"
                                                    size="xl"
                                                    level="2"
                                                    component="a"
                                                    href={data.schedule_url.Url}
                                                    children="Расписание и билеты" />
                                            );
                                        }}
                                    </Query>

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
                        </Group>
                    );
                }}
            </Query>

        </Panel> :
        history.push('/') || null;
};

Movie.propTypes = {
    id: string.isRequired,
    history: object.isRequired,
    movie: shape({
        ObjectID: string.isRequired,
        Name: string.isRequired,
    }),
    city: shape({
        CityID: string.isRequired,
    }),
    geo: shape({
        lat: string.isRequired,
        long: string.isRequired,
    }),
};

export default Movie;