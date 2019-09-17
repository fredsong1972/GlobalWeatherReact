import React from 'react';
import Form from "./Form";
import WeatherGroup from "./WeatherGroup";
import { Weather } from "../types/Weather";
import { City } from "../types/City";
import { Country } from "../types/Country";
import { Constants } from '../Constants';
import { CurrentCondition } from '../types/CurrentCondtion';
import { CityMetaData } from '../types/CityMetaData';

interface IState {

    weather: Weather,
    countries: Country[],
    city?: City
}

class Home extends React.Component<IState> {

    public state: IState = {
        weather: {
            error: ""
        } as Weather,
        countries: [],
        city: undefined
    }

    async componentDidMount() {
        try {
            const countries = await this.getCountries();
            await this.setStateAsync({ countries: countries } as IState);
            const lastCity = await this.getLastAccessedCity();
            if (lastCity && lastCity.Key) {
                await this.getWeatherAsync(lastCity);
            }
        } catch (error) {

        }
    }

    async getCountries(): Promise<Country[]> {
        try {
            const res = await fetch(`${Constants.locationAPIUrl}/countries?apikey=${Constants.apiKey}`);
            return await res.json() as Country[];

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getCities(searchText: string, countryCode: string): Promise<City> {
        const res = await fetch(`${Constants.locationAPIUrl}/cities/${countryCode}/search?apikey=${Constants.apiKey}&q=${searchText}`);
        const cities = await res.json() as City[];
        if (cities.length > 0)
            return cities[0];
        return {} as City;
    }

    async setStateAsync(state: IState) {
        return new Promise((resolve: any) => {
            this.setState(state, resolve)
        });
    }

    async updateLastAccessedCity(city: City) {
        try {
            const data = new CityMetaData(city);
            await fetch(`${Constants.cityAPIUrl}`, {
                method: 'post',
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getLastAccessedCity(): Promise<City> {
        try {

            const res = await fetch(`${Constants.cityAPIUrl}`);
            const data = await res.json() as CityMetaData;
            return {
                Key: data.id,
                EnglishName: data.name,
                Type: 'City',
                Country: {
                    ID: data.countryId,
                    EnglishName: ''
                }
            } as City;
        } catch (error) {
            console.log(error);
            return {} as City;
        }
    }

    getWeather = async (e: any, countryCode: string, searchText: string) => {
        e.preventDefault();
        if (!countryCode && !searchText) {
            await this.setStateAsync({ weather: { error: "Please enter the value." } } as IState);
            return;
        }
        try {
            const city = await this.getCities(searchText, countryCode);
            if (city.Key) {
                await this.updateLastAccessedCity(city);
                await this.getWeatherAsync(city);
            }

        } catch (err) {
            await this.setStateAsync({ weather: { error: err } } as IState);
        }


    };

    async getWeatherAsync(city: City) {
        try {
            const res = await fetch(`${Constants.currentConditionsAPIUrl}/${city.Key}?apikey=${Constants.apiKey}`);
            const currentConditions = await res.json() as CurrentCondition[];
            if (currentConditions.length > 0) {
                const weather = new Weather(currentConditions[0], city);
                await this.setStateAsync({
                    weather: weather,
                    city: city
                } as IState);
            }
        } catch (error) {
            console.log(error);
        }
        return {} as Weather;
    }

    render() {
        return (
            <div className="container content panel">
                <div className="container">
                    <div className="row">
                        <div className="form-container">
                            <WeatherGroup weather={this.state.weather} />
                            <Form getWeather={this.getWeather} countries={this.state.countries} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;