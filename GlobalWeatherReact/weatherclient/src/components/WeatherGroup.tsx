import React from 'react';
import { Weather } from '../types/Weather'

interface IProp {
    weather: Weather,
};

class WeatherGroup extends React.Component<IProp> {
    render() {
        const weather = this.props.weather;
        return (
            <div>
                <div className="city col-sm-9">
                    {
                        weather.location && <div>
                            <h1>{weather.location}</h1>
                            <div className="row">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {
                                                    weather.weatherIcon && <img src={weather.weatherIcon} className="img-thumbnail" />
                                                }
                                            </td>
                                            <td>
                                                <span>{weather.weatherText}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {weather.isDaytime && <span>
                                                    Daytime
                                    </span>}
                                                {!weather.isDaytime && <span>
                                                    Night
                                    </span>}
                                            </td>
                                            <td>
                                                <span>{weather.temperatureValue}&deg;{weather.temperatureUnit}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
                {
                    weather.error && <p className="weatherError">
                        {weather.error}
                    </p>
                }
            </div>
        );
    }
};

export default WeatherGroup;