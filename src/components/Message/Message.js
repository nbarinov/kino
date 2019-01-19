import React from 'react';
import { string, oneOf, oneOfType, arrayOf, node } from 'prop-types';
import classNames from 'classnames';

import Icon24Report from '@vkontakte/icons/dist/24/report';
 
import './Message.css';

const Message = ({ className, type, children, action }) => {
    const icons = {
        'report': <Icon24Report className="message__icon  message__icon--report" />,
    };

    return (
        <div className={classNames(className, 'message')}>
            <div className="message__wrapper">
                {icons[type]}
                <div className="message__children">
                    {children}
                </div>
                {action}
            </div>
        </div>
    );
};

Message.propTypes = {
    className: string,
    type: oneOf('report'),
    action: oneOfType([arrayOf(node), node]),
};

export default Message;