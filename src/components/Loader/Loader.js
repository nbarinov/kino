import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import { Spinner } from '@vkontakte/vkui';

import './Loader.css';

const Loader = ({ className, ...props }) => <Spinner {...props} className={classNames(className, 'loader')} />;

Loader.propTypes = {
    className: string,
};

export default Loader;
