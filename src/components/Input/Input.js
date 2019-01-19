import React, { Component } from 'react';
import classNames from 'classnames';
import { string, bool, number, func, oneOf } from 'prop-types';
import autoBind from 'react-autobind';

import './Input.css';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            value: this.props.defaultValue || ''
        };

        autoBind(this);
        this.getValue = this.getValue.bind(this);
        this.getProps = this.getProps.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.focus = this.focus.bind(this);
    }

    getValue() {
        return this.props.value !== undefined ? this.props.value : this.state.value;
    }

    getProps() {
        const {
            getValue,
            handleChange,
            handleFocus,
            handleBlur,
            handleClick,
            handleKeyDown,
            handleKeyUp,
            handlePaste
        } = this;

        const value = getValue();

        return {
            className: classNames(this.props.className, 'input', {
                [`input--${this.props.view}`]: this.props.view,
                [`input--${this.props.icon}`]: this.props.icon
            }),
            type: this.props.type,
            autoComplete: this.props.autocomplete === false ? 'off' : 'on',
            disabled: this.props.disabled,
            formNoValidate: this.props.formNoValidate,
            maxLength: this.props.maxLength,
            id: this.props.id,
            name: this.props.name,
            value,
            tabIndex: this.props.tabIndex,
            placeholder: this.props.placeholder,
            pattern: this.props.pattern,
            ref: (control) => (this.control = control),
            title: this.props.title,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            onKeyUp: handleKeyUp,
            onPaste: handlePaste
        };
    }

    render() {
        const inputProps = this.getProps();

        return <input {...inputProps} />;
    }

    handleChange(event) {
        this.changeValue(event.target.value);
    }

    handleFocus(event) {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    handleBlur(event) {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    handleKeyDown(event) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }

    handleKeyUp(event) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    }

    handlePaste(event) {
        if (this.props.onPaste) {
            this.props.onPaste(event);
        }
    }

    changeValue(value) {
        if (this.props.value === undefined) {
            this.setState({ value });
        }

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    focus() {
        this.control.focus();
    }
}

Input.propTypes = {
    type: oneOf(['number', 'email', 'file', 'hidden', 'password', 'tel', 'text']), // тип поля
    autocomplete: bool, // управление автозаполнением компонента
    disabled: bool, // управление возможностью изменения атрибута компонента
    formNoValidate: bool, // управление встроенной проверкой данных введённых пользователем в поле на корректность
    maxLength: number, // максимальное число символов
    id: string, // уникальный идентификатор блока
    name: string, // уникальное имя блока
    value: string, // содержимое поля ввода
    defaultValue: string, // содержимое поля ввода, указанное по умолчанию
    tabIndex: number, // последовательность перехода между контролами при нажатии на Tab
    pattern: string, // стандартное ствойство HTMLInputElement 'pattern'. Может быть использовано для показа корректной клавиатуры на мобильных устройствах
    placeholder: string, // подсказка в поле
    className: string, // дополнительный класс
    title: string, // тултип, который будет показываться при наведении
    focused: bool, // управление возможностью изменения класса-модификатора компонента
    onChange: func, // обработчик изменения значения 'value'
    onFocus: func, // обработчик фокуса поля
    onBlur: func, // обработчик снятия фокуса с поля
    onClick: func, // обработчик клика по полю
    onKeyDown: func, // обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
    onKeyUp: func, // обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
    onPaste: func, // обработчик события вставки текста в поле
    // view: oneOf(['default', 'transparent']),
    // icon: oneOf(['search'])
};

Input.defaultProps = {
    type: 'text',
    // view: 'default',
    formNoValidate: false,
    autocomplete: false,
};

export default Input;
