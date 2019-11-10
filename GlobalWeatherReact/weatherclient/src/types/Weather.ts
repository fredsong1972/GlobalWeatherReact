import { CurrentCondition } from './CurrentCondition';
import { City } from './City'
import { Constants } from '../Constants';

export class Weather {
    public location?: string;
    public weatherIcon?: any;
    public weatherText?: string;
    public temperatureValue?: number;
    public temperatureUnit?: string;
    public isDaytime?: boolean;
    public error?: string;

    public constructor(currentConditions: CurrentCondition, city: City) {
        this.location = city.EnglishName!;
        this.weatherText = currentConditions.WeatherText;
        this.isDaytime = currentConditions.IsDayTime;
        if (currentConditions.WeatherIcon) {
            let icon = currentConditions.WeatherIcon.toString();
            if (icon.length === 1)
                icon = "0" + icon;
            this.weatherIcon = `${Constants.weatherIconUrl}${icon}-s.png`;
        }
        this.temperatureValue = currentConditions.Temperature.Metric.Value;
        this.temperatureUnit = currentConditions.Temperature.Metric.Unit;
    }
}