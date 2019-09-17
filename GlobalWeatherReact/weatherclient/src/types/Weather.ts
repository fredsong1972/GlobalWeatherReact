import { CurrentCondition } from './CurrentCondtion';
import { City } from './City'

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
        if (currentConditions.WeatherIcon){
            this.weatherIcon = require(`../assets/images/${currentConditions.WeatherIcon}.png`);
        }
        this.temperatureValue = currentConditions.Temperature.Metric.Value;
        this.temperatureUnit = currentConditions.Temperature.Metric.Unit;
    }
}
