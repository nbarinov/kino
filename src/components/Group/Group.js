import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import './Group.css';

const Group = ({ className, children, ...props }) =>
    <div className={classNames(className, 'group')} {...props}>
        {children}
    </div>;

Group.propTypes = {
    className: string,
};

export default Group;