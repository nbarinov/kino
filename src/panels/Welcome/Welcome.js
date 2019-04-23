import React from 'react';
import { string, func } from 'prop-types';

import { Panel, PanelHeader, Gallery, Button } from '@vkontakte/vkui';
import Icon24Write from '@vkontakte/icons/dist/24/write';

import { APP_NAME } from '../../config';

import Group from '../../components/Group';
import Div from '../../components/Div';

import slide1 from '../../images/welcome/1.png';
import slide2 from '../../images/welcome/2.png';
import slide3 from '../../images/welcome/3.png';

import './Welcome.css';

export default class Welcome extends React.Component {
    static propTypes = {
        id: string.isRequired,
        onGetGeodata: func.isRequired,
        onAllowNotofication: func.isRequired,
        skipWelcome: func.isRequired,
    };

    state = {
        slideIndex: 0,
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader children={APP_NAME} />

                <Group>
                    <Div>{this.renderGallery()}</Div>
                </Group>
            </Panel>
        );
    }

    renderGallery = () => {
        const { renderSlide1, renderSlide2, renderSlide3 } = this;

        return (
            <Gallery
                className="welcome__gallery"
                style={{ minHeight: '80vh' }}
                slideIndex={this.state.slideIndex}
                onChange={slideIndex => this.setState({ slideIndex })}>
                {renderSlide1()}
                {renderSlide2()}
                {renderSlide3()}
            </Gallery>
        );
    };

    renderSlide1 = () => {
        const { skipWelcome } = this.props;

        return (
            <div className="welcome__item">
                <img src={slide1} alt="slide1" style={{ width: 320, height: 290 }} />
                <div className="welcome__content">
                    <h2 className="welcome__title" children="Билеты на все новинки кино" />
                    <p className="welcome__hint" children="Прямо в VK" />
                </div>
                <div className="welocome__buttons">
                    <Button
                        className="welcome__button  welcome__button--skip"
                        size="xl"
                        level="2"
                        children="Пропустить"
                        onClick={skipWelcome} />
                    <Button
                        className="welcome__button"
                        size="xl"
                        level="2"
                        children="Далее"
                        onClick={() => this.changeSlide(1)} />
                </div>
            </div>
        );
    }

    renderSlide2 = () => {
        const { go, city, isAvailableGeo, onGetGeodata, skipWelcome } = this.props;

        return (
            <div className="welcome__item">
                <button className="welcome__change-city-button" onClick={(isAvailableGeo === null) ? onGetGeodata : go} data-to="cities">
                    <span className="welcome__change-city-title">
                        {(city && city.Name) ?
                            `г. ${city.Name}` :
                                (isAvailableGeo === false) ?
                                    'Выбрать город...' :
                                    'Определить город...'}
                    </span>
                    <Icon24Write className="welcome__change-city-icon" />
                </button>

                <img src={slide2} alt="slide2" style={{ width: 320, height: 290 }} />
                <div className="welcome__contnet">
                    <h2 className="welcome__title" children="500+ кинотеатров по России" />
                    <p className="welcome__hint">
                        Сервис автоматически покажет<br />ближайшие из них
                    </p>
                </div>
                <div className="welocome__buttons">
                    <Button
                        className="welcome__button  welcome__button--skip"
                        size="xl"
                        level="2"
                        children="Пропустить"
                        onClick={skipWelcome} />
                    <Button
                        className="welcome__button"
                        size="xl"
                        level="2"
                        children="Далее"
                        onClick={() => this.changeSlide(2)} />
                </div>
            </div>
        );
    }

    renderSlide3 = () => {
        const { onAllowNotofication, skipWelcome } = this.props;

        return (
            <div className="welcome__item">
                <img src={slide3} alt="slide3" style={{ width: 320, height: 290 }} />
                <div className="welcome__content">
                    <h2 className="welcome__title" children="Включи уведомления" />
                    <p className="welcome__hint">
                        Если хочешь быть в курсе всех<br />акций и скидок на билеты
                    </p>
                </div>
                <div className="welocome__buttons">
                    <Button
                        className="welcome__button  welcome__button--skip"
                        size="xl"
                        level="2"
                        children="Пропустить"
                        onClick={skipWelcome} />
                    <Button
                        className="welcome__button"
                        size="xl"
                        level="2"
                        children="Включить"
                        onClick={onAllowNotofication} />
                </div>
            </div>
        );
    }

    changeSlide = slideIndex => this.setState({ slideIndex: (slideIndex > 2) ? 0 : slideIndex });
}
