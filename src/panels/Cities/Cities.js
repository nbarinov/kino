import React, { Component } from 'react';
import { string, func, object, arrayOf } from 'prop-types';

import { Panel, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';

import Group from '../../components/Group';
import Div from '../../components/Div';
import Input from '../../components/Input';
import CitiesList from './CitiesList';

import './Cities.css';

const osname = platform();

export default class Cities extends Component {
    static propTypes = {
        id: string.isRequired,
        history: object.isRequired,
        city: object,
        cities: arrayOf(object).isRequired,
        onChange: func,
    };

    state = {
        results: this.props.cities,
        isNotFound: false,
    };

    render() {
        const { id, city, history } = this.props;
        const { results, isNotFound } = this.state;
        const { handleSearch, handleChangeCity } = this;

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<HeaderButton onClick={() => history.goBack()}>
                        {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                    </HeaderButton>}
                    children="Смена города" />

                <Group>
                    <Div>
                        <Input
                            className="cities__q"
                            placeholder="Введите название города"
                            onChange={handleSearch} />

                        {(city && city.Name) &&
                            <div className="cities__current-city" onClick={() => history.push('/')}>
                                <span className="cities__current-city-title" children={city.Name} />
                                <Icon24DoneOutline className="cities__current-city-icon" />
                            </div>}
                    </Div>
                </Group>

                <Group className="cities__group">
                    <Div paddingOff={true}>
                        {(isNotFound) ?
                            <p className="cities__error" children="О таком городе мы никогда не слышали" /> :
                            <CitiesList
                                className="cities__list" 
                                cities={results}
                                onChange={handleChangeCity} />}
                    </Div>
                </Group>

            </Panel>
        );
    }

    handleSearch = q => {
        if (q === '') {
            return this.setState({ 
                results: this.props.cities,  
                isNotFound: false,
            });
        }

        const results = this.props.cities.filter(city => city.Name.toLowerCase().includes(q.toLowerCase()))

        this.setState({
            results,
            isNotFound: results.length === 0,
        });
    };

    handleChangeCity = city => {
        if (this.props.onChange) {
            this.props.onChange(city);
            this.props.history.goBack();
        }
    }
}