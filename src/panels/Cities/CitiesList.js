import React from 'react';
import { arrayOf, object, func, string } from 'prop-types';
import classNames from 'classnames';

import './CitiesList.css';

const CitiesList = ({ className, cities, onChange }) =>
    (cities && cities.length > 0) &&
        <ul className={classNames(className, 'cities-list')}>
            {cities.map(city =>
                <li
                    className="cities-list__item"
                    key={city.CityID}
                    children={city.Name}
                    tabIndex="0"
                    onClick={onChange && (() => onChange(city))} />
            )}
        </ul>;

CitiesList.propTypes = {
    className: string,
    cities: arrayOf(object),
    onChange: func,
};

export default CitiesList;