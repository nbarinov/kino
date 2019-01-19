import React from 'react';
import classNames from 'classnames';
import { string, bool } from 'prop-types';

import Icon24Spinner from '@vkontakte/icons/dist/24/spinner';

import './Loader.css';

const Loader = ({ className, center }) =>
    <div
        className={classNames(className, 'loader', { 'loader--is-center': center })}
        title="Загрузка...">
        <Icon24Spinner className="loader__spinner" />
    </div>;

Loader.propTypes = {
    className: string,
    center: bool,
};

Loader.defaultProps = {
    center: false,
};

export default Loader;
