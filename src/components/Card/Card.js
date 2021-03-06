import React from 'react';
import { string, number } from 'prop-types';
import classNames from 'classnames'

import { cutString } from '../../helpers/strings';

import notCover from '../../images/not-cover.png';

import './Card.css';

const Card = ({ className, cover, title, genre, ageRestriction, maxTitleLength }) =>
    <div className={classNames(className, 'card')}>
        <div className="card__cover" style={{ backgroundImage: `url('${cover || notCover}')` }} />
        <h2 className="card__title" children={cutString(title, maxTitleLength)} />
        <p className="card__hint" children={`${(genre) && genre + ', '}${(ageRestriction) && ageRestriction + '+'}`} />
    </div>;

Card.propTypes = {
    className: string, // дополнительный класс
    cover: string, // обложка
    title: string, // название
    genre: string, // жанры
    ageRestriction: string, // возростное ограничение
    maxTitleLength: number, // максимальная длина названия
};

Card.defaultProps = {
    maxTitleLength: 18,
}

export default Card;