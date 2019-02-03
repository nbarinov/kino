import React from 'react';
import { string, oneOf, oneOfType, arrayOf, node } from 'prop-types';
import classNames from 'classnames';

import Icon24Report from '@vkontakte/icons/dist/24/report';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
 
import './Message.css';

const Message = ({ className, type, children, action, onCloseMessage }) => {
    const icons = {
        'report': <Icon24Report className="message__icon  message__icon--report" />,
        'error': <Icon24Error className="message__icon  message__icon--error" />,
    };

    return (
        <div className={classNames(className, 'message')}>
            <div className="message__wrapper">
                {(onCloseMessage) && 
                    <header className="message__header">
                        <button
                            type="button"
                            className="message__close"
                            title="закрыть окно"
                            onClick={onCloseMessage}>
                                Закрыть окно
                                <Icon24Cancel />
                        </button>
                    </header>}

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
    type: oneOf(['report', 'error']),
    action: oneOfType([arrayOf(node), node]),
};

export default Message;