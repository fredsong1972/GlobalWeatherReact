import axios, {AxiosRequestConfig} from 'axios';
import thunk, { ThunkMiddleware } from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import axiosMiddleware from 'redux-axios-middleware';
import { AppActions } from "../types/actions";
import { countriesReducer } from "../reducers/countriesReducer";
import { weatherReducer } from "../reducers/weatherReducer";


export const rootReducer = combineReducers({
    countries: countriesReducer,
    weather: weatherReducer
});

const config: AxiosRequestConfig = {
    responseType: 'json'
};
const defaultClient = axios.create(config);

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer,  applyMiddleware(axiosMiddleware(defaultClient), thunk as ThunkMiddleware<AppState, AppActions>));