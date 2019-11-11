import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Weather } from "../types/Weather"

export type AppActions =
    {
        type: 'GET_WEATHER',
    } | {
        type: 'GET_WEATHER_SUCCESS',
        payload: Weather
    } | {
        type: 'GET_WEATHER_FAIL',
        error: string
    }  | {
        type: 'GET_COUNTRIES',
        payload: {
            request: AxiosRequestConfig
            }
    } | {
        type: 'GET_COUNTRIES_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'GET_COUNTRIES_FAIL',
        error: AxiosError
    };


export const GET_WEATHER = 'GET_WEATHER';
export const GET_WEATHER_SUCCESS = 'GET_WEATHER_SUCCESS';
export const GET_WEATHER_FAIL = 'GET_WEATHER_FAIL';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_FAIL = 'GET_COUNTRIES_FAIL';

