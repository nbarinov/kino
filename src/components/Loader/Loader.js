import React from 'react';
import classNames from 'classnames';
import { string, bool } from 'prop-types';

import { Spinner } from '@vkontakte/vkui';

import './Loader.css';

const Loader = ({ className }) => <Spinner className={classNames(className, 'loader')} />;

Loader.propTypes = {
    className: string,
};

export default Loader;
