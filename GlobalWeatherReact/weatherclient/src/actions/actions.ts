import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import Axios from 'axios';
import { AppActions } from "../types/actions";
import { Constants } from "../Constants";
import { City } from "../types/City";
import { CurrentCondition } from "../types/CurrentCondition";
import { Weather } from "../types/Weather";
import { CityMetaData } from "../types/CityMetaData";

export const getWeather = (countryCode: string, searchText: string) => {
    return async (dispatch: ThunkDispatch<any, any, AppActions>) => {
        try {
            var res = await Axios.get(`${Constants.locationAPIUrl}/cities/${countryCode}/search?apikey=${Constants.apiKey}&q=${searchText}`);
            const cities = res.data as City[];
            var weather = {} as Weather;
            if (cities.length > 0) {
                const city = cities[0];
                const cityData = new CityMetaData(city);
                try {
                    await Axios.post(`${Constants.cityAPIUrl}`, cityData);
                }
                catch (e) {
                    console.log(e);
                }
                weather = await getCurrentWeather(city);
            }

            return dispatch({
                type: "GET_WEATHER_SUCCESS",
                payload: weather
            });
        }
        catch (e) {
            return dispatch({
                type: "GET_WEATHER_FAIL",
                error: e.isAxiosError ? e.message : JSON.stringify(e)
            });
        }
    }
}

export const getWeatherOfPrevLocation = () => {
    return async (dispatch: ThunkDispatch<any, any, AppActions>) => {
        try {
            const res = await fetch(`${Constants.cityAPIUrl}`);
            const data = await res.json() as CityMetaData;
            var weather = {} as Weather;
            if (data && data.id) {
                const city = {
                    Key: data.id,
                    EnglishName: data.name,
                    Type: 'City',
                    Country: {
                        ID: data.countryId,
                        EnglishName: ''
                    }
                } as City;
                weather = await getCurrentWeather(city);
            }
            return dispatch({
                type: "GET_WEATHER_SUCCESS",
                payload: weather
            });
        }
        catch (e) {
            return dispatch({
                type: "GET_WEATHER_FAIL",
                error: e.isAxiosError ? e.message : JSON.stringify(e)
            });
        }
    }
}


export async function getCurrentWeather(city: City): Promise<Weather> {
    const res = await Axios.get(`${Constants.currentConditionsAPIUrl}/${city.Key}?apikey=${Constants.apiKey}`);
    const currentConditions = res.data as CurrentCondition[];
    if (currentConditions.length > 0) {
        return new Weather(currentConditions[0], city);
    }
    return {} as Weather;
}

export const getCountries = (): AppActions => ({
    type: "GET_COUNTRIES",
    payload: {
        request: {
            url: `${Constants.locationAPIUrl}/countries?apikey=${Constants.apiKey}`
        }
    }
});
