import React from 'react';
import classNames from 'classnames';
import { string, bool } from 'prop-types';

import './Div.css';

const Div = ({ className, paddingOff, children, ...props }) =>
    <div 
        {...props}
        className={classNames(className, 'div', {
            'div--p-0': paddingOff,
        })}>
        {children}
    </div>;

Div.propTypes = {
    className: string,
    paddingOff: bool,
};

Div.propTypes = {
    paddingOff: false,
};

export default Div;