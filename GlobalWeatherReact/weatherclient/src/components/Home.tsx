import React from 'react';
import Form from './Form';
import { connect } from "react-redux";
import { AppActions } from "../types/actions";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import WeatherDetails from './WeatherDetails';
import { Weather } from "../types/Weather";
import { City } from "../types/City";
import { Country } from "../types/Country";
import { getCountries, getWeatherOfPrevLocation } from "../actions/actions";


interface IState {

    weather: Weather,
    countries: Country[],
    city?: City
}

interface IFormProps {
    /* The http path that the form will be posted to */
    getCountries: () => void;
    getWeatherOfPrevLocation: () => void;
}


class Home extends React.Component<IFormProps, IState> {
    constructor(props: IFormProps) {
        super(props);
        this.state = {
            weather: {
                error: ""
            } as Weather,
            countries: [],
            city: undefined
        };
    }
    
   
    componentDidMount() {
        try {
           this.props.getCountries();
           this.props.getWeatherOfPrevLocation();
        } catch (error) {
            console.log(error);
        }
    }

    async setStateAsync(state: IState) {
        return new Promise((resolve: any) => {
            this.setState(state, resolve);
        });
    }

    render() {
        return (
            <div className="container content panel">
                <div className="container">
                    <div className="row">
                        <div className="form-container">
                            <WeatherDetails />
                            <Form  />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): IFormProps => ({
    getCountries: bindActionCreators(getCountries, dispatch),
    getWeatherOfPrevLocation: bindActionCreators(getWeatherOfPrevLocation, dispatch)
});

export default connect(null, mapDispatchToProps)(Home);